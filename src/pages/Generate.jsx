import styled from "styled-components";
import { useState } from "react";

import Sidebar from "../components/Generate/Sidebar";
import ReadPDF from "../components/Generate/ReadPDF";
import Result from "../components/Generate/Result";
import WebResult from "../components/Generate/WebResult";
import Edit from "../components/Generate/Edit";
import Preview from "../components/Generate/Preview";
import InputWeb from "../components/Create/Web/InputWeb";

import useSideStore from "../store/SideStore";

const Generate = () => {
  const { isOpen, setIsOpen } = useSideStore((state) => state);
  const [type, setType] = useState("PDF");
  const selectPDF = () => {
    setType("PDF");
  };
  const selectWeb = () => {
    setType("Web");
  };

  return (
    <Container>
      {isOpen ? <Sidebar /> : <></>}
      <Content>
        <Top>
          <Type>
            <button onClick={selectPDF}>PDF</button>
            <button onClick={selectWeb}>Web</button>
            {type === "PDF" ? <ReadPDF /> : <InputWeb Update={true} />}
          </Type>
          {type === "PDF" ? <Result /> : <WebResult />}
        </Top>
        <Bottom>
          <Edit />
          <Preview />
        </Bottom>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 90vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  overflow: hidden;
`;

const Top = styled.div`
  background-color: #ffffff;
  margin: 10px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px var(--Gray-800, #dedede);
`;

const Type = styled.div`
  height: 100px;
`;

const Bottom = styled.div`
  margin: 8px 0px 0px 0px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
`;

export default Generate;
