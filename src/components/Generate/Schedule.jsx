import styled from 'styled-components';

const Schedule = ({ result }) => {
    return (
        <Container>
            <Date>{result.dates}</Date>
            <Title>{result.titles}</Title>
            <Detail>{result.details}</Detail>
        </Container>
    )
}

const Container = styled.div`
    width : 280px;
    height : 80%;
    border : 2px solid blue;

    margin : 8px;

    flex-shrink : 0;
`

const Date = styled.div`
`

const Title = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`

const Detail = styled.div`
    color: gray;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`


export default Schedule;