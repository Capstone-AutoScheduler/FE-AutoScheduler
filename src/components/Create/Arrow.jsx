import { useState } from 'react';
import styled from 'styled-components';

import useStore from '../../store/Store';

const Arrow = () => {
    const defaultArrowWidth = '4';
    const expandArrowWidth = '10';

    const { bubbles, startBubble, operations, setSelectedOperation, selectedOperation, offsetX, offsetY, frames} = useStore(state => state);
    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);

    function handleMouseMove(event) {
        //console.log('X', event.pageX, 'Y', event.pageY);
        setMouseX(event.pageX);
        setMouseY(event.pageY);
    }

    return (
        <SVG
            onMouseMove={handleMouseMove}>
            <defs>
                <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
                <polygon points="0 0, 5 2.5, 0 5" fill="black" />
                </marker>
            </defs>
            {
                //render exist operations
                operations.map((operation, index) => {
                    const start = bubbles[operation.startBubbleId];
                    const end = frames[operation.endBubbleId];
                    const color = (index === selectedOperation) ? "red" : "black";

                    return (
                        <path
                        key={index}
                        d={`M ${start.x + start.width} ${start.y + start.height/2} L ${end.x} ${end.y + end.height / 2}`}
                        strokeWidth={defaultArrowWidth}
                        stroke={color}
                        markerEnd='url(#arrowhead)'
                        onClick={() => {
                            console.log("clicked arrow of index ", index);
                            setSelectedOperation(index);
                        }}
                        onMouseEnter={(e) => { e.target.style.strokeWidth = expandArrowWidth; }}
                        onMouseLeave={(e) => { e.target.style.strokeWidth = defaultArrowWidth; }}
                        />
                    );  
                })
            }  
            {
                //render user current drag action
                (startBubble == null) 
                ?
                <></>
                :
                <>
                <circle cx={startBubble.x + startBubble.width} cy={startBubble.y + startBubble.height/2} r="4" fill="black" />
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
    background-color : transparent;
    width : 100%;
    height : 100%;
`

export default Arrow;