import { useEffect, useRef } from "react";
import styled from "styled-components";

import useStore from "../../store/Store";

import Bubble from "./Bubble";
import Frame from "./Frame";
import Overlay from "./Overlay";

const Board = () => {
  const {
    bubbles,
    setStartBubble,
    setMouseX,
    setMouseY,
    setOffsetX,
    setOffsetY,
    frames,
  } = useStore((state) => state);

  const handleMouseUp = () => {
    setStartBubble(null);
  };

  const handleMouseMove = (event) => {
    setMouseX(event.pageX);
    setMouseY(event.pageY);
  };

  const boardRef = useRef(null);

  useEffect(() => {
    if (boardRef != null) {
      const rect = boardRef.current.getBoundingClientRect();
      setOffsetX(rect.left);
      setOffsetY(rect.top);
    }
  }, [bubbles, setOffsetX, setOffsetY]);

  useEffect(() => {
    console.log("frames", frames);
  }, [frames]);

  return (
    <Container
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={boardRef}
    >
      {bubbles.map((bubble) => {
        return <Bubble key={bubble.id} item={bubble} />;
      })}
      {frames.map((frame) => {
        return <Frame key={frame.id} item={frame} />;
      })}
      <Overlay />
      {/*<ArrowMenu />*/}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border: 1px solid black;
  height: 1200px;
`;

export default Board;
