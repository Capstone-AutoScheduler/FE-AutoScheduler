import { useState } from 'react';
import styled from 'styled-components';

import useStore from '../store/Store';

const Arrow = ({ boardRef }) => {
    const { startBubble } = useStore(state => state);
    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);

    const offsetX = boardRef.current.offsetLeft;
    const offsetY = boardRef.current.offsetTop;

    function handleMouseMove(event) {
        //console.log('X', event.pageX, 'Y', event.pageY);
        setMouseX(event.pageX);
        setMouseY(event.pageY);
    }

    return (
        <SVG
            onMouseMove={handleMouseMove}>
            <circle cx={startBubble.x + startBubble.width} cy={startBubble.y + startBubble.height/2} r="4" fill="black" />
            {
                ((mouseX === 0) && (mouseY === 0)) 
                ?
                <></>
                :
                <path 
                d={`M ${startBubble.x + startBubble.width} ${startBubble.y + startBubble.height/2} L ${mouseX - offsetX} ${mouseY - offsetY}`}
                strokeWidth="4"
                stroke="black"
                />
            }
            
        </SVG>
    )
}

const SVG = styled.svg`
    background-color : #F3F3F3;
    width : 100%;
    height : 100%;
`

export default Arrow;