import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import Card from './Card';

const Content = () => {    
    const navigate = useNavigate();
    const [list, setList] = useState([]);

    async function getGeneratorList() {
        try {
            const response = await axios.get(`http://3.35.252.162:8080/member/bookmark/list/${localStorage.getItem('memberId')}`);
            //console.log(response.data.result.bookmarkList);
            setList(response.data.result.bookmarkList);
        } catch (error) {
            console.error("Failed to get generator list", error);
        }
    }

    useEffect(() => {
        getGeneratorList();
    }, [])

    return (
        <Container>
            <Box>
                {list.map((item, index) => {
                    return (<Card key={index} item={item}/>);
                })}
                <Btn onClick={() => {navigate('/create')}}>+ 새로운 생성기</Btn>
            </Box>
        </Container>
    )
}

const Container = styled.div`
    background-color: #ffffff;
    flex-grow: 1;
    margin: 20px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px var(--Gray-800, #dedede);

    overflow-y: auto;
`

const Box = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

const Btn = styled.button`
    width: 260px;
    height: 140px;

    background-color : #FFFFFF;
    border: 3px solid #81B7F5;
    border-radius: 20px;
`

export default Content;