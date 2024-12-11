import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import StandardDate from "./ToolBox/StandardDate";

import useStore from "../../store/Store";

const ToolBox = () => {
    const { frames, bubbles, startDate } = useStore((state) => state);

    const [generatorName, setGeneratorName] = useState('');
    const [generatorDetail, setGeneratorDetail] = useState('');

    const printFrames = () => {
        const stringData = JSON.stringify(frames);
        console.log(stringData);
        console.log(JSON.parse(stringData));
    };

    const saveMachine = () => {
        localStorage.setItem("frames", JSON.stringify(frames));
        localStorage.setItem("mapping", JSON.stringify(createMapping()));
    };

    const createMapping = () => {
        var Mapping = [];
        bubbles.forEach((bubble) => {
            if (bubble.mapping) {
                Mapping.push({
                bubbleId: bubble.id,
                string: bubble.str,
                x: bubble.x,
                y: bubble.y,
                //start date 임시 저장
                startDate: startDate,
                });
            }
        });
        return Mapping;
    }

    const navigate = useNavigate();
    async function saveGenerator() {
        try {
            const response = await axios.post(`http://3.35.252.162:8080/generator/?memberId=${localStorage.getItem("memberId")}`,
                {
                    generatorTitle: generatorName,
                    generatorDetail: generatorDetail,
                    frames: frames,
                    mapping: createMapping(),
                    sourceType: "PDF",
                    webUrl: "string",
                }
            );
            console.log(response);
            alert("생성기를 저장하였습니다.");
            navigate('/generator');
        } catch (error) {
            console.error("Failed to fetch html:", error);
            alert("생성기를 저장에 실패하였습니다.");
        }
    }

  return (
    <Container>
        <Left>
            <StandardDate></StandardDate>
            <BtnBox>
            <Btn onClick={printFrames}>Print frames</Btn>
            <Btn onClick={saveMachine}>Save</Btn>
            </BtnBox>
        </Left>

        <SaveBox>
            <GeneratorName
                value={generatorName}
                onChange={(event) => {setGeneratorName(event.target.value);}}
                placeholder="생성기 이름"
            />
            <GeneratorDetail
                value={generatorDetail}
                onChange={(event) => {setGeneratorDetail(event.target.value);}}
            />
            <Btn style={{backgroundColor: '#008BF0'}} onClick={saveGenerator}>저장하기</Btn>
        </SaveBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Left = styled.div``;

const GeneratorName = styled.input`
  width: 100%;
`;

const GeneratorDetail = styled.input`
  width: 100%;
  flex-grow: 1;
`;

const BtnBox = styled.div``;

const Btn = styled.button`
  margin: 4px;
  padding: 4px;
  background-color: #AEAEAE;
  color: #FFFFFF;
  border-radius: 4px;
`;

const SaveBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`;

export default ToolBox;
