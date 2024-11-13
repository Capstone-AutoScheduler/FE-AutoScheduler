import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useStore from '../../store/Store';
import Arrow from './Overlay/Arrow';

const Overlay = () => {
    const { bubbles, startBubble, mouseX, mouseY, offsetX, offsetY, selectedFrame } = useStore(state => state);

    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        if (selectedFrame !== null) {
            setTitle(selectedFrame.title);
            setDate(selectedFrame.date);
            setDetail(selectedFrame.detail);
        } else {
            setTitle(null);
            setDate(null);
            setDetail(null);
        }
    }, [selectedFrame])

    return (
        <>
            <SVG>
                <defs>
                    <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
                        <polygon points="0 0, 5 2.5, 0 5" fill="black" />
                    </marker>
                </defs>
                {
                    (title !== null) && (selectedFrame !== null)
                    ?
                    title.map((operation) => {
                        const start = bubbles[operation.startBubbleId];
                        return ( <Arrow end={selectedFrame} start={start} /> );
                    })
                    :
                    <></>
                }
                {
                    (date !== null) && (selectedFrame !== null)
                    ?
                    date.map((operation) => {
                        const start = bubbles[operation.startBubbleId];
                        return ( <Arrow end={selectedFrame} start={start} /> );
                    })
                    :
                    <></>
                }
                {
                    (detail !== null) && (selectedFrame !== null)
                    ?
                    detail.map((operation) => {
                        const start = bubbles[operation.startBubbleId];
                        return ( <Arrow end={selectedFrame} start={start} /> );
                    })
                    :
                    <></>
                }
                {
                    //render user current drag action
                    (startBubble == null)
                        ?
                        <></>
                        :
                        <>
                            <circle cx={startBubble.x + startBubble.width} cy={startBubble.y + startBubble.height / 2} r="4" fill="black" />
                            <path
                                d={`M ${startBubble.x + startBubble.width} ${startBubble.y + startBubble.height / 2} L ${mouseX - offsetX} ${mouseY - offsetY}`}
                                strokeWidth="4"
                                stroke="black"
                                markerEnd='url(#arrowhead)'
                            />
                        </>
                }
            </SVG>
            {
                (startBubble != null)
                    ?
                    //<Bubble item={{...startBubble, x: mouseX - offsetX, y: mouseY - offsetY}} />
                    <Box
                        style={{
                            top: mouseY - offsetY,
                            left: mouseX - offsetX,
                            zIndex: -1,
                        }}
                    >{startBubble.str}</Box>
                    :
                    <></>
            }
        </>
    )
}

const SVG = styled.svg`
    background-color : transparent;
    width : 100%;
    height : 100%;
`

const Box = styled.div`
    border : 1px solid black;
    background-color: rgba(20,200,150,0.3);
    position: absolute;
`

export default Overlay;