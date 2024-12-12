import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

const Sidebar = () => {
    const [bricks, setBricks] = useState([]);

    async function getCurrentBricks() {
        // 이벤트 조회 api
        try {
            const response = await axios.get(`http://3.35.252.162:8080/event/member/${localStorage.getItem('memberId')}/recent`);
            console.log(response.data.result);
            setBricks(response.data.result.events);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    }

    useEffect(() => {
        getCurrentBricks();
    }, []);

    return (
        <Container>
            <Top>
                <div>최근 생성한 일정</div>
                <div style={{fontSize:'12px'}}>최신순▼</div>
            </Top>
            <CardBox>
                {
                    (bricks.length == 0)
                    ?
                    <div style={{height:'80%', color:'#ffffff', display:'flex', alignItems:'center', justifyContent:'center'}}>최근 생성한 일정이 없습니다...</div>
                    :
                    bricks.map((brick, index) => {
                        return (<Card key={index} brick={brick}></Card>);
                    })
                }
            </CardBox>
        </Container>
    );
};

const Container = styled.div`
    background-color: #008bf0;
    width: 250px;
    flex-shrink: 0;
    box-sizing: border-box;
    
    z-index: 10;
`;

const Top = styled.div`
    color: #FFFFFF;
    font-weight: bold;
    margin: 4px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0px;
`

const CardBox = styled.div`
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-right: 8px;

    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #a0d8ff;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #86caff;
    }
`

const Card = ({brick}) => {
    const navigate = useNavigate();

    //날짜 형식 변환
    function formatDate(dateString) {
        const datePart = dateString.split('T')[0];
        const [year, month, day] = datePart.split('-');
        const formattedDate = `${year.slice(2)}/${month}/${day}`;
        
        return formattedDate;
    }

    return (
        <CardContainer>
            <CardTop>
                <div style={{ fontSize: '14px'}}>{formatDate(brick.startDate)}</div>
                <GeneratorInfo onClick={() => {navigate(`/generator`)}}>생성기ID: {brick.generatorId}</GeneratorInfo> 
            </CardTop>
            <div style={{fontWeight: 'bold'}}>{brick.eventTitle}</div>
            <div style={{fontSize:'12px'}}>{brick.eventBody}</div>
        </CardContainer>
    );
}

const CardContainer = styled.div`


    background-color: rgba(255,255,255,20%);
    border-radius: 12px;
    width: 200px;
    padding: 10px;
    margin: 20px;
    margin-top: 0px;
    border: 2px solid rgba(255,255,255,20%)
`

const CardTop = styled.div`
    display: flex;
    justify-content: space-between;
`

const GeneratorInfo = styled.div`
    color: #343434;
    font-size: 12px;

    &:hover{
        text-decoration: underline;
    }
    cursor: pointer;
`

export default Sidebar;