import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

const Card = ({item}) => {
    const navigate = useNavigate();
    const [typeColor, setTypeColor] = useState('#4caf50');

    useEffect(() => {
        if (item.sourceType === 'PDF') {setTypeColor('#b30c00')}
        else {setTypeColor('#4caf50')}
    }, [])
    return (
        <Container onClick={() => {navigate(`/generate/${item.generatorId}`)}}>
            <Info>
                <Type>
                    <TypeContent>
                        <div style={{marginRight:'4px', backgroundColor: typeColor, width: '15px', height: '15px', borderRadius: '15px'}}></div>
                        <div style={{color: typeColor}}>{item.sourceType}</div>
                    </TypeContent>
                </Type>
                <Creator>
                    <CreateContent>
                        <div style={{marginRight:'4px', backgroundColor:'#008bf0', width: '15px', height: '15px', borderRadius: '15px'}}></div>
                        <div>{item.memberName}</div>
                    </CreateContent>
                </Creator>
            </Info>
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
const Info = styled.div`
    display: flex;
`
const Creator = styled.div`
    display: flex;
`

const CreateContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    padding: 0px 4px;
    color: #008bf0;
    background-color:#FFFFFF;
    border-radius: 4px;
`

const Type = styled.div`
    display: flex;
`

const TypeContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 4px;
    padding: 0px 4px;
    background-color:#FFFFFF;
    border-radius: 4px;
`

const Detail = styled.div`
    color: #BBBBBB;
    display: -webkit-box; /* 플렉스박스를 사용한 레이아웃 */
    -webkit-box-orient: vertical; /* 텍스트를 세로 방향으로 정렬 */
    -webkit-line-clamp: 3; /* 최대 줄 수를 3줄로 제한 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
`

export default Card;