import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import useStore from "../../../store/Store";
import useWebStore from "../../../store/WebStore";

const WebFrame = ({ item }) => {
  const { selectedFrameId, setSelectedFrameId, removeFrame } = useStore(
    (state) => state
  );

  const { addToTitle, addToDate, addToDetail, bubble, selected } = useWebStore(
    (state) => state
  );

  const [titleNewShow, setTitleNewShow] = useState(false);
  const [dateNewShow, setDateNewShow] = useState(false);
  const [detailNewShow, setDetailNewShow] = useState(false);

  const ContainerRef = useRef(null);

  const bgColor = "rgba(235, 186, 7, 0.3)";
  const selectedBorder = "3px solid red";
  const defaultBorder = "2px solid rgba(235, 186, 7, 0.7)";

  useEffect(() => {
    ContainerRef.current.style.top = 100 + "px";
    ContainerRef.current.style.left = 1090 + "px";
  }, []);

  const handleMouseUp = (endRow) => () => {
    if (selected.area != null) {
      const operation = {
        type: "drag",
        area: selected.area,
        childOperations: [],
      };
      if (endRow === "title") {
        addToTitle(item.id, operation);
      } else if (endRow === "date") {
        addToDate(item.id, operation);
      } else {
        addToDetail(item.id, operation);
      }
    }
  };

  const deleteFrame = () => {
    console.log("delete frame");
    removeFrame(item);
  };

  // pdf에서는 bubble의 영역을 저장해 다른 pdf에서 적합한 bubble가져올 때 쓰임.
  // 이 영역을 이용해서 버블의 text 후에 가져옴.
  // web에서는 frame에 text를 바로 넣고, mapping배열을 따로 만들어 버블의 위치 저장해줄것임.
  const handleClick = (endRow) => (event) => {
    if (bubble.text) {
      // WebBoard.jsx의 handleClick에서 setText(null)이 먼저 실행되면 어떡하나?, 현재 handleClick에 의해서 변화가 일어나서 재렌더링 되기 때문에 괜찮을 것이다.
      if (endRow === "title") {
        addToTitle(item.id, bubble);
      } else if (endRow === "date") {
        addToDate(item.id, bubble);
      } else {
        addToDetail(item.id, bubble);
      }
    }
  };

  return (
    <Container
      ref={ContainerRef}
      style={{
        backgroundColor: bgColor,
        border: defaultBorder,
      }}
    >
      <Row onClick={handleClick("title")} style={{ height: "10%" }}>
        <Section>Title</Section>
        <Content>
          {item.title.map((bubble) => {
            return <Inner frame={item} type={"title"} bubble={bubble} />;
          })}
        </Content>
        {/* {titleNewShow ? (
          <NewInput
            frameId={item.id}
            addContent={addToTitle}
            setShow={setTitleNewShow}
          />
        ) : (
          <></>
        )} */}
      </Row>
      <Row onClick={handleClick("date")} style={{ height: "10%" }}>
        <Section>
          Date <Btn onClick={() => setDateNewShow(true)}>+</Btn>
        </Section>
        <Content>
          {item.date.map((bubble) => {
            return <Inner frame={item} type={"date"} bubble={bubble} />;
          })}
          {dateNewShow ? (
            <NewInput
              frameId={item.id}
              addContent={addToDate}
              setShow={setDateNewShow}
            />
          ) : (
            <></>
          )}
        </Content>
      </Row>
      <Row onClick={handleClick("detail")} style={{ height: "80%" }}>
        <Btn
          onClick={() => setDetailNewShow(true)}
          style={{ marginTop: "4px" }}
        >
          +
        </Btn>
        <Content>
          {item.detail.map((bubble) => {
            return <Inner frame={item} type={"detail"} bubble={bubble} />;
          })}
          {detailNewShow ? (
            <NewInput
              frameId={item.id}
              addContent={addToDetail}
              setShow={setDetailNewShow}
            />
          ) : (
            <></>
          )}
        </Content>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  user-select: none;
  font-size: 12px;

  padding: 2px 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px solid rgba(235, 186, 7, 0.7);

  width: 400px;
  height: 300px;
`;

const Row = styled.div`
  border: 2px solid rgba(235, 186, 7, 0.7);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Section = styled.div`
  font-size: 16px;
  border-right: 2px solid rgba(235, 186, 7, 0.7);
  width: 18%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 80%;
  display: flex;
  align-items: flex-start;
`;

const Btn = styled.button`
  border: 1px solid black;
  width: 20px;
  height: 20px;
  margin: 0px 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = ({ frame, type, bubble }) => {
  const { bubbles, setSelectedOperation } = useStore((state) => state);

  const {
    selected,
    setSelectedBubble,
    removeFromTitle,
    removeFromDate,
    removeFromDetail,
  } = useWebStore((state) => state);

  const defaultBorder = "1px solid black";
  const selectedBorder = "2px solid red";

  const handleClick = (event) => {
    event.stopPropagation();
    setSelectedBubble(bubble);
  };

  //   if (selected.bubble != null) {
  //     console.log(selected.buuble.text);
  //   }

  const deleteOperation = () => {
    console.log("hello!");
    if (type === "title") {
      removeFromTitle(frame.id, bubble.bubbleId);
    } else if (type === "date") {
      removeFromDate(frame.id, bubble.bubbleId);
    } else {
      removeFromDetail(frame.id, bubble.bubbleId);
    }
  };

  const getContentOfArea = (area) => {
    const start = area.start;
    const end = area.end;
    const items = [];
    bubbles.forEach((bubble) => {
      if (
        start.x < bubble.x &&
        bubble.x < end.x &&
        start.y < bubble.y &&
        bubble.y < end.y
      ) {
        items.push(bubble.str);
      }
    });
    return items;
  };
  //   const [items, setItems] = useState([]);
  //   useEffect(() => {
  //     setItems(getContentOfArea(operation.area));
  //   }, []);

  return (
    <InnerContainer
      onClick={handleClick}
      style={{
        border:
          selected.bubble.bubbleId === bubble.bubbleId
            ? selectedBorder
            : defaultBorder,
      }}
    >
      {/* {items.length === 0
        ? "..."
        : items.map((text) => {
            return <ItemBox>{text}</ItemBox>;
          })} */}
      {selected.bubble.bubbleId === bubble.bubbleId ? (
        <Menu onClick={deleteOperation}>X</Menu>
      ) : (
        <></>
      )}
      {bubble.text}
    </InnerContainer>
  );
};

const InnerContainer = styled.div`
  display: flex;
  border: 1px solid black;
  position: relative;
  background-color: white;
  min-width: 30px;
`;

const Menu = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: red;
  top: -20px;
  right: -10px;
`;

const ItemBox = styled.div`
  border: 1px solid black;
  margin: 1px;
  min-width: 20px;
`;

const NewInput = ({ frameId, addContent, setShow }) => {
  const { bubble, setBubble } = useWebStore((state) => state);
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const inputBubble = {
      type: "text",
      bubbleId: bubble.Id + 1,
      text: value,
      mappings: {},
    };
    addContent(frameId, inputBubble);
    setBubble(inputBubble);

    setValue("");
    setShow(false);
  };

  const handleCancle = () => {
    setValue("");
    setShow(false);
  };

  return (
    <InputContainer>
      <input
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
      ></input>
      <AddBtn onClick={handleAdd}>추가</AddBtn>
      <CancleBtn onClick={handleCancle}>취소</CancleBtn>
    </InputContainer>
  );
};

const InputContainer = styled.div``;

const AddBtn = styled.button`
  border: 1px solid #04b404;
  background-color: #2efe2e;
`;

const CancleBtn = styled.button`
  border: 1px solid #df0101;
  background-color: #fa5858;
`;

export default WebFrame;
