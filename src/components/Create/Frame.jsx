import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../../store/Store'

const Frame = ({ item }) => {
    const { startBubble, selected, setSelectedFrame, addToTitle, addToDate, addToDetail } = useStore(state => state)

    const ContainerRef = useRef(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const bgColor = 'rgba(235, 186, 7, 0.3)';
    const selectedBorder = '3px solid red';
    const defaultBorder = '2px solid rgba(235, 186, 7, 0.7)';

    useEffect(() => {
        //console.log(item);
        setX(item.x);
        setY(item.y);
        ContainerRef.current.style.width = item.width + 'px';
        ContainerRef.current.style.height = item.height + 'px';
        ContainerRef.current.style.top = y + 'px';
        ContainerRef.current.style.left = x + 'px';
    }, [x, y, item]);

    const handleMouseUp = (endRow) => () => {
        if ( startBubble != null ) {
            const operation = {
                type: "drag",
                startBubbleId: startBubble.id,
                childOperations: []
            }
            if (endRow === 'title') {
                addToTitle(item.id, operation);
            } else if ( endRow === 'date') {
                addToDate(item.id, operation);
            } else {
                addToDetail(item.id, operation)
            }
        }
    }
    const handleClick = () => {
        setSelectedFrame(item);
    }

    return (
        <Container 
            onClick={handleClick}
            ref={ContainerRef}
            style={{ 
                backgroundColor: bgColor ,
                border: (selected.frame === item) ? selectedBorder : defaultBorder,
            }}
        >
            <Row onMouseUp={handleMouseUp('title')}>
                <Section>Title</Section>
                <Content>
                    {item.title.map((operation) => {
                        return (<Inner frame={item} type={'title'} operation={operation} />);
                    })}
                </Content>
            </Row>
            <Row onMouseUp={handleMouseUp('date')}>
                <Section>Date</Section>
                <Content>
                    {item.date.map((operation) => {
                        return (<Inner frame={item} type={'date'} operation={operation} />);
                    })}
                </Content>
            </Row>
            <Row
                onMouseUp={handleMouseUp('detail')}
                style={{ height: "100%" }}
            >
                <Content>
                    {item.detail.map((operation) => {
                        return (<Inner frame={item} type={'detail'} operation={operation} />);
                    })}
                </Content>
            </Row>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    user-select: none;
    font-size: 12px;

    padding: 2px 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 2px solid rgba(235, 186, 7, 0.7);
`

const Row = styled.div`
    border: 2px solid rgba(235, 186, 7, 0.7);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const Section = styled.div`
    font-size: 16px;
    border-right: 2px solid rgba(235, 186, 7, 0.7);
    width: 18%;
`

const Content = styled.div`
    width: 80%;
`

const Inner = ({frame, type, operation}) => {
    const { bubbles, removeFromTitle, removeFromDate, removeFromDetail, selected, setSelectedOperation } = useStore(state => state)
    const bubble = bubbles[operation.startBubbleId];

    const defaultBorder = '1px solid black';
    const selectedBorder = '2px solid red';

    const handleClick = (event) => {
        event.stopPropagation();
        setSelectedOperation(operation, frame);
    }

    const deleteOperatoin = () => {
        if (type === 'title') {
            removeFromTitle(frame.id, operation);
        } else if (type === 'date') {
            removeFromDate(frame.id, operation);
        } else {
            removeFromDetail(frame.id, operation);
        }

    }

    return (
        <InnerContainer
            onClick={handleClick}
            style={{border: (selected.operation === operation) ? selectedBorder : defaultBorder}}
        >
            {bubble.str}
            {
                (selected.operation === operation) ? <Menu onClick={deleteOperatoin}>X</Menu> : <></>
            }
        </InnerContainer>
    );
}

const InnerContainer = styled.span`
    border : 1px solid black;
    position : relative;
    background-color : white;
`

const Menu = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background-color: red;
    top: -20px;
    right: -10px;
`

export default Frame;