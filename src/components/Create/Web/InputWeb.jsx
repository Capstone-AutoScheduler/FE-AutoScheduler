import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import useHtmlStore from "../../../store/HtmlStore.jsx";

const InputWeb = ({ type }) => {
  // 상태 관리: textField의 값을 저장
  const [inputValue, setInputValue] = useState("");
  const {
    cssFile,
    setCssFile,
    htmlBody,
    setHtmlBody,
    bodyForGenerate,
    setBodyForGenerate,
  } = useHtmlStore();

  // 버튼 클릭 시 호출되는 함수
  const handleClick = () => {
    if (type === "body") getBody();
    else getHtml();
  };

  // 텍스트필드 값 변경 시 호출되는 함수
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  async function getBody() {
    // 이벤트 조회 api
    try {
      const response = await axios.get("http://localhost:8080/crawl", {
        params: {
          type: 0,
          url: inputValue,
        },
      });
      setCssFile(response.data.result.cssFile);
      setHtmlBody(response.data.result.htmlBody);
    } catch (error) {
      console.error("Failed to fetch html:", error);
    }
  }

  async function getHtml() {
    // 이벤트 조회 api
    try {
      const response = await axios.get("http://localhost:8080/crawl", {
        params: {
          type: 0,
          url: inputValue,
        },
      });
      setBodyForGenerate(response.data.result.htmlBody);
    } catch (error) {
      console.error("Failed to fetch html:", error);
    }
  }

  return (
    <div>
      <Container>
        <Title>웹 주소</Title>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="웹 주소를 입력해주세요."
        />
        <Button onClick={handleClick}>확인</Button>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
`;

const Title = styled.div`
  padding: 20px;
`;

// Styled-components 사용하여 스타일 정의
const Input = styled.input`
  width: 600px;
  padding: 10px;
  margin: 10px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  height: 40px;
  padding: 10px 20px;
  margin-top: 11px;
  font-size: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default InputWeb;
