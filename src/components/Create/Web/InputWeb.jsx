import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import useHtmlStore from "../../../store/HtmlStore.jsx";
import useEclassLoginStore from "../../../store/eclassLoginStore.jsx";

const InputWeb = ({ Update }) => {
  // props안오면 그냥 빈값???
  // 상태 관리: textField의 값을 저장
  const [inputValue, setInputValue] = useState("");
  const [isUpdatedButton, setIsUpdatedButton] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false); // 로그인 창의 표시 여부 관리
  const [submittedUsername, setSubmittedUsername] = useState(""); // 로그인 후 저장된 아이디
  const [submittedPassword, setSubmittedPassword] = useState(""); // 로그인 후 저장된 비밀번호
  const [isLogin, setIsLogin] = useState(false);
  const {
    cssFile,
    setCssFile,
    htmlBody,
    setHtmlBody,
    bodyForGenerate,
    setBodyForGenerate,
    updateHtmlBody,
    setUpdatedHtmlBody,
    // isUpdatedButton,
    // setIsUpdatedButton,
  } = useHtmlStore();
  // const { userName, password, setUserName, setPassword } =
  //   useEclassLoginStore();

  useEffect(() => {
    setIsUpdatedButton(Update);
  }, []);

  // 버튼 클릭 시 호출되는 함수
  const handleClick = () => {
    if (!isLogin) {
      getBody();
    } else {
      getEclassBody();
    }
  };

  // 버튼 클릭 시 호출되는 함수
  const handleClickUpdate = () => {
    // getAlreadyBody();
    getUpdateBody();
  };

  // 로그인 창을 토글하는 함수
  const toggleLogin = () => {
    setIsLoginVisible((prevState) => !prevState);
    setUserName("");
    setPassword("");
  };

  // 아이디 입력값 업데이트
  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  // 비밀번호 입력값 업데이트
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 로그인 폼 제출
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setSubmittedUsername(userName); // 로그인 시 아이디 저장
    setSubmittedPassword(password); // 로그인 시 비밀번호 저장
    setIsLogin(true);
    setIsLoginVisible(false);
    setUserName("");
    setPassword("");
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
      alert("유효하지 않은 Url입니다.");
    }
  }
  async function getEclassBody() {
    // eclass 로그인 크롤링
    // 이벤트 조회 api
    try {
      const response = await axios.get(
        "http://localhost:8080/crawl-with-login",
        {
          params: {
            loginUrl: "https://mportal.cau.ac.kr/common/auth/SSOlogin.do",
            targetUrl: inputValue,
            username: submittedUsername,
            password: submittedPassword,
            type: 0,
          },
        }
      );
      setCssFile(response.data.result.cssFile);
      setHtmlBody(response.data.result.htmlBody);
    } catch (error) {
      console.error("Failed to fetch html:", error);
      alert("로그인 정보가 올바르지 않습니다.");
    }
  }

  async function getUpdateBody() {
    // eclass 로그인 크롤링
    // 이벤트 조회 api
    try {
      const response = await axios.get(
        "http://localhost:8080/crawl-with-login",
        {
          params: {
            loginUrl: "https://mportal.cau.ac.kr/common/auth/SSOlogin.do",
            targetUrl: inputValue,
            username: submittedUsername,
            password: submittedPassword,
            type: 0,
          },
        }
      );
      setUpdatedHtmlBody(response.data.result.htmlBody);
    } catch (error) {
      console.error("Failed to fetch html:", error);
      alert("유효하지 않은 Url입니다.");
    }
  }

  // async function getHtml() {
  //   // 이벤트 조회 api
  //   try {
  //     const response = await axios.get("http://localhost:8080/crawl", {
  //       params: {
  //         type: 0,
  //         url: inputValue,
  //       },
  //     });
  //     setBodyForGenerate(response.data.result.htmlBody);
  //   } catch (error) {
  //     console.error("Failed to fetch html:", error);
  //   }
  // }

  return (
    <div>
      <Container>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="웹 주소를 입력해주세요."
        />
        <Button onClick={handleClick}>확인</Button>
        <Button
          onClick={toggleLogin}
          style={{
            display: "flex",
            marginTop: "14px",
            marginLeft: "25px",
            backgroundColor: "rgba(60, 105, 255, 1)",
            width: "90px",
            height: "32px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          로그인
        </Button>
        {isUpdatedButton ? (
          <Button
            onClick={handleClickUpdate}
            style={{
              display: "flex",
              marginTop: "14px",
              marginLeft: "10px",
              backgroundColor: "rgba(211, 47, 47, 1)",
              width: "90px",
              height: "32px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            업데이트
          </Button>
        ) : null}
        {/* 로그인 창 모달 */}
        {isLoginVisible && (
          <ModalOverlay onClick={toggleLogin}>
            <LoginModal onClick={(e) => e.stopPropagation()}>
              <Header>
                <h2>중앙대 Eclass 로그인</h2>
                <CloseButton onClick={toggleLogin}>닫기</CloseButton>
              </Header>
              <form onSubmit={handleLoginSubmit}>
                <div>
                  <Label htmlFor="username">아이디:</Label>
                  <InputLogin
                    type="text"
                    id="username"
                    name="username"
                    value={userName} // 상태 연결
                    onChange={handleUsernameChange} // 값 업데이트
                  />
                </div>
                <div>
                  <Label htmlFor="password">비밀번호:</Label>
                  <InputLogin
                    type="password"
                    id="password"
                    name="password"
                    value={password} // 상태 연결
                    onChange={handlePasswordChange} // 값 업데이트
                  />
                </div>
                <LoginButton type="submit">로그인</LoginButton>
              </form>
            </LoginModal>
          </ModalOverlay>
        )}
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

// Styled-components 사용하여 스타일 정의
const LoginButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 600px;
  padding: 10px;
  margin: 10px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 흐림 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 콘텐츠 위에 표시되도록 */
`;

const LoginModal = styled.div`
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const InputLogin = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  margin-top: 10px;
  padding: 10px;
  width: 60px;
  height: 40px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #e53935;
  }
`;

export default InputWeb;
