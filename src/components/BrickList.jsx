import React, { useRef } from "react";
import styled from "styled-components";
import moment from "moment";

const DetailDiv = styled.div`
  div {
    background-color: rgba(49, 116, 173, 255);
    padding: 10px;
    padding-top: 5px;
    margin-bottom: 20px;
    width: 170px;
    height: 66px;
    border: none;
    border-radius: 10px;
    text-align: left; /* 텍스트 수평 가운데 정렬 */
    color: white;
  }
`;

const BrickList = (props) => {
  const { brickList, setDraggedEvent, drop, dragStart } = props;

  // // label을 참조할 ref 생성
  // const titleRef = useRef(null);

  // // 드래그 시작
  // const handleDragStart = (event) => {
  //   const title = titleRef.current ? titleRef.current.textContent : ""; // label 값 가져오기
  //   // event.dataTransfer.setData("text/plain", JSON.stringify(item));
  //   setDraggedEvent(title); // 부모 컴포넌트에 드래그된 아이템 설정
  // };

  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
    console.log(e.title);
  };

  return (
    <DetailDiv>
      {brickList &&
        brickList.map((item, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => dragStart(e)}
            onDragEnter={(e) => dragEnter(e, idx)}
            onDragEnd={drop}
            // onDragStart={handleDragStart}
            // key={i}
            className={`brick${idx}`}
          >
            <label>{item.title}</label>
            <br />
            <label>
              {moment(item.start).format("MMMM Do YYYY, h:mm:ss a")}
            </label>
            {/* <br />
            <label>{moment(item.end).format("MMMM Do YYYY, h:mm:ss a")}</label> */}

            {/* <div>
              <TextArea autoSize={{ minRows: 6, maxRows: 6 }} />
            </div> */}
          </div>
        ))}
    </DetailDiv>
  );
};

export default BrickList;
