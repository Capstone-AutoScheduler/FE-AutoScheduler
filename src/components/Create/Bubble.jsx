import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../../store/Store'

const Bubble = ({ item }) => {
    const { setStartBubble } = useStore(state => state)

    const ContainerRef = useRef(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const bgColor = 'rgba(20,200,150,0.3)';
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

    return (
        <Container 
            ref={ContainerRef}
            onMouseDown={handleMouseDown}
            style={{ backgroundColor: bgColor}}
        >
            {`${item.str}`}
        </Container>
    );
};

const Container = styled.div`
    background-color: rgba(20,200,150,0.3);
    position: absolute;
    user-select: none;
    font-size: 12px;

    padding: 2px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid rgba(20,200,150,0.5);
`

export default Bubble;