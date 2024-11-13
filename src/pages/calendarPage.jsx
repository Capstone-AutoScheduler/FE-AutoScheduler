import React, { useState, useCallback, useEffect } from "react"; // useState, useCallback 추가
import styled from "styled-components";

// calendar 라이브러리 import
import { Calendar, View, DateLocalizer } from "react-big-calendar";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

// 모달 페이지 import
import InputDateModal from "./inputDateModal";

// sideDatailPage import
import SideDetailPage from "./sideDetailPage";

// bricks
import BrickList from "../components/BrickList";

const CalendarPage = () => {
  // calendar 시간 설정
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  //가져올 이벤트를 넣을 useState.
  const [myEvents, setMyEvents] = useState([]);

  //모달창을 띄울 useState
  const [onModal, setOnModal] = useState(0);

  //드래그 중인지 확인할 useState
  const [startDrag, setStartDrag] = useState(0);

  //모달을 닫을 함수
  const closeSetOnData = () => {
    setOnModal(0);
  };

  // 브릭 정보 <- 후에 백엔드에서 가져옴
  const [bricks, setbrick] = useState([
    {
      id: 1,
      title: "Capstone Design",
      start: new Date(2024, 9, 10, 13, 0), // 2024년 10월 9일 오후 1시
      end: new Date(2024, 9, 10, 14, 0), // 2024년 10월 9일 오후 2시
      calenderType: 0,
    },
    {
      id: 2,
      title: "Capstone Design",
      start: new Date(2024, 9, 11, 13, 0), // 2024년 10월 9일 오후 1시
      end: new Date(2024, 9, 11, 14, 0), // 2024년 10월 9일 오후 2시
      calenderType: 0,
    },
  ]);

  // slot 클릭 시 일정 추가 가능
  // 새로운 이벤트 입력 기능
  const [onMakeNewEvent, setOnMakeNewEvent] = useState();
  //새로운 이벤트 입력 기능
  //   const newEvent = useCallback(
  //     (event) => {
  //       setMyEvents((prev) => {
  //         setOnModal(500);
  //         setOnMakeNewEvent(event);
  //         return [...prev];
  //       });
  //     },
  //     [setMyEvents]
  //   );
  // 슬롯 선택 이벤트 핸들러
  const newEvent = useCallback((slotInfo) => {
    setOnMakeNewEvent(slotInfo);
    setOnModal(500); // 모달을 표시
    console.log("Slot clicked:", slotInfo); // 슬롯 클릭 시 콘솔에 로그 출력

    if (draggedEvent) {
      // 드랍 시 이벤트 추가
      const newEvent = {
        title: draggedEvent,
        start: slotInfo.start,
        end: moment(slotInfo.start).add(1, "hour").toDate(), // 1시간짜리 이벤트
      };
      setMyEvents([...myEvents, newEvent]);
      setDraggedEvent(null); // 드래그 상태 초기화
    }
  }, []);

  //보여줄 시간 양식을 재포맷
  const formatToShowDate = (jsDateStr) => {
    const date = new Date(jsDateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.getDay();
    let hours = "";
    const minutes = date.getMinutes();
    let pmAm = "PM";
    date.getHours() > 12
      ? (hours = date.getHours() - 12)
      : (hours = date.getHours());
    date.getHours() > 12 ? (pmAm = "PM") : (pmAm = "AM");
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const formattedDate = (
      <div>
        <span>
          {month}월 {day}일 ({week[weekday]}요일)
        </span>
        <br />
        <span className="hoursMinutes">
          {pmAm} {hours} : {minutes}
        </span>
      </div>
    );
    return formattedDate;
  };

  const [onSideDate, setOnSideDate] = useState(1200);
  const [onEventId, setOnEventId] = useState();
  const [onClickEventData, setOnClickEventData] = useState();
  //모달을 열어줄 useState
  const [openEventModal, setOpenEventModal] = useState(0);
  //모달을 닫을 함수
  const closeEventModal = () => {
    setOpenEventModal(0);
  };
  //사이드 메뉴를 열고 닫음
  const openSideMenu = (event) => {
    console.log(event);
    setOpenEventModal(500);
    setOnEventId(event.id);
    if (onSideDate === 0 && event.id === onEventId) setOnSideDate(800);
    else setOnSideDate(0);
    setOnClickEventData(event);
  };

  //   //클릭한 날짜의 정보를 받아옴
  //   const [handleDate, setHandleDate] = useState();
  //   const handleDateChange = (date) => {
  //     console.log(date);
  //     setHandleDate(date);
  //   };
  //   //클릭한 view의 정보를 받아옴
  //   const [currentView, setCurrentView] = useState();
  //   const handleViewChange = (newView) => {
  //     setCurrentView(newView);
  //   };

  // 드래그 앤 드랍
  const [draggedEvent, setDraggedEvent] = useState(null);

  // InputDateModal.jsx에서 newEventDataToServer저장하고 newEvent에 set해주는 함수
  const saveNewEventData = (newEventDataToServer, id) => {
    const newEventData = {
      id: id,
      title: newEventDataToServer.eventTitle,
      start: new Date(newEventDataToServer.startDate),
      end: new Date(newEventDataToServer.endDate),
      calenderType: 0,
      eventMemo: newEventDataToServer.eventBody,
    };
    setMyEvents([...myEvents, newEventData]);
    console.log("#####", myEvents);
  };

  // 이벤트 조회 api
  async function getEvents() {
    try {
      const response = await axios.get(
        "http://3.35.252.162:8080/events/member/6"
      );
      const transformedEvents = response.data.result.events.map((event) => ({
        id: event.eventId,
        title: event.eventTitle,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        calendarType: 0,
        eventMemo: event.eventBody,
      }));
      console.log(transformedEvents);
      setMyEvents(transformedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  // 드래그 시작될 때 실행
  const dragStart = (e) => {
    setStartDrag(1);
    console.log(e.target.innerHTML);
  };

  let toolbarLabel;
  var year, month;
  var day;
  var dayColumn, monthRow;
  // 드롭 시 이벤트
  // 드랍 (커서 뗐을 때)
  const drop = (e) => {
    console.log(e.target.innerHTML);
    console.log(e.clientX);
    console.log(e.clientY);
    var currentDate;
    var date;

    // 드롭된 위치의 슬롯 정보 가져오기
    const slotElement = document.elementFromPoint(e.clientX, e.clientY);

    // '.rbc-day-bg' 요소인지 확인
    if (slotElement && slotElement.classList.contains("rbc-day-bg")) {
      const date = slotElement.getAttribute(""); // 슬롯의 날짜 정보
      console.log("Dropped on slot:", date);

      // slot의 위치정보 가져오기
      const parent = slotElement.parentNode; // 부모 요소
      const children = Array.from(parent.children); // 부모의 모든 자식 요소를 배열로 변환

      const grandParent1 = parent.parentNode; // 부모 요소
      const grandParent2 = grandParent1.parentNode; // 부모 요소

      const grandParent2Children = Array.from(grandParent2.children); // 부모의 모든 자식 요소를 배열로 변환

      console.log(children.indexOf(slotElement)); // 현재 요소의 인덱스 반환
      console.log(grandParent2Children.indexOf(grandParent1) - 1); // 현재 요소의 인덱스 반환
      dayColumn = children.indexOf(slotElement);
      monthRow = grandParent2Children.indexOf(grandParent1) - 1;

      // November 2024 정보를 가져오는 JavaScript 코드 // 왜 class이름으로 가져오면 다른 값 가져옴?
      // 이전 형제 요소 가져오기
      const previousSibling = grandParent2.previousElementSibling;
      const previousSiblingChildren = Array.from(previousSibling.children); // 부모의 모든 자식 요소를 배열로 변환
      console.log(previousSiblingChildren[1].textContent);
      currentDate = previousSiblingChildren[1].textContent;

      // const startDate = new Date(date);
      // const newEvent = {
      //   start: startDate,
      //   end: new Date(startDate.getTime() + 60 * 60 * 1000), // 1시간 후로 설정
      //   title: eventTitle,
      // };

      // // 상태 업데이트 (이벤트 추가)
      // setEvents((prevEvents) => [...prevEvents, newEvent]);
      // alert(`Event "${eventTitle}" dropped on ${startDate.toLocaleString()}`);
      convertMonthYearToNumeric(currentDate);
      day = getFirstDayOfMonth();
      console.log("day: ", day);
      onSubmitEventData(e);
    }
  };

  function convertMonthYearToNumeric(monthYearString) {
    // 월 이름과 숫자를 매핑하는 객체
    const monthMap = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    // 문자열을 공백으로 분리하여 월과 연도를 가져옴
    var currentDate = monthYearString.split(" ");
    var monthName = currentDate[0]; // 첫 번째 부분이 월 이름
    year = currentDate[1]; // 두 번째 부분이 연도

    // 월 이름을 숫자로 변환
    month = monthMap[monthName];
  }

  function getFirstDayOfMonth() {
    console.log("year, month", year, month);
    // month는 0부터 시작하므로, 1월은 0, 2월은 1, ..., 12월은 11
    const date = new Date(`${year}-${month}-1`); // month - 1로 조정
    const dayIndex = date.getDay(); // 0(일요일) ~ 6(토요일)
    console.log("요일", dayIndex);

    return dayIndex; // 해당 요일 반환
  }

  //event를 db에 넣어줄 mutation
  async function onSubmitEventData(e) {
    console.log("$$$$$", e.title);
    var id = 0;
    var date = (monthRow - 1) * 7 + (7 - day) + (dayColumn + 1);
    const newStartDate = new Date(year, Number(month) - 1, date, 0, 0);
    newStartDate.setHours(newStartDate.getHours() + 9);
    const newEndDate = new Date(year, Number(month) - 1, date + 1, 0, 0);
    newEndDate.setHours(newEndDate.getHours() + 9);
    var newEventData = {
      // // 이벤트 저장 api에 보낼 데이터
      eventTitle: e.title,
      eventBody: null,
      startDate: newStartDate,
      endDate: newEndDate,
    };
    console.log("!!!@@@###", newEventData);
    try {
      const response = await axios.post(
        "http://3.35.252.162:8080/events/",
        newEventData,
        {
          params: { memberId: 6 },
        }
      );
      console.log("!!!", response);
      console.log("^^^^^^^^^^^^^^^^", response.data.result.start);
      console.log("^^^^^^^^^^^^^^^^", response.data.result.end);
      id = response.data.result.eventId;
    } catch (error) {
      console.log("why fucking error", error);
    }
    // try {
    //   const response = await axios.get("/events/member/6");
    //   console.log("!!!", response);
    // } catch (error) {
    //   console.log(error);
    // }
    // saveNewEventData(newEventData, id); // 리렌더링 되도록 다시 셋
    getEvents();

    // mutateSubmit({
    //   title: eventTitle,
    //   start: onFormatChange(newEventData.slots[0]),
    //   end: onFormatChange(onEndDay),
    //   allday: onAllDay,
    //   memo: eventMemo,
    // });
  }

  return (
    <Container>
      <Sidebar_Container>
        <Title>AutoSchduler</Title>
        <Sidebar>
          <BrickList
            brickList={bricks}
            setDraggedEvent={setDraggedEvent}
            drop={drop}
            dragStart={dragStart}
          />
        </Sidebar>
      </Sidebar_Container>
      <InputDateModal // 일정 추가 모달 생성
        open={onModal}
        close={closeSetOnData}
        newEventData={onMakeNewEvent}
        events={myEvents}
        formatToShowDate={formatToShowDate}
        saveNewEventData={saveNewEventData}
        getEvents={getEvents}
      />
      <Calendar_Container>
        <Calendar
          draggable
          localizer={localizer}
          events={myEvents}
          //새로운 이벤트 생성 함수
          onSelectSlot={newEvent}
          //이벤트 클릭시 실행 함수
          onSelectEvent={openSideMenu}
          style={{ height: 500, width: 700 }}
          //   date={handleDate}
          //   //이번달 이전 다음 에서 가져올 값들
          //   onNavigate={handleDateChange}
          //   // view를 바꿀 함수 toolbar에 있는 모든 값을 받을 수 있다.
          //   onView={handleViewChange}
          //   //보여질 화면
          //   view={currentView}
          selectable={true}
          onDragOver={(e) => e.preventDefault()} // 드롭 허용
          onDrop={(e) => newEvent(e)} // 슬롯에 드롭 시 이벤트 추가
        />
      </Calendar_Container>
      <div className="rightArticle">
        <SideDetailPage
          openModal={openEventModal}
          closeModal={closeEventModal}
          onData={onClickEventData}
          close={openSideMenu}
          // refetchOnLoadData={refetchOnLoadData}
          formatToShowDate={formatToShowDate}
          // onFormatChange={formatToOracleDate}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 800px;
`;

const Sidebar_Container = styled.div`
  padding-left: 260px;
  padding-top: 20px;
  width: 330px;
  height: 100%;
`;

const Title = styled.div`
  padding-left: 14px;
  padding-bottom: 72px;
  font-size: 19px;
  font-weight: bold;
  color: rgba(27, 80, 103, 255);
`;

const Sidebar = styled.div`
  padding-left: 38px;
  padding-top: 50px;
  background-color: rgba(244, 250, 254, 255);
  width: 230px;
  height: 450px;
  border-radius: 20px;
`;

const Board = styled.div`
  position: relative;
  height: 600px;
  width: 400px;
  border: 1px solid black;
`;

const Calendar_Container = styled.div`
  width: 100vh;
  padding-top: 120px;
`;

export default CalendarPage;
