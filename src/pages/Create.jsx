import styled from "styled-components";

import Src from "../components/Create/Src";
import ToolBox from "../components/Create/ToolBox";
import FrameBox from "../components/Create/FrameBox";
import Board from "../components/Create/Board";

const Create = () => {
  return (
    <Container>
      <Top>
        <Src></Src>
        <ToolBox></ToolBox>
      </Top>
      <Bottom>
        <FrameBox></FrameBox>
        <Board></Board>
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
  padding: 20px;
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

export default Create;
