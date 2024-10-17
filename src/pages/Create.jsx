import styled from "styled-components";

import InputPDF from "../components/Create/InputPDF";
import Board from "../components/Create/Board";

const Create = () => {
  return (
    <Container>
      <Top>
        <Src>
          <h2>#Source Type</h2>
          <InputPDF />
        </Src>
      </Top>
      <Bottom>
        <h2>#규칙 생성</h2>
        <Board></Board>
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
`;

const Top = styled.div`
`;

const Bottom = styled.div``;

const Src = styled.div`
  width: 300px;
`;  

export default Create;
