import { useEffect, useRef } from "react"
import styled from "styled-components"

import useStore from '../../store/Store'

const Frame = ({ item }) => {
    const { selectedFrame, selected, setSelectedFrame, removeFrame, addToTitle, addToDate, addToDetail } = useStore(state => state)

    const ContainerRef = useRef(null);

    const bgColor = 'rgba(235, 186, 7, 0.3)';
    const selectedBorder = '3px solid red';
    const defaultBorder = '2px solid rgba(235, 186, 7, 0.7)';

    useEffect(() => {
        ContainerRef.current.style.width = 320 + 'px';
        ContainerRef.current.style.height = 140 + 'px';
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
    const handleClick = () => {
        setSelectedFrame(item);
    }

    const deleteFrame = () => {
        console.log('delete frame');
        removeFrame(item);
    }

    return (
        <Container 
            onClick={handleClick}
            ref={ContainerRef}
            style={{ 
                backgroundColor: bgColor ,
                border: (selectedFrame === item) ? selectedBorder : defaultBorder,
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
            {
                (selectedFrame === item)
                ?
                <Menu
                    onMouseDown={(event) => { event.stopPropagation(); }}
                    onMouseUp={(event) => { event.stopPropagation(); }}
                    onClick={deleteFrame}>
                    X
                </Menu>
                :
                <></>
            }
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
    const { removeFromTitle, removeFromDate, removeFromDetail, selected, setSelectedOperation } = useStore(state => state)

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
            {JSON.stringify(operation)}
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