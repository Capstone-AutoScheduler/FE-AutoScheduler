import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import StandardDate from "./ToolBox/StandardDate";

import useStore from "../../store/Store";

const ToolBox = () => {
  const { initStore, frames, bubbles, startDate, isMapping } = useStore(
    (state) => state
  );

  const [generatorName, setGeneratorName] = useState("");
  const [generatorDetail, setGeneratorDetail] = useState("");

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
  };

  const navigate = useNavigate();
  async function saveGenerator(event) {
    event.target.disabled = true;
    setTimeout(() => {
      event.target.disabled = false;
    }, 2000);
    if (isMapping) {
      try {
        const response = await axios.post(
          `http://3.35.252.162:8080/generator/?memberId=${localStorage.getItem(
            "memberId"
          )}`,
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
        initStore();
        navigate("/generator");
      } catch (error) {
        console.error("Failed to fetch html:", error);
        alert("생성기를 저장에 실패하였습니다.");
      }
    } else {
      alert("mapping을 설정해주세요!");
    }
  }

  return (
    <Container>
      <Left>
        <StandardDate></StandardDate>
        <BtnBox>
          <Btn onClick={printFrames}>Print frames</Btn>
          <Btn onClick={saveMachine}>Save</Btn>
          <Btn onClick={initStore}>Init Page</Btn>
        </BtnBox>
      </Left>

      <SaveBox>
        <GeneratorName
          value={generatorName}
          onChange={(event) => {
            setGeneratorName(event.target.value);
          }}
          placeholder="생성기 이름"
        />
        <GeneratorDetail
          value={generatorDetail}
          onChange={(event) => {
            setGeneratorDetail(event.target.value);
          }}
        />
        <Btn
          onClick={(e) => {
            saveGenerator(e);
          }}
        >
          저장하기
        </Btn>
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
  background-color: #aeaeae;
  color: #ffffff;
  border-radius: 4px;

  &:disabled {
    background-color: #828282;
  }
`;

const SaveBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;

  button {
    background-color: #008bf0;
  }
`;

export default ToolBox;
