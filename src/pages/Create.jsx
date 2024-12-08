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
                <InputPDF />
                <InputWeb />
            </Src>
            <ToolBox></ToolBox>
        </Top>
        <Bottom>
            <FrameBox></FrameBox>
            <Board></Board>
        </Bottom>
    </Container>
  );
};

const Container = styled.div``;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 200px;
`;

const Bottom = styled.div``;

const Src = styled.div``;

const Tool = styled.div``;

export default Create;
