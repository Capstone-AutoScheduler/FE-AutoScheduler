import { useEffect } from "react";
import styled from "styled-components";

import useStore from "../../store/Store";

import Bubble from "../Bubble";
import Arrow from "../Arrow";

const Board = () => {
  const { bubbles, operations, setStartBubble, setEndBubble } = useStore(
    (state) => state
  );

  const handleMouseUp = () => {
    setStartBubble(null);
    setEndBubble(null);
  };

  useEffect(() => {
    console.log(operations);
  }, [operations]);

  return (
    <Container onMouseUp={handleMouseUp}>
      {bubbles.map((bubble) => {
        return <Bubble key={bubble.id} item={bubble} />;
      })}
      <Arrow />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border: 1px solid black;
  height: 1200px;
`;

export default Board;
