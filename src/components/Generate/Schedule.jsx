import styled from 'styled-components';

const Schedule = ({ result }) => {
    return (
        <Container>
            <Date>{result.dates}</Date>
            <Title>{result.titles}</Title>
            <Content>{result.content}</Content>
        </Container>
    )
}

const Container = styled.div`
    width : 300px;
    height : 140px;
    border : 2px solid blue;

    margin : 10px;
`

const Date = styled.div`
`

const Title = styled.div`
`

const Content = styled.div`
`


export default Schedule;