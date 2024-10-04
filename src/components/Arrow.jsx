import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import useStore from '../store/Store';

const Arrow = () => {
    const { bubbles, startBubble, operations } = useStore(state => state);
    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0);

    function handleMouseMove(event) {
        //console.log('X', event.pageX, 'Y', event.pageY);
        setMouseX(event.pageX);
        setMouseY(event.pageY);
    }

    const svgRef = useRef(null);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        if (svgRef != null) {
            const rect = svgRef.current.getBoundingClientRect();
            setOffsetX(rect.left);
            setOffsetY(rect.top);
        }
    }, []);

    return (
        <SVG
            ref={svgRef}
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
                    const end = bubbles[operation.endBubbleId];
                    return (
                        <path
                        key={index}
                        d={`M ${start.x + start.width} ${start.y + start.height/2} L ${end.x} ${end.y + end.height / 2}`}
                        strokeWidth="4"
                        stroke="black"
                        markerEnd='url(#arrowhead)'
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