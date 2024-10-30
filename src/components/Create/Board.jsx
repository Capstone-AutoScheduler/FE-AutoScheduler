import { useEffect, useRef } from "react";
import styled from "styled-components";

import useStore from "../../store/Store";

import Bubble from "./Bubble";
import Frame from "./Frame";
import Arrow from "./Arrow";
import ArrowMenu from "./ArrowMenu";

const Board = () => {
  const { bubbles, setStartBubble, setEndBubble, operations, setOffsetX, setOffsetY, frames } = useStore(
    (state) => state
  );

  const handleMouseUp = () => {
    setStartBubble(null);
    setEndBubble(null);
  };

  useEffect(() => {
    console.log(operations);
  }, [operations]);

  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef != null) {
      const rect = boardRef.current.getBoundingClientRect();
      setOffsetX(rect.left);
      setOffsetY(rect.top);
    }
  }, [bubbles, setOffsetX, setOffsetY]);

  useEffect(() => {
    console.log('frames', frames);
  }, [ frames ])

  return (
    <Container
      onMouseUp={handleMouseUp}
      ref={boardRef}
    >
      {bubbles.map((bubble) => {
        return <Bubble key={bubble.id} item={bubble} />;
      })}
      {frames.map((frame) => {
        return <Frame key={frame.id} item={frame} />;
      })}
      <Arrow />
      <ArrowMenu />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border: 1px solid black;
  height: 1200px;
`;

export default Board;
