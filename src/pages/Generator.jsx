import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Generator = () => {
    const navigate = useNavigate();

    return (
        <Container>
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