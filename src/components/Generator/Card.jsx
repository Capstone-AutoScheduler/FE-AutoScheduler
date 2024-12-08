import styled from 'styled-components';

const Card = ({item}) => {
    return (
        <Container>
            <Title>{item.generatorTitle}</Title>
            <Detail>{item.generatorDetail}</Detail>
        </Container>
    );
}

const Container = styled.div`
    width: 260px;
    height: 140px;
    padding: 10px;

    color: #FFFFFF;
    background-color: #008bf0;
    border: 3px solid #81B7F5;
    border-radius: 20px;

    cursor: pointer;
`

const Title = styled.div`
    font-weight: bold;
`

const Detail = styled.div`
    color: #BBBBBB;
`

export default Card;