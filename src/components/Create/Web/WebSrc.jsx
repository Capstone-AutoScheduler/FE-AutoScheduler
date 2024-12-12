import styled from "styled-components";

import InputWeb from "./InputWeb";
const WebSrc = () => {
  return (
    <Container>
      <Title>웹 주소</Title>
      <InputWeb />
    </Container>
  );
};

const Container = styled.div`
  width: 1000px;
  height: 180px;
`;

const Title = styled.div`
  margin: 0px 10px;
  font-size: 24px;
  font-weight: bold;
`;

export default WebSrc;
