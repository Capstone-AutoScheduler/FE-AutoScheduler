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
  } = useWebStore();

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [tooltip, setTooltip] = useState(null); // 툴팁 상태 (데이터 및 위치)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // 툴팁 위치

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
    event.preventDefault();
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
      console.log("");
      console.log(`현재 태그 ${element.tagName}`);
      console.log(`현재 태그의 children ${element.children}`);
      console.log(`현재 태그가 몇번째 children인지: ${index}`);
      console.log(`현재 태그의 부모: ${parent}`);

      path.push({ tag: element.tagName, index });
      element = parent;
      depth++;
    }
    // console.log(`cnt: ${depth}`);

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
  };
  //console.log("check text");
  //console.log(bubble.text);

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
          onClick: handleClick,
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
          onClick: handleClick,
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
`;

const Container = styled.div`
  padding: -600px;
`;

export default WebHtml;
