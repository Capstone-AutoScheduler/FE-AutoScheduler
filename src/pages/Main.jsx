import { useEffect, useRef } from 'react';

import styled from 'styled-components';
import Bubble from '../components/Bubble';

const Main = () => {
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
    ]   

    useEffect(() => {
        console.log(startRef);
        console.log(endRef);
    }, [startRef, endRef]);

    return (
        <Container>
            <Board>
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