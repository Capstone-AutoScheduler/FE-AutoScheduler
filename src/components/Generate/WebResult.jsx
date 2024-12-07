import { useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import useHtmlStore from "../../store/HtmlStore";
import parse from "html-react-parser";

import Schedule from "./Schedule";

const WebResult = () => {
  const {
    cssFile,
    setCssFile,
    htmlBody,
    setHtmlBody,
    bodyForGenerate,
    setBodyForGenerate,
  } = useHtmlStore();
  const [results, setResults] = useState([]);
  const frames = JSON.parse(localStorage.getItem("frames"));
  const htmlRef = useRef(null); // ref로 html 요소를 참조

  const GenerateSchedule = () => {
    frames.forEach((frame, index) => {
      const result = { titles: [], dates: [], details: [] };
      frame.title.forEach((bubble) => {
        result.titles.push(
          findTextInHtml(bubble.mappings.depth, bubble.mappings.childrenIndexes)
        );
      });
      frame.date.forEach((bubble) => {
        result.dates.push(
          findTextInHtml(bubble.mappings.depth, bubble.mappings.childrenIndexes)
        );
      });
      frame.detail.forEach((bubble) => {
        result.details.push(
          findTextInHtml(bubble.mappings.depth, bubble.mappings.childrenIndexes)
        );
      });
      setResults((prev) => [...prev, result]);
    });

    console.log(results);
  };

  const replace = (node) => {
    if (node.name === "body") {
      node.attribs.ref = htmlRef;
      return node;
    }
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

  useEffect(() => {
    if (bodyForGenerate) {
      GenerateSchedule();
    }
  }, [bodyForGenerate]);

  return (
    <Container>
      <div style={{ display: "none" }}>
        {parse(bodyForGenerate, { replace })}
      </div>
      {results.map((result) => {
        return <Schedule result={result} />;
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
