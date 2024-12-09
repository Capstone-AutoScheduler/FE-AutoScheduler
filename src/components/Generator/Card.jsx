import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

const Card = ({item}) => {
    const navigate = useNavigate();
    //console.log(item);
    return (
        <Container onClick={() => {navigate(`/generate/${item.generatorId}`)}}>
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

    &:hover {
        background-color: #008bf0;
        border: 5px solid #006bd0;
    }
`

const Title = styled.div`
    font-weight: bold;
`

const Detail = styled.div`
    color: #BBBBBB;
`

export default Card;