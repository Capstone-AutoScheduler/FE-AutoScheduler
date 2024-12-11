import styled from "styled-components";

import useWebStore from "../../../store/WebStore";

const WebToolBox = () => {
  const { frames, mappingList } = useWebStore((state) => state);

  const printFrames = () => {
    const stringData = JSON.stringify(frames);
    console.log(stringData);
    console.log(JSON.parse(stringData));
  };

  const saveMachine = () => {
    localStorage.setItem("frames", JSON.stringify(frames));
    localStorage.setItem("mappingList", JSON.stringify(mappingList));
    //   var Mapping = [];
    //   bubbles.forEach((bubble) => {
    //     if (bubble.mapping) {
    //       Mapping.push({
    //         bubbleId: bubble.id,
    //         string: bubble.str,
    //         x: bubble.x,
    //         y: bubble.y,
    //       });
    //     }
    //   });
    //   localStorage.setItem("mapping", JSON.stringify(Mapping));
  };

  return (
    <Container>
      <button onClick={printFrames}>Print frames</button>
      <button onClick={saveMachine}>Save</button>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
`;

export default WebToolBox;
