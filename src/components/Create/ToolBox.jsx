import styled from "styled-components";

import StandardDate from "./ToolBox/StandardDate";

import useStore from "../../store/Store";

const ToolBox = () => {
  const { frames, bubbles, startDate } = useStore((state) => state);

  const printFrames = () => {
    const stringData = JSON.stringify(frames);
    console.log(stringData);
    console.log(JSON.parse(stringData));
  };

  const saveMachine = () => {
    localStorage.setItem("frames", JSON.stringify(frames));
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
    localStorage.setItem("mapping", JSON.stringify(Mapping));
  };

  return (
    <Container>
      <Btn onClick={printFrames}>Print frames</Btn>
      <Btn onClick={saveMachine}>Save</Btn>
      <StandardDate></StandardDate>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  display: flex;
`;

const Btn = styled.button`
  border: 1px solid black;
  margin: 4px;
`;

export default ToolBox;
