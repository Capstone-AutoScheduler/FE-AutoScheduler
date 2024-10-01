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
            <defs>
                <marker id="arrowhead" markerWidth="5" markerHeight="5" 
                        refX="5" refY="2.5" orient="auto">
                  <polygon points="0 0, 5 2.5, 0 5" fill="black" />
                </marker>
            </defs>
            {
                ((mouseX === 0) && (mouseY === 0)) 
                ?
                <></>
                :
                <>
                
                <path 
                d={`M ${startBubble.x + startBubble.width} ${startBubble.y + startBubble.height/2} L ${mouseX - offsetX} ${mouseY - offsetY}`}
                strokeWidth="4"
                stroke="black"
                markerEnd='url(#arrowhead)'
                />
                </>
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