import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ToolbarMini from "./ToolbarMini";
// import { useMutation } from "react-query";
import axios from "axios";

const InputDateModal = (props) => {
  const {
    open,
    close,
    newEventData,
    events,
    formatToShowDate,
    saveNewEventData,
    getEvents,
  } = props;
  const [onCalendar, setOnCalendar] = useState(0); //미니 캘린더의 크기를 조절할 스테이트
  const [selectOrder, setSelectOrder] = useState(0); // 시작날짜, 끝날짜 캘린더 정하기
  const [eventTitle, setEventTitle] = useState();
  const [eventMemo, setEventMemo] = useState();
  const [onAllDay, setOnAllDay] = useState();
  const [onEndDay, setEndDay] = useState();
  const [newEventDataInModal, setnewEventDataInModal] = useState();
  const onOpenStartDateCalendar = () => {
    if (onCalendar === 0) setOnCalendar(230);
    else setOnCalendar(0);
    setSelectOrder(0);
  };
  const onOpenEndDateCalendar = () => {
    if (onCalendar === 0) setOnCalendar(230);
    else setOnCalendar(0);
    setSelectOrder(1);
  };
  const onEventTitle = (e) => {
    //제목을 입력
    setEventTitle(e.target.value);
  };
  const onEventMemo = (e) => {
    //메모를 입력
    setEventMemo(e.target.value);
  };

  // //새로운 값을 입력할 유즈쿼리문
  // const {
  //   data: dataSubmit,
  //   mutate: mutateSubmit,
  //   isSuccess: isSuccessSubmit,
  // } = useMutation("submitSchedule", submitSchedule);

  useEffect(() => {
    setEndDay(
      newEventData &&
        new Date(
          newEventData.slots[newEventData.slots.length - 1].getTime() +
            23 * 60 * 60 * 1000 +
            59 * 60 * 1000
        )
    );
    setOnAllDay(true);
    setnewEventDataInModal(newEventData);
  }, [newEventData]);

  useEffect(() => {
    if (onAllDay === false)
      setEndDay(newEventData.slots[newEventData.slots.length - 1]);
    else
      setEndDay(
        newEventData &&
          new Date(
            newEventData.slots[newEventData.slots.length - 1].getTime() +
              23 * 60 * 60 * 1000 +
              59 * 60 * 1000
          )
      );
  }, [onAllDay]);

  const handleCheckboxChange = () => {
    setOnAllDay(!onAllDay);
  };

  const selectDate = (slotinfo) => {
    if (selectOrder === 0) newEventDataInModal.start = slotinfo.start;
    else newEventDataInModal.end = slotinfo.end;
    setOnCalendar(0);
  };

  const onSubmitEventData = async () => {
    // 입력했던 값 빈값으로 초기화
    setEventTitle("");
    setEventMemo("");
    //event를 db에 넣어줄 mutation
    if (eventTitle && eventMemo) {
      var id = 0;
      const newStartDate = newEventDataInModal.start;
      newStartDate.setHours(newStartDate.getHours() + 9);
      const newEndDate = newEventDataInModal.end;
      newEndDate.setHours(newEndDate.getHours() + 9);
      var newEventDataToServer = {
        // 이벤트 저장 api에 보낼 데이터
        eventTitle: eventTitle,
        eventBody: eventMemo,
        startDate: newStartDate,
        endDate: newEndDate,
      };
      try {
        const response = await axios.post(
          "http://3.35.252.162:8080/events/",
          newEventDataToServer,
          {
            params: { memberId: 6 },
          }
        );
        id = response.data.result.eventId;
      } catch (error) {
        console.log(error);
      }
      getEvents();
      close();
    } else {
      console.log("입력값이 없습니다."); // 입력값 없을 때 처리해주기
    }
  };

  const setTitleContent = () => {
    // 입력했던 값 빈값으로 초기화
    setEventTitle("");
    setEventMemo("");
  };

  // useEffect(() => {
  //   //데이터 입력이 완료되면 리패치를 하여 재랜더링 되게 한다.
  //   if (isSuccessSubmit && dataSubmit) {
  //     console.debug("## submit refetch => ", dataSubmit);
  //     refetchOnLoadData();
  //     close();
  //     setEventTitle("");
  //     setEventMemo("");
  //   }
  // }, [isSuccessSubmit, dataSubmit, refetchOnLoadData]);

  return (
    <InputModalContainer style={{ height: open }}>
      <div className="inputModalHead">
        <button
          className="modalClose"
          onClick={() => {
            setTitleContent();
            close();
          }}
        >
          닫기
        </button>
      </div>
      <div className="inputModalBody">
        <input
          type="text"
          className="inputTitle"
          placeholder="제목을 입력하세요"
          value={eventTitle || ""}
          onChange={onEventTitle}
        ></input>
        <div className="changeDate">
          <button className="setDate" onClick={onOpenStartDateCalendar}>
            {newEventDataInModal && formatToShowDate(newEventDataInModal.start)}
          </button>
          <button className="setDate" onClick={onOpenEndDateCalendar}>
            {newEventDataInModal && formatToShowDate(newEventDataInModal.end)}
          </button>
        </div>
        <div className="inputCalendar" style={{ height: onCalendar }}>
          <Calendar
            localizer={momentLocalizer(moment)}
            // events={events}
            selectable={true}
            onSelectSlot={selectDate}
            style={{
              backgroundColor: "white",
              height: 230,
              width: 280,
            }}
            components={{ toolbar: ToolbarMini }}
          />
        </div>

        <textarea
          className="inputTextArea"
          placeholder="내용을 입력하세요"
          value={eventMemo}
          onChange={onEventMemo}
        ></textarea>
      </div>
      <div className="inputModalFooter">
        <div className="checkAllDayBox">
          <input
            type="checkbox"
            id="allDayCheck"
            className="allDayCheckBox"
            checked={onAllDay}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="allDayCheck" className="allDayLabel">
            종일
          </label>
        </div>
        <button className="modalSubmit" onClick={onSubmitEventData}>
          저장
        </button>
      </div>
    </InputModalContainer>
  );
};

const InputModalContainer = styled.div`
  position: fixed;
  top: 18%;
  left: 40%;
  width: 400px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 7px;
  box-shadow: 5px 5px 30px #aaa;
  overflow: hidden;
  transition: 0.3s ease-out;
  .inputModalHead {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #eee;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    justify-content: end;
    .modalClose {
      margin-right: 5px;
      border: none;
      font-weight: bolder;
      border-top-right-radius: 7px;
      color: #a1a1a1;
      cursor: pointer;
      &:hover {
        color: black;
      }
    }
  }
  .changeDate {
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: space-evenly;
    .setDate {
      width: 170px;
      border: none;
      border-radius: 7px;
      background-color: white;
      &:hover {
        background-color: #eee;
      }
      &:active {
        background-color: rgba(49, 116, 173);
        color: white;
      }
    }
  }
  .inputModalBody {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .inputTitle {
      margin-top: 4px;
      width: 90%;
      height: 40px;
      border: none;
      border-bottom: 1px solid #ccc;
      font-size: 20px;
      &::placeholder {
        font-size: 20px;
      }
      &:focus {
        outline: none;
        border-bottom: 3px solid rgba(49, 116, 173);
        transition: 0.1s ease-in;
      }
    }
    .inputCalendar {
      position: absolute;
      top: 9rem;
      transition: ease-in 0.2s;
      overflow: hidden;
      border-radius: 6px;
      box-shadow: 0px 0px 20px #ccc;
    }
    .inputTextArea {
      width: 90%;
      height: 70%;
      border: 1px solid #ccc;
      border-radius: 7px;
      resize: none;
      font-size: 15px;
      padding: 5px 0 0 5px;
      &:focus {
        outline: none;
        border: 1px solid rgba(49, 116, 173);
        transition: 0.8s ease-in;
      }
    }
  }
  .inputModalFooter {
    width: 95%;
    height: 13%;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .modalSubmit {
      width: 80px;
      height: 40px;
      border-radius: 5px;
      border: none;
      background-color: rgba(49, 116, 173);
      color: white;
      margin-right: 10px;
    }
    .checkAllDayBox {
      display: flex;
      justify-content: center;
      align-items: center;

      .allDayCheckBox {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(49, 116, 173);
        border-radius: 0.35rem;

        &:checked {
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-color: rgba(49, 116, 173);
        }
      }
      .allDayLabel {
        display: flex;
        align-items: center;
        user-select: none;
        font-size: 13px;
      }
    }
  }
`;

export default InputDateModal;
