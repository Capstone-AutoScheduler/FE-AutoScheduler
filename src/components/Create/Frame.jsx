import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../../store/Store'

const Frame = ({ item }) => {
    const { startBubble, setEndBubble, appendOperation } = useStore(state => state)

    const ContainerRef = useRef(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const bgColor = 'rgba(235, 186, 7, 0.3)';
    useEffect(() => {
        //console.log(ContainerRef);
        setX(item.x);
        setY(item.y);
        ContainerRef.current.style.width = item.width + 'px';
        ContainerRef.current.style.height = item.height + 'px';
        ContainerRef.current.style.top = y + 'px';
        ContainerRef.current.style.left = x + 'px';
    }, [x, y, item]);


    function handleMouseUp() {
        if ( startBubble != null ) {
            if (item !== startBubble) {
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
            onMouseUp={handleMouseUp}
            style={{ backgroundColor: bgColor }}
        >
            {`${item.str}`}
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    user-select: none;
    font-size: 12px;

    padding: 2px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 2px solid rgba(235, 186, 7, 0.7);
`

export default Frame;