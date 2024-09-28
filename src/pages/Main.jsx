import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useStore from '../store/Store'

import Bubble from '../components/Bubble';


const Main = () => {
    const { operations, setStartBubble, setEndBubble } = useStore(state => state)

    const bubbles = [
        {
            id : 0,
            x : 100,
            y : 100,
            width : 80,
            height : 60
        },
        {
            id : 1,
            x : 200,
            y : 200,
            width : 80,
            height : 60
        },
        {
            id : 2,
            x : 50,
            y : 400,
            width : 80,
            height : 60
        },
    ]   

    const handleMouseUp = () => {
        setStartBubble(null);
        setEndBubble(null);
    }

    useEffect(() => {
        console.log(operations);
    }, [operations])

    return (
        <Container>
            <Board
                onMouseUp={ handleMouseUp }
            >
                {bubbles.map((bubble) => {
                    return <Bubble
                        key = {bubble.id}
                        item = {bubble}
                    />
                })}
            </Board>
        </Container>
    );
};

const Container = styled.div`
    height: 800px;
`

const Board = styled.div`
    height: 600px;
    border: 1px solid black;
`

export default Main