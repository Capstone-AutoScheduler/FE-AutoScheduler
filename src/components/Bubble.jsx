import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../store/Store'

const Bubble = ({ item }) => {
    const { startBubble, endBubble, operations, setStartBubble, setEndBubble, appendOperation } = useStore(state => state)

    const ContainerRef = useRef(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        setX(item.x);
        setY(item.y);
        ContainerRef.current.style.width = item.width + 'px';
        ContainerRef.current.style.height = item.height + 'px';
    }, []);

    useEffect(() => {
        //console.log(ContainerRef);
        ContainerRef.current.style.top = y + 'px';
        ContainerRef.current.style.left = x + 'px';
    }, [x, y]);

    function handleMouseDown() {
        setStartBubble(item);
    }

    function handleMouseUp() {
        if ( startBubble != null ) {
            if (item.id !== startBubble.id) {
                setEndBubble(item);
                appendOperation(`Dragged from ${startBubble.id} to ${item.id}`);
            }
        }
    }

    return (
        <Container 
            ref={ContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {`id: ${item.id}`}
        </Container>
    );
};

const Container = styled.div`
    background-color: green;
    position: absolute;
    user-select: none;
`

export default Bubble;