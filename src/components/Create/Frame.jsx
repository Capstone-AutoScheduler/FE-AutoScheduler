import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../../store/Store'

const Frame = ({ item }) => {
    const { selectedFrameId, selected, setSelectedFrameId, removeFrame, addToTitle, addToDate, addToDetail } = useStore(state => state)

    const ContainerRef = useRef(null);

    const bgColor = 'rgba(235, 186, 7, 0.3)';
    const selectedBorder = '3px solid red';
    const defaultBorder = '2px solid rgba(235, 186, 7, 0.7)';

    useEffect(() => {
        ContainerRef.current.style.top = 100 + 'px';
        ContainerRef.current.style.left = 1000 + 'px';
    }, []);

    const handleMouseUp = (endRow) => () => {
        if ( selected.area != null ) {
            const operation = {
                type: "drag",
                area: selected.area,
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

    const deleteFrame = () => {
        console.log('delete frame');
        removeFrame(item);
    }

    return (
        <Container 
            ref={ContainerRef}
            style={{ 
                backgroundColor: bgColor ,
                border: defaultBorder,
            }}
        >
            <Row 
                onMouseUp={handleMouseUp('title')}
                style={{ height: "10%" }}
            >
                <Section>Title</Section>
                <Content>
                    {item.title.map((operation) => {
                        return (<Inner frame={item} type={'title'} operation={operation} />);
                    })}
                </Content>
            </Row>
            <Row 
                onMouseUp={handleMouseUp('date')}
                style={{ height: "10%" }}
            >
                <Section>Date</Section>
                <Content>
                    {item.date.map((operation) => {
                        return (<Inner frame={item} type={'date'} operation={operation} />);
                    })}
                </Content>
            </Row>
            <Row
                onMouseUp={handleMouseUp('detail')}
                style={{ height: "80%" }}
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

    width: 400px;
    height: 300px;
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
    display: flex;
    align-items: flex-start;
`

const Inner = ({frame, type, operation}) => {
    const { bubbles, removeFromTitle, removeFromDate, removeFromDetail, selected, setSelectedOperation } = useStore(state => state)

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

    const getContentOfArea = (area) => {
        const start = area.start;
        const end = area.end;
        const items = [];
        bubbles.forEach((bubble) => {
            if ((start.x < bubble.x) && (bubble.x < end.x) && (start.y < bubble.y) && ( bubble.y < end.y)) {
                items.push(bubble.str);
            }
        })
        return items;
    }
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(getContentOfArea(operation.area));
    }, [])

    return (
        <InnerContainer
            onClick={handleClick}
            style={{border: (selected.operation === operation) ? selectedBorder : defaultBorder}}
        >
            {
                (items.length === 0) ?
                '...'
                :
                items.map((text) => {
                    return (<ItemBox>{text}</ItemBox>);
                })
            }
            { (selected.operation === operation) ? <Menu onClick={deleteOperatoin}>X</Menu> : <></> }
        </InnerContainer>
    );
}

const InnerContainer = styled.div`
    display : flex;
    border : 1px solid black;
    position : relative;
    background-color : white;
    min-width: 30px;
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

const ItemBox = styled.div`
    border : 1px solid black;
    margin : 1px;
    min-width: 20px;
`
export default Frame;