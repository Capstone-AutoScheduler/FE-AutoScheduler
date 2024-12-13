import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import useStore from "../../../store/Store";
import useWebStore from "../../../store/WebStore";

import Bubble from "../Bubble";
import WebFrame from "./WebFrame";
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
    isHoverEnabled,
    setIsHoverEnabled,
  } = useWebStore();

  // 버튼의 클릭 상태를 관리
  const [isClicked, setIsClicked] = useState(false);

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
    setMouseY(event.pageY - 510);
  };

  const handleClick = (event) => {
    if (bubble.text) setBubbleTextNull();
    if (selected.bubble.BubbleId != 0)
      setSelectedBubble({
        bubbleId: 0,
        text: "",
      });
  };

  // hover 기능을 켜거나 끄는 버튼 클릭 이벤트
  const toggleHoverFeature = () => {
    setIsHoverEnabled(!isHoverEnabled);
    setIsClicked(!isClicked); // 클릭할 때마다 상태를 반전
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
      <Button onClick={toggleHoverFeature} isClicked={isClicked}>
        업데이트 영역 지정
      </Button>
      {bubbles.map((bubble) => {
        return <Bubble key={bubble.id} item={bubble} />;
      })}

      {currentFrame !== null ? <WebFrame item={currentFrame} /> : <></>}
      {/* <Overlay /> */}
      {/*<Area />*/}
      {/*<ArrowMenu />*/}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  border: 1px solid black;
  height: 1200px;
`;

const Button = styled.button`
  position: absolute; // 버튼을 상대적으로 배치
  top: 24px; // Container의 상단에서 100px 아래
  left: 1090px; // Container의 왼쪽에서 150px 오른쪽
  padding: 10px 20px;
  background-color: skyblue;
  border: none;
  border-radius: 5px;
  transition: all 0.08s ease; /* 부드러운 전환 효과 */

  /* 눌린 상태에서 스타일 변경 */
  ${({ isClicked }) =>
    isClicked &&
    `
    transform: scale(0.9); /* 눌렸을 때 크기 축소 */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* 눌린 느낌을 위한 그림자 효과 */
    background-color: #d32f2f; /* 배경색을 더욱 진하게 */
    color: white; /* 글자색을 흰색으로 변경 */
  `}
`;

export default WebBoard;
