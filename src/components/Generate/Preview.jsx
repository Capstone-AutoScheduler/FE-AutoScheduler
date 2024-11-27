import styled from 'styled-components';

const Preview = () => {
    return (
        <Container>
            <Calendar></Calendar>
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

const Calendar = styled.div`
    width: 500px;
    height: 240px;
    margin: 4px;
    background-color: gray;
`

const AddBtn = styled.button`
    margin: 4px;
`

export default Preview;