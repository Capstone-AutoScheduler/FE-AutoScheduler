import styled from 'styled-components';

import InputPDF from "./InputPDF";
const Src = () => {
    return (
        <Container>
            <Title>원본 파일</Title>
            <InputPDF />
        </Container>
    );
}

const Container = styled.div`
    width: 760px;
    height: 150px;
`

const Title = styled.div`
    margin: 0px 10px;
    font-size: 24px;
    font-weight: bold;
`

export default Src;