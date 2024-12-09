import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "../components/Generate/Sidebar";
import ReadPDF from "../components/Generate/ReadPDF";
import Result from "../components/Generate/Result";
import WebResult from "../components/Generate/WebResult";
import Edit from "../components/Generate/Edit";
import Preview from "../components/Generate/Preview";
import InputWeb from "../components/Create/Web/InputWeb";

import LoadingBall from "../static/LoadingBall.svg"

import useSideStore from "../store/SideStore";
import useGenerateStore from "../store/GenerateStore";

const Generate = () => {
    const { generatorId } = useParams();
    const { generatorLoaded } = useGenerateStore((state) => state);
    const { isOpen, setIsOpen } = useSideStore((state) => state);
    const [type, setType] = useState("PDF");
    const selectPDF = () => {
        setType("PDF");
    };
    const selectWeb = () => {
        setType("Web");
    };

    const ContentRef = useRef();
    const LoadingRef = useRef();
    useEffect(() => {
        if (generatorLoaded) {
            ContentRef.current.style.visibility = 'visible';
            LoadingRef.current.style.display = 'none';
        } else {
            ContentRef.current.style.visibility = 'hidden';
            LoadingRef.current.style.display = 'flex';
        }
    }, [generatorLoaded])

    return (
        <Container>
            {isOpen ? <Sidebar /> : <></>}
            <Content ref={ContentRef}>
                <Top>
                    <Type>
                        <button onClick={selectPDF}>PDF</button>
                        <button onClick={selectWeb}>Web</button>
                        {type === "PDF" ? <ReadPDF /> : <InputWeb type="html" />}
                    </Type>
                    {type === "PDF" ? <Result generatorId={generatorId} /> : <WebResult />}
                </Top>
                <Bottom>
                    <Edit />
                    <Preview />
                </Bottom>
            </Content>
            <Loading ref={LoadingRef}>
                <img src={LoadingBall}></img>
                <div style={{ textAlign: "center" }}>생성기 불러오는 중...</div>
            </Loading>
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

const Loading = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
`

export default Generate;
