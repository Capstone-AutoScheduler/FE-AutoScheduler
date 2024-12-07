import styled from "styled-components";

import InputPDF from "../components/Create/InputPDF";
import WebToolBox from "../components/Create/Web/WebToolBox";
import WebFrameBox from "../components/Create/Web/WebFrameBox";
import WebBoard from "../components/Create/Web/WebBoard";
import InputWeb from "../components/Create/Web/InputWeb";

const CreateWeb = () => {
  return (
    <Container>
      <Top>
        <Src>
          <h2>#Source Type</h2>
          <InputWeb type="body" />
        </Src>
        <Tool>
          <h2>#Tool Box</h2>
          <WebToolBox></WebToolBox>
        </Tool>
      </Top>
      <Bottom>
        <h2>#규칙 생성</h2>
        <WebFrameBox></WebFrameBox>
        <WebBoard></WebBoard>
      </Bottom>
    </Container>
  );
};

const Container = styled.div``;

const Top = styled.div``;

const Bottom = styled.div``;

const Src = styled.div``;

const Tool = styled.div``;

export default CreateWeb;
