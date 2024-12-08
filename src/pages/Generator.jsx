import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import Box from '../components/Generator/Box';

const Generator = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Box></Box>
            <div>내 생성기 페이지</div>
            <Btn onClick={() => {navigate('/create')}}>생성기 만들기</Btn>
        </Container>
    );
}

const Container = styled.div`
    display : flex;
    height: 90vh;
`

const Btn = styled.button`
    background-color : #3344DD;
    width: 100px;
    height: 60px
`

export default Generator;