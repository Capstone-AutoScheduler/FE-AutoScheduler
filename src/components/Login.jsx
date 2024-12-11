import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem("memberId") === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("memberId");
    window.location.reload();
  };

  const handleLogin = async (event) => {

    event.target.disabled = true;
    setTimeout(() => {
        event.target.disabled = false;
    }, 1000);
    try {
        const body = {
            userName: userName,
            password: password
        }
        const response = await axios.post(`http://3.35.252.162:8080/member/sign_in`, body, {timeout: 3000});
        console.log(response.data.result);
        localStorage.setItem("memberId", response.data.result.memberId);
        localStorage.setItem("name", response.data.result.name);
        window.location.reload();
    } catch (error) {
        console.error("Failed to get generator information", error);
        alert('login fail');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
        {isLogin ? (
            <>
            <div style={{margin: '0px 20px'}}>{`현재 사용자: ${localStorage.getItem('name')}`}</div>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
            </>
        ) : (
            <LoginBtn onClick={openModal}>로그인</LoginBtn>
        )}
        {isModalOpen && (
            <ModalOverlay onMouseDown={closeModal}>
            <ModalContent onMouseDown={(e) => e.stopPropagation()}>
                <input placeholder="userName" value={userName} onChange={(e) => {setUserName(e.target.value)}}></input>
                <input placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}} type="password"></input>
                <button onClick={handleLogin}>로그인</button>
                <button onClick={closeModal}>X</button>
            </ModalContent>
            </ModalOverlay>
        )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 28px;
`;

const LogoutBtn = styled.div`
    font-weight: bold;
    &:hover{
        text-decoration: underline;
    }
    cursor: pointer;
`;

const LoginBtn = styled.div`
    font-weight: bold;
    &:hover{
        text-decoration: underline;
    }
    cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  background: white;
  padding: 60px 80px 20px 80px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;

  input {
    width: 220px;
    color: #000000;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:first-of-type {
    background-color: #008BF0;
    color: white;
    &:disabled{
        background-color: #727272;
    }
  }

  button:last-of-type {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #7b7b7b;
    font-weight: bold;
    font-size: 24px;
    margin: 0px;
    padding: 0px 10px;

    &:hover{
        color: #444444;
    }
  }
`;

export default Login;
