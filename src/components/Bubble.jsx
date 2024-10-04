import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../store/Store'

const Bubble = ({ item }) => {
    const { startBubble, setStartBubble, setEndBubble, appendOperation } = useStore(state => state)

    const ContainerRef = useRef(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        //console.log(ContainerRef);
        setX(item.x);
        setY(item.y);
        ContainerRef.current.style.width = item.width + 'px';
        ContainerRef.current.style.height = item.height + 'px';
        ContainerRef.current.style.top = y + 'px';
        ContainerRef.current.style.left = x + 'px';
    }, [x, y, item]);

    function handleMouseDown() {
        setStartBubble(item);
    }

    function handleMouseUp() {
        if ( startBubble != null ) {
            if (item.id !== startBubble.id) {
                setEndBubble(item);
                appendOperation(
                    {
                        type: "drag",
                        startBubbleId: startBubble.id,
                        endBubbleId: item.id,
                        childOperations: []
                    }
                );
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