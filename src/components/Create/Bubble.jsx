import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../../store/Store'
import LockPNG from '../../images/lock.png'

const Bubble = ({ item }) => {
    const { setStartBubble, selected, setSelectedBubble, setMapping } = useStore(state => state)

    const ContainerRef = useRef(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const bgColor = 'rgba(20, 200, 150, 0.3)';
    const mappedBgColor = 'rgba(0, 0, 0, 0.3)';

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

    const defaultBorder = '1px solid rgba(20,200,150,0.5)';
    const selectedBorder = '2px solid red';

    function handleMouseUp() {
        setSelectedBubble(item);
    }

    function mapBubble() {
        setMapping(item.id, true);
    }

    return (
        <Container 
            ref={ContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ 
                backgroundColor: (item.mapping) ? mappedBgColor : bgColor,
                border: (selected.bubble === item) ? selectedBorder : defaultBorder
            }}
        >
            {item.str}
            {
            (selected.bubble === item) 
            ? 
            <Menu 
                onClick={mapBubble}
            >
                <IMG src={LockPNG}></IMG>
            </Menu>
            : 
            <></>
            }
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

const Menu = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    top: 0px;
    left: -30px;
    border: 1px solid black;
    border-radius: 20px;
`

const IMG = styled.img`
width: 20px;
height: 20px;
`

export default Bubble;