import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdRefresh } from "react-icons/io";
import axios from "axios";
import useHtmlStore from "../../store/HtmlStore.jsx";

import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [typeColor, setTypeColor] = useState("#4caf50");
  const {
    setBodyToGenerate,
    submittedUsername,
    setSubmittedUsername,
    submittedPassword,
    setSubmittedPassword,
    isClikedRefresh,
    setIsClikedRefresh,
  } = useHtmlStore();

  useEffect(() => {
    if (item.sourceType === "PDF") {
      setTypeColor("#b30c00");
    } else {
      setTypeColor("#4caf50");
    }
  }, []);

  const handleClick = (event) => {
    // event.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 막음
    // if (item.loginRequired === false) getBodyToGenerate();
    // else getEclassBodyToGenerate();
    // setIsClikedRefresh(true);
    // navigate(`/generate/${item.generatorId}`);
  };

  async function getBodyToGenerate() {
    // 이벤트 조회 api
    try {
      console.log(item.webUrl);
      const response = await axios.get("http://localhost:8080/crawl", {
        params: {
          type: 0,
          url: item.webUrl,
        },
      });
      console.log("check!");
      console.log(response);
      setBodyToGenerate(response.data.result.htmlBody);
    } catch (error) {
      console.error("Failed to fetch html:", error);
    }
  }

  async function getEclassBodyToGenerate() {
    // eclass 로그인 크롤링
    // 이벤트 조회 api
    try {
      const response = await axios.get(
        "http://localhost:8080/crawl-with-login",
        {
          params: {
            loginUrl: "https://mportal.cau.ac.kr/common/auth/SSOlogin.do",
            targetUrl: item.webUrl,
            username: submittedUsername,
            password: submittedPassword,
            type: 0,
          },
        }
      );
      setBodyToGenerate(response.data.result.htmlBody);
    } catch (error) {
      console.error("Failed to fetch html:", error);
      alert("로그인 정보가 올바르지 않습니다.");
      setIsClikedRefresh(false);
    }
  }

  return (
    <Container
      onClick={() => {
        navigate(`/generate/${item.generatorId}`);
      }}
    >
      <Info>
        <Type>
          <TypeContent>
            <div
              style={{
                marginRight: "4px",
                backgroundColor: typeColor,
                width: "15px",
                height: "15px",
                borderRadius: "15px",
              }}
            ></div>
            <div style={{ color: typeColor }}>{item.sourceType}</div>
          </TypeContent>
        </Type>
        <Creator>
          <CreateContent>
            <div
              style={{
                marginRight: "4px",
                backgroundColor: "#008bf0",
                width: "15px",
                height: "15px",
                borderRadius: "15px",
              }}
            ></div>
            <div>{item.memberName}</div>
          </CreateContent>
        </Creator>
        {item.sourceType === "WEB" ? (
          <Icon onClick={handleClick}>
            <IoMdRefresh size={18} color="white" />
          </Icon>
        ) : null}
      </Info>
      <Title>{item.generatorTitle}</Title>
      <Detail>{item.generatorDetail}</Detail>
    </Container>
  );
};

const Container = styled.div`
  width: 260px;
  height: 140px;
  padding: 10px;

  color: #ffffff;
  background-color: #008bf0;
  border: 3px solid #81b7f5;
  border-radius: 20px;

  cursor: pointer;

  &:hover {
    background-color: #008bf0;
    border: 5px solid #006bd0;
  }
`;

const Title = styled.div`
  font-weight: bold;
`;
const Info = styled.div`
  display: flex;
`;
const Creator = styled.div`
  display: flex;
`;

const Icon = styled.button`
  display: flex;
  margin-left: auto;
  border: 3px solid #ffffff;
  border-radius: 6px;
`;

const CreateContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  padding: 0px 4px;
  color: #008bf0;
  background-color: #ffffff;
  border-radius: 4px;
`;

const Type = styled.div`
  display: flex;
`;

const TypeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 4px;
  padding: 0px 4px;
  background-color: #ffffff;
  border-radius: 4px;
`;

const Detail = styled.div`
  color: #bbbbbb;
  display: -webkit-box; /* 플렉스박스를 사용한 레이아웃 */
  -webkit-box-orient: vertical; /* 텍스트를 세로 방향으로 정렬 */
  -webkit-line-clamp: 3; /* 최대 줄 수를 3줄로 제한 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
`;

export default Card;
