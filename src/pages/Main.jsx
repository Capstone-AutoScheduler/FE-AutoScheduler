import { useEffect } from 'react';
import styled from 'styled-components';

import useStore from '../store/Store'

import Bubble from '../components/Bubble';
import Arrow from '../components/Arrow';

const Main = () => {
    const { bubbles, operations, setStartBubble, setEndBubble } = useStore(state => state)

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
                <Arrow />
            </Board>
        </Container>
    );
};

const Container = styled.div`
    height: 800px;
`

const Board = styled.div`
    position: relative;
    height: 600px;
    border: 1px solid black;
`

export default Main