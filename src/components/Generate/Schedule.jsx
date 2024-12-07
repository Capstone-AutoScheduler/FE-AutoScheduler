import { useState, useEffect } from 'react';

import styled from 'styled-components';

import useGenerateStore from '../../store/GenerateStore';

const Schedule = ({ result }) => {
    const { selectedResult, setSelectedResult, scheduleColor } = useGenerateStore(state=>state);
    const [ border, setBorder ] = useState('2px solid #000000');

    useEffect(() => {
        if (selectedResult === result.index){
            setBorder('4px solid red');
        } else {
            setBorder('2px solid ' + scheduleColor);
        }
        
    }, [ result, selectedResult, scheduleColor ])

    return (
        <Container 
            onClick={ () => { setSelectedResult(result.index)}} 
            style={{border: border}}
        >
            <Date>{result.date}</Date>
            <Title>{result.title}</Title>
            <Detail>{result.detail}</Detail>
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