import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

import useHtmlStore from "../../../store/HtmlStore";

const WebHtml = () => {
  const { cssFile, setCssFile, htmlBody, setHtmlBody } = useHtmlStore();

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

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
  const handleClick = () => {
    alert("Input clicked!");
  };

  const replace = (node) => {
    if (
      // a태그 일부는 왜 적용되지 않을까?, div태그 일부도 적용되지 않음..., 새로운 html이 포함돼있으면 그것도 안됨...(네이버 한정)
      node.children &&
      node.children[0] &&
      node.children[0].type === "text" &&
      node.attribs.class &&
      node.attribs.class != "newSpan"
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
  };

  return (
    <div>
      <Helmet>{matches.map((match, index) => parse(css))}</Helmet>
      <Container>
        <WebContainer>{parse(html, { replace })}</WebContainer>
      </Container>
    </div>
  );
};

const WebContainer = styled.div`
  border: 2px solid red;
  transform: scale(0.7);
  transform-origin: top left; /* 축소 기준점을 왼쪽 상단으로 설정 */
`;

const Container = styled.div`
  border: 2px solid red;
  padding: -600px;
`;

export default WebHtml;
