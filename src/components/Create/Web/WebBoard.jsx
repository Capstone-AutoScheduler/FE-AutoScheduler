import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import useStore from "../../../store/Store";
import useWebStore from "../../../store/WebStore";

import Bubble from "../Bubble";
import Frame from "./WebFrame";
import Overlay from "../Overlay";

import WebHtml from "./WebHtml";

const WebBoard = () => {
  const {
    setSelectedArea,
    isDragging,
    setIsDragging,
    bubbles,
    setSelectedFrameId,
    areaStart,
    setAreaStart,
    appendArea,
    areas,
  } = useStore((state) => state);
  const {
    mouseX,
    mouseY,
    bubble,
    setMouseX,
    setMouseY,
    setBubbleTextNull,
    frames,
    selectedFrameId,
    selected,
    setSelectedBubble,
  } = useWebStore();

  // init offset
  const boardRef = useRef(null);
  useEffect(() => {
    if (boardRef != null) {
      const rect = boardRef.current.getBoundingClientRect();
      setOffset({ x: rect.left, y: rect.top });
    }
  }, [bubbles]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    //console.log('board mousedown', 'mouseX', event.pageX, 'mouseY', event.pageY);
    //console.log('start dragging');
    setAreaStart({ x: event.pageX - offset.x, y: event.pageY - offset.y });
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    //console.log('end dragging');
    setSelectedArea(null);
    if (isDragging) {
      setIsDragging(false);
      if (mouseX - areaStart.x > 30 && mouseY - areaStart.y > 30) {
        appendArea({ start: areaStart, end: { x: mouseX, y: mouseY } });
      }
    }
  };

  //   const handleMouseMove = (event) => {
  //     setMouseX(event.pageX - offset.x);
  //     setMouseY(event.pageY - offset.y);
  //   };

  useEffect(() => {
    console.log("areas", areas);
  }, [areas]);

  const [currentFrame, setCurrentFrame] = useState(null);
  useEffect(() => {
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].id === selectedFrameId) {
        setCurrentFrame(frames[i]);
      }
    }
  }, [selectedFrameId, frames]);

  // 마우스 움직일 때 툴팁 위치 업데이트
  const handleMouseMove = (event) => {
    setMouseX(event.pageX - 40);
    setMouseY(event.pageY - 370);
  };

  const handleClick = (event) => {
    if (bubble.text) setBubbleTextNull();
    if (selected.bubble.BubbleId != 0)
      setSelectedBubble({
        bubbleId: 0,
        text: "",
      });
  };

  return (
    <Container
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      ref={boardRef}
    >
      <WebHtml></WebHtml>
      {bubbles.map((bubble) => {
        return <Bubble key={bubble.id} item={bubble} />;
      })}
      {currentFrame !== null ? <Frame item={currentFrame} /> : <></>}
      {/* <Overlay /> */}
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

export default WebBoard;
