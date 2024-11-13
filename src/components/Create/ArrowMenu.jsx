import { useState, useEffect } from 'react';

import styled from "styled-components";

import useStore from "../../store/Store";

const ArrowMenu = () => {
    const { operations, selectedOperation, setSelectedOperation, removeOperation, frames } = useStore(state => state);
    const [ x, setX ] = useState(0);
    const [ y, setY ] = useState(0);

    useEffect(() => {
        if (selectedOperation != null){
            const end = frames[operations[selectedOperation].endBubbleId];
            console.log("end of clicked", end);
            setX(end.x);
            setY(end.y);
        }
    }, [selectedOperation])
    
    return (
        (selectedOperation === null) ? 
        <></> :
        <Container
            style={{
                top: y - 70 + 'px', 
                left: x + 'px',
            }}
        >
            <Option>가공 추가</Option>
            <Option>기타 작업</Option>
            <Option onClick={() => {
                removeOperation(selectedOperation);
                setSelectedOperation(null);
            }}>삭제</Option>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
`

const Option = styled.span`
    margin: 4px;
    padding: 15px 15px;
    background-color: #2980b9;
    border-radius: 15px;
    &:hover {
        background-color: #096099;
    }
    &:active {
        background-color: #0c4974;
        transform: scale(0.90);
    }
`

export default ArrowMenu;
