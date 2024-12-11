import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

import useWebStore from "../../../store/WebStore";
import useHtmlStore from "../../../store/HtmlStore";

const WebHtml = () => {
  const { cssFile, setCssFile, htmlBody, setHtmlBody } = useHtmlStore();
  const {
    mouseX,
    mouseY,
    text,
    bubble,
    setMouseX,
    setMouseY,
    setText,
    setBubble,
    isHoverEnabled,
    setIsHoverEnabled,
    mappingList,
    addMapping,
    removeMappingById,
  } = useWebStore();

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [tooltip, setTooltip] = useState(null); // 툴팁 상태 (데이터 및 위치)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // 툴팁 위치
  // hover 효과를 켜고 끄는 상태
  const [isHovered, setIsHovered] = useState(false);
  const [isHoverId, setIsHoverId] = useState(0); // hover 기능 활성화/비활성화 상태
  var hoverId = 1;
  const [isClickedArea, setIsClickedArea] = useState(false);
  const [areaId, setAreaId] = useState(0);
  const [areaIdList, setAreaIdList] = useState([]); // 예시로 areaIdList 초기값 설정

  // htmlBody가 변경될 때마다 html 상태를 업데이트
  useEffect(
    () => {
      setHtml(htmlBody);
      setCss(cssFile);
    },
    [htmlBody],
    [cssFile]
  );

  // 왜 setHtml(htmlBody)만 하면 Too many re-renders. React limits the number of renders to prevent an infinite loop.???

  // 정규 표현식을 사용하여 <link> 태그를 추출
  const regex = /<link[^>]*>/g; // <link> 태그를 모두 찾는 정규식
  const matches = [...css.matchAll(regex)];

  // 버블링
  const handleClick = (event) => {
    // 버블 위치(depth, childrenIndexex) 저장
    event.preventDefault();
    console.log("check update area");
    console.log(event.tagName);
    const path = [];
    let element = event.target;
    var depth = 0;
    var childrenIndexes = [];
    while (element && element.tagName !== "BODY") {
      const parent = element.parentNode;
      if (parent.tagName === "BODY") {
        console.log(parent.children);
        const index = Array.from(parent.children).indexOf(element);
        console.log(index);
      }
      const index = Array.from(parent.children).indexOf(element);
      childrenIndexes.push(index);

      path.push({ tag: element.tagName, index });
      element = parent;
      depth++;
    }

    // frame으로 버블 옮기는 작업
    const newBubbleId = bubble.bubbleId + 1;
    // 마우스 위치, text WebStore에 저장
    const mouseX = event.pageX - 40;
    const mouseY = event.pageY - 370;
    const text = event.target.textContent;
    setMouseX(mouseX);
    setMouseY(mouseY);
    setBubble({
      bubbleId: newBubbleId,
      text: text,
      mappings: { depth: depth, childrenIndexes: childrenIndexes },
    });

    // hover(업데이트 기능에 필요)
  };

  // 버블링
  const handleAreaClick = (event) => {
    const isClicked = areaIdList.some(
      (areaId) => Number(event.target.className) === areaId
    );
    if (!isClicked) {
      // 영역 지정 시
      // 업데이트 영역 위치(depth, childrenIndexex) 저장
      const path = [];
      let element = event.target;
      var depth = 0;
      var childrenIndexes = [];
      while (element && element.tagName !== "BODY") {
        const parent = element.parentNode;
        if (parent.tagName === "BODY") {
          console.log(parent.children);
          const index = Array.from(parent.children).indexOf(element);
          console.log(index);
        }
        const index = Array.from(parent.children).indexOf(element);
        childrenIndexes.push(index);

        path.push({ tag: element.tagName, index });
        element = parent;
        depth++;
      }

      // 업데이트 영역에 포함돼 있는 버블 개수 저장
      const clickedElement = event.target;
      const parentElement = clickedElement.parentNode;
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

      setAreaIdList((prevAreaIdList) => [
        ...prevAreaIdList,
        Number(event.target.className),
      ]);
      addMapping({
        id: Number(event.target.className),
        depth: depth,
        childrenIndexes: childrenIndexes,
        countBubble: count,
      });
      console.log("영역 추가");
      console.log(Number(event.target.className));
    } else {
      // 영역 지정 취소
      setAreaIdList((prevAreaIdList) =>
        prevAreaIdList.filter(
          (areaId) => areaId !== Number(event.target.className)
        )
      );
      removeMappingById(Number(event.target.className));
      console.log("영역 제거");
      console.log(Number(event.target.className));
    }

    // frame으로 버블 옮기는 작업
    const newBubbleId = bubble.bubbleId + 1;
    // 마우스 위치, text WebStore에 저장
    const mouseX = event.pageX - 40;
    const mouseY = event.pageY - 370;
    const text = event.target.textContent;
    setMouseX(mouseX);
    setMouseY(mouseY);
    setBubble({
      bubbleId: newBubbleId,
      text: text,
      mappings: { depth: depth, childrenIndexes: childrenIndexes },
    });

    // hover(업데이트 기능에 필요)
  };

  const replace = (node) => {
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
          style:
            "background-color: lightblue; display: inline; padding: 5px; border-radius: 5px",
          onClick: isHoverEnabled ? null : handleClick,
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
          style:
            "background-color: lightblue; display: inline; padding: 5px; border-radius: 5px",
          onClick: isHoverEnabled ? null : handleClick,
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
    if (isHoverEnabled) {
      if (node.name === "div") {
        // 배열 내에 hoverId가 존재하면 true, 아니면 false 반환
        const isClicked = areaIdList.some((areaId) => hoverId === areaId);
        // 기존 div 태그에 이벤트 핸들러 추가
        const newNode = {
          type: "tag",
          name: "span",
          attribs: {
            class: hoverId,
            style: {
              position: "absolute", // div 내에서 위치를 맞추기 위해 absolute 사용
              backgroundColor: isClicked
                ? "rgba(255, 200, 200, 0.5)"
                : hoverId === isHoverId
                ? "rgba(255, 200, 200, 0.5)"
                : null, // hover 시 배경 색상 변경
              width: "100%", // div의 전체 너비를 차지
              height: "100%", // div의 전체 높이를 차지
              display: "inline",
              transition: "background-color 0.3s ease", // 배경색 부드럽게 변화
            },
            onClick: handleAreaClick,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          },
        };
        node.children.push(newNode);
        // setHoverIdList((prevHoverId) => [...prevHoverId, hoverId]); // 새로운 id를 추가
        hoverId++;
        return node;
      }
    }
  };

  const getStyle = (hoverId, isHoverId) => {
    return {
      position: "absolute", // div 내에서 위치를 맞추기 위해 absolute 사용
      backgroundColor:
        hoverId === isHoverId ? "rgba(176, 224, 230, 0.6)" : null, // hover 시 배경 색상 변경
      width: "100%", // div의 전체 너비를 차지
      height: "100%", // div의 전체 높이를 차지
      display: "inline", // 요소를 inline으로 배치
      transition: "background-color 0.3s ease", // 배경색 부드럽게 변화
    };
  };

  // 마우스가 요소에 들어갔을 때
  const handleMouseEnter = (e) => {
    if (isHoverEnabled) {
      // 기능이 활성화되었을 때만
      // setIsHovered(true);
      setIsHoverId(Number(e.target.className));
    }
  };

  // 마우스가 요소에서 떠났을 때
  const handleMouseLeave = () => {
    if (isHoverEnabled) {
      // 기능이 활성화되었을 때만
      // setIsHovered(false);
      setIsHoverId(0);
    }
  };

  return (
    <div>
      <Helmet>{matches.map((match, index) => parse(css))}</Helmet>
      <Container>
        <WebContainer>{parse(html, { replace })}</WebContainer>
        {/* 선택된 버블이 마우스 위치에 따라 표시 */}
        {bubble.text && (
          <div
            style={{
              position: "absolute",
              left: `${mouseX}px`,
              top: `${mouseY}px`,
              fontSize: "14px",
              padding: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              borderRadius: "5px",
              pointerEvents: "none", // 선택된 버블이 다른 요소와 상호작용하지 않게 함
            }}
          >
            {bubble.text}
          </div>
        )}
      </Container>
    </div>
  );
};

const WebContainer = styled.div`
  transform: scale(0.7);
  transform-origin: top left; /* 축소 기준점을 왼쪽 상단으로 설정 */
  width: 1520px;
`;

const Container = styled.div`
  padding: -600px;
`;

export default WebHtml;
