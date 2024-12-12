import { useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import useHtmlStore from "../../store/HtmlStore";
import useGenerateStore from "../../store/GenerateStore";
import parse from "html-react-parser";
import axios from "axios";

import Schedule from "./Schedule";

const WebResult = ({ generatorId }) => {
  const {
    cssFile,
    setCssFile,
    htmlBody,
    setHtmlBody,
    bodyToGenerate,
    setBodyToGenerate,
    updatedHtmlBody,
    setUpdatedHtmlBody,
  } = useHtmlStore();
  const {
    results,
    setResults,
    appendResult,
    setGeneratorLoaded,
    setSourceType,
  } = useGenerateStore((state) => state);
  // const frames = JSON.parse(localStorage.getItem("frames"));
  // const mappingList = JSON.parse(localStorage.getItem("mappingList"));
  const htmlRef = useRef(null); // ref로 html 요소를 참조
  // const [bubblesInArea, setBubblesInArea] = useState([]);

  const [frames, setFrames] = useState(null);
  const [mappingList, setMappingList] = useState(null);

  async function getGeneratorInfo() {
    try {
      const response = await axios.get(
        `http://3.35.252.162:8080/generator/${generatorId}`,
        { timeout: 3000 }
      );
      console.log("data 확인");
      console.log(response.data.result);
      console.log("data 세부 사항 확인");
      console.log(response.data.result.frames);
      console.log(response.data.result.mapping);
      setFrames(response.data.result.frames);
      setMappingList(response.data.result.mapping);
      setSourceType(response.data.result.sourceType);
      setTimeout(() => {
        setGeneratorLoaded(true);
      }, 1000);
    } catch (error) {
      console.error("Failed to get generator information", error);
    }
  }

  const GenerateSchedule = () => {
    console.log("start generating");
    var startDate = null;
    setResults([]);
    frames.forEach((frame, index) => {
      const result = { title: "", date: "", detail: "" };
      frame.title.forEach((bubble) => {
        var str;
        str = findTextInHtml(
          bubble.mappings.depth,
          bubble.mappings.childrenIndexes
        );
        result.title += str;
      });
      var expression = "";
      frame.date.forEach((bubble) => {
        var str;
        str = findTextInHtml(
          bubble.mappings.depth,
          bubble.mappings.childrenIndexes
        );
        expression += str;
      });
      // result.date += handleDate(startDate, expression);
      frame.detail.forEach((bubble) => {
        var str;
        str = findTextInHtml(
          bubble.mappings.depth,
          bubble.mappings.childrenIndexes
        );
        result.detail += str;
      });
      appendResult(result);
    });
    console.log("!!!@@@@###");
    console.log(results);
  };

  const replace = (node) => {
    if (node.name === "body") {
      node.attribs.ref = htmlRef;
      return node;
    }
  };

  // update된 사이트 크롤링
  const GenerateNewSchedule = () => {
    var startDate = null;
    setResults([]);
    mappingList.forEach((mapping, index) => {
      const result = { title: "", date: "", detail: "" };
      var str;
      const updatedBubbles = findBubbleInHtml(
        mapping.depth,
        mapping.childrenIndexes,
        mapping.countBubble
      );
      updatedBubbles.forEach((bubble) => {
        str += bubble.trim() + "\n";
      });
      result.detail += str;
      appendResult(result);
    });
    console.log("!!!@@@@###");
    console.log(results);
  };

  const handleDate = (startDate, expression) => {
    const math = require("mathjs");
    const day = new Date(startDate) / 86400000;
    const result = math.evaluate(day + expression);
    const calculatedDay = new Date(result * 86400000);
    const output = calculatedDay.toISOString().split("T")[0];
    return output;
  };

  const findTextInHtml = (depth, childrenIndexes) => {
    var bubble = "";
    var current = htmlRef.current;
    console.log(depth);
    console.log(childrenIndexes);

    // `depth`에 맞게 해당 깊이로 내려가며 요소를 찾음
    for (let i = depth - 1; i >= 1; i--) {
      if (current.children) {
        current = current.children[childrenIndexes[i]]; // 자식 인덱스에 맞는 자식으로 내려감
      }
    }
    bubble = current.textContent;
    console.log(bubble);

    return bubble;
  };

  const findBubbleInHtml = (depth, childrenIndexes, countBubble) => {
    var bubbles = [];
    var bubblesInArea = [];
    var current = htmlRef.current;
    console.log(depth);
    console.log(childrenIndexes);

    // `depth`에 맞게 해당 깊이로 내려가며 요소를 찾음
    for (let i = depth - 1; i >= 1; i--) {
      if (current.children) {
        current = current.children[childrenIndexes[i]]; // 자식 인덱스에 맞는 자식으로 내려감
      }
    }
    // bubble = current.textContent;
    console.log(current.className);

    // 업데이트 영역에 포함돼 있는 버블 개수 저장
    const parentElement = current;
    let count = 0;
    // 재귀적으로 자식 요소를 순회하는 함수
    const countChildrenWithClass = (element) => {
      // 자식 요소들이 있는 경우
      if (element.children.length > 0) {
        // 자식 요소들 순회
        Array.from(element.children).forEach((child) => {
          // 자식 요소가 특정 클래스를 가지는지 확인
          if (child.className === "newSpan") {
            count++;
            bubblesInArea.push(child.textContent);
            console.log(child.textContent);
          }
          // 자식이 있다면 재귀적으로 그 자식의 자식들을 순회
          countChildrenWithClass(child);
        });
      }
    };
    // 부모 요소의 모든 자식들에 대해 재귀적으로 탐색
    Array.from(parentElement.children).forEach((sibling) => {
      countChildrenWithClass(sibling);
    });
    console.log("bubbleCount");
    console.log(count);

    if (count != countBubble) {
      const numOfUpdatedBubbles = count - countBubble;
      bubbles = bubblesInArea.slice(-numOfUpdatedBubbles);
      console.log("업데이트 된 버블 확인");
      console.log(countBubble);
      console.log(bubbles);
    }

    return bubbles;
  };

  const replaceUpdateHtml = (node) => {
    if (node.name === "body") {
      node.attribs.ref = htmlRef;
      return node;
    }
    if (
      // a태그 일부는 왜 적용되지 않을까?, div태그 일부도 적용되지 않음..., 새로운 html이 포함돼있으면 그것도 안됨...(네이버 한정)
      node.children &&
      node.children[0] &&
      node.children[0].type === "text" &&
      node.attribs.class &&
      node.attribs.class != "newSpan" &&
      node.children[0].data != "" &&
      node.children[0].data.trim() != ""
    ) {
      var text = node.children[0].data;
      const newNode = {
        type: "tag",
        name: "span",
        attribs: {
          class: "newSpan",
        },
        children: [{ type: "text", data: text }],
      };
      node.children[0] = newNode;
      return node;
    }
    // if (node.children && node.children[0].type === "text") { // callstack size exceeded 에러남.
    if (
      (node.name === "p" || node.name === "span") &&
      node.children &&
      node.children[0] &&
      node.children[0].type === "text" &&
      node.attribs.class != "newSpan"
    ) {
      // 첫번째 type이 text가 아닐 수 있음
      var text = node.children[0].data;
      // console.log(node);
      // console.log(node.attribs.class);
      // console.log(node.children);
      node.attribs.href = null;
      const newNode = {
        type: "tag",
        name: "span",
        attribs: {
          class: "newSpan",
        },
        children: [{ type: "text", data: text }],
      };
      node.children[0] = newNode;
      // node.children = [...node.children, newNode];
      return node;
      // <a onClick={handleClick} style={style}>
      //   <span style={styleObject}>{text}</span>
      // </a>
    }
    // if (node.children && node.children[0].type === "text") { // callstack size exceeded 에러남.
    if (node.name === "a") {
      node.attribs.href = null;
      return node;
    }
  };

  useEffect(() => {
    setGeneratorLoaded(false);
    getGeneratorInfo();
  }, []);

  useEffect(() => {
    // 여기 발표 후 다시 생각해보기
    if (bodyToGenerate !== "" && frames !== null) {
      GenerateSchedule();
      setBodyToGenerate("");
      setFrames(null);
    }
  }, [bodyToGenerate, frames]);

  useEffect(() => {
    if (updatedHtmlBody !== "" && mappingList !== null) {
      console.log("%%");
      console.log("^^^^^");
      console.log(updatedHtmlBody);
      GenerateNewSchedule();
      setUpdatedHtmlBody("");
      setFrames(null);
      setMappingList(null);
    }
  }, [updatedHtmlBody, mappingList]);

  // useEffect(() => {
  //   if (frames !== null && mappingList !== null) {
  //     GenerateSchedule();
  //   }
  // }, [frames, mappingList]);

  return (
    <Container>
      <div style={{ display: "none" }}>
        {parse(bodyToGenerate, { replace })}
        {parse(updatedHtmlBody, { replace: replaceUpdateHtml })}
      </div>
      {results.map((result, index) => {
        return <Schedule key={index} result={{ index: index, ...result }} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100px;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
`;

export default WebResult;
