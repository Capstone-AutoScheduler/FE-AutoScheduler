import styled from "styled-components";

import InputPDF from "../components/Create/InputPDF";
import ToolBox from "../components/Create/ToolBox";
import FrameBox from "../components/Create/FrameBox";
import Board from "../components/Create/Board";
import InputWeb from "../components/Create/Web/InputWeb";

const Create = () => {
  return (
    <Container>
      <Top>
        <Src>
          <h2>#Source Type</h2>
          <InputPDF />
          <InputWeb />
        </Src>
        <Tool>
          <h2>#Tool Box</h2>
          <ToolBox></ToolBox>
        </Tool>
      </Top>
      <Bottom>
        <h2>#규칙 생성</h2>
        <FrameBox></FrameBox>
        <Board></Board>
      </Bottom>
    </Container>
  );
};

const Container = styled.div``;

const Top = styled.div``;

const Bottom = styled.div``;

const Src = styled.div``;

const Tool = styled.div``;

export default Create;
