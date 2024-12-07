import { useState, useEffect } from 'react';
import styled from 'styled-components';

import useGenerateStore from '../../store/GenerateStore';

import Palette from './Palette';

const Preview = () => {
    const { results, scheduleColor } = useGenerateStore(state=>state);

    const [ year, setYear ] = useState(2024);
    const [ month, setMonth ] = useState(12);
    const [ dates, setDates ] = useState([]);

    const createDate = () => {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        // 시작일 정보
        const startDay = startDate.getDate();
        const startWeekDay = startDate.toLocaleString('en-US', { weekday: 'long' });
        // 종료일 정보
        const endDay = endDate.getDate();
        const endWeekDay = endDate.toLocaleString('en-US', { weekday: 'long' });

        const dateInfo = {
            startDate: {
                day: startDay,
                weekday: startWeekDay,
            },
            endDate: {
                day: endDay,
                weekday: endWeekDay,
            },
        };
        const arr = [];
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        const relatedResults = Array(31).fill(false);
        results.forEach((result) => {
            const temp = new Date(result.date);
            if (temp.getMonth() + 1 === month) {
                relatedResults[temp.getDate()] = true;
            }
        })
        for (var i=0; i < 6; i++) {
            if (dateInfo.startDate.weekday === weekdays[i]) { 
                break; 
            } else { 
                arr.push({ num: -1 });
            }
        }
        for (i=1; i <= 31; i++) {
            if (relatedResults[i]) { arr.push({ num:i, box: true}) }
            else { arr.push({ num: i, box: false }); }
            if (dateInfo.endDate.day === i) { break; } 
        }
        while ( arr.length % 7 !== 0 ) {
            arr.push({ num: -1 })
        }
        setDates(arr);
    }

    useEffect(() => {
        createDate();
    }, [year, month])

    const nextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(val => val + 1);
        } else {
            setMonth(val => val + 1)
        }
    }

    const prevMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(val => val - 1);
        } else {
            setMonth(val => val - 1)
        }
    }

    return (
        <Container>
            <Top>
                <Palette />
                <Info>
                    <MonthBtn onClick={prevMonth}>◀</MonthBtn>
                    {`${year}년 ${month}월`}
                    <MonthBtn onClick={nextMonth}>▶</MonthBtn>
                </Info>
            </Top>
            <Calendar>
                    <Weekday>일</Weekday>
                    <Weekday>월</Weekday>
                    <Weekday>화</Weekday>
                    <Weekday>수</Weekday>
                    <Weekday>목</Weekday>
                    <Weekday>금</Weekday>
                    <Weekday>토</Weekday>
                    {dates.map((date, index) => {
                        return (
                            <Day key={index}>
                                <Num>{(date.num === -1) ? '' : date.num}</Num>
                                {(date.box) ? <Box style={{border: '4px solid ' + scheduleColor}}></Box> : <></>}
                            </Day>
                        );
                    })}
            </Calendar>
            <AddBtn>캘린더에 추가하기</AddBtn>
        </Container>
    );
}

const Container = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px var(--Gray-800, #DEDEDE);

    display: flex;
    flex-direction: column;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
`

const Info = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin: 4px;
    width: 180px;
    display: flex;
    justify-content: space-between;
`

const MonthBtn = styled.button`
    border: 1px solid black;
    margin: 0px 4px;
    border-radius: 8px;
`

const Calendar = styled.div`
    width: 500px;
    height: 240px;
    margin: 4px;
    background-color: gray;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 5px;
`

const Weekday = styled.div`
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Day = styled.div`
    border: 1px solid black;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AddBtn = styled.button`
    margin: 4px;
`

const Num = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 12px;
`

const Box = styled.div`
    width: 35px;;
    height: 20px;
`

export default Preview;