import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

const Bubble = ({ item }) => {
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

    function handleClick() {
    }

    return (
        <Container 
            ref={ContainerRef}
            onClick={handleClick}
        >
            {`id: ${item.id}`}
        </Container>
    );
};

const Container = styled.div`
    background-color: green;
    position: absolute;

`

export default Bubble;