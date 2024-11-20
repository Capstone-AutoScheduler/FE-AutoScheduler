import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import useStore from "../../store/Store";

import Bubble from "./Bubble";
import Frame from "./Frame";
import Overlay from "./Overlay";

const Board = () => {
  const { setSelectedArea, isDragging, setIsDragging, bubbles, mouseX, mouseY, setMouseX, setMouseY, selectedFrame, areaStart, setAreaStart, appendArea, areas } = useStore((state) => state);

  // init offset
  const boardRef = useRef(null);
  useEffect(() => {
    if (boardRef != null) {
      const rect = boardRef.current.getBoundingClientRect();
      setOffset({x:rect.left, y:rect.top});
    }
  }, [bubbles]);
  const [offset, setOffset] = useState({x:0, y:0});

  const handleMouseDown = (event) => {
    //console.log('board mousedown', 'mouseX', event.pageX, 'mouseY', event.pageY);
    //console.log('start dragging');
    setAreaStart({x: event.pageX-offset.x, y: event.pageY-offset.y});
    setIsDragging(true);
  }

  const handleMouseUp = () => {
    //console.log('end dragging');
    setSelectedArea(null);
    if(isDragging){
      setIsDragging(false);
      if ((mouseX - areaStart.x > 50) && (mouseY - areaStart.y > 50)) {
        appendArea({start: areaStart, end: {x:mouseX, y:mouseY}})
      }
    }
  };

  const handleMouseMove = (event) => {
      setMouseX(event.pageX-offset.x);
      setMouseY(event.pageY-offset.y);
  }

  useEffect(() => {
    console.log('areas', areas);
  }, [ areas ])

  return (
    <Container
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={boardRef}
    >
      {bubbles.map((bubble) => {
        return <Bubble key={bubble.id} item={bubble} />;
      })}
      {
        selectedFrame !== null
        ?
        <Frame item={selectedFrame}/>
        :
        <></>
      }
      <Overlay />
      {/*<Area />*/}
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
