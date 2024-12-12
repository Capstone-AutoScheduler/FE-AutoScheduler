import styled from "styled-components";

import WebSrc from "../components/Create/Web/WebSrc";
import WebToolBox from "../components/Create/Web/WebToolBox";
import WebFrameBox from "../components/Create/Web/WebFrameBox";
import WebBoard from "../components/Create/Web/WebBoard";

const CreateWeb = () => {
  return (
    <Container>
      <Top>
        <WebSrc></WebSrc>
        <WebToolBox></WebToolBox>
      </Top>
      <Bottom>
        <WebFrameBox></WebFrameBox>
        <WebBoard></WebBoard>
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 200px;

  background-color: #ffffff;
  flex-grow: 1;
  margin: 20px;
  padding-top: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px var(--Gray-800, #dedede);
`;

const Bottom = styled.div`
  background-color: #ffffff;
  flex-grow: 1;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px var(--Gray-800, #dedede);
`;

export default CreateWeb;
