import styled from "styled-components"

import useStore from '../../store/Store'

const FrameCard = ({ item }) => {
    const { selectedFrameId, setSelectedFrameId, removeFrame, } = useStore(state => state)

    const bgColor = 'rgba(235, 186, 7, 0.3)';
    const selectedBorder = '3px solid red';
    const defaultBorder = '2px solid rgba(235, 186, 7, 0.7)';

    const handleClick = () => {
        setSelectedFrameId(item.id);
    }

    const deleteFrame = () => {
        console.log('delete frame');
        removeFrame(item);
    }

    return (
        <Container 
            onClick={handleClick}
            style={{ 
                backgroundColor: bgColor ,
                border: (selectedFrameId === item.id) ? selectedBorder : defaultBorder,
            }}
        >
            <Row>
                <Section>Title</Section>
                <Content>
                    {item.title.map((operation) => {
                        return (<Inner frame={item} type={'title'} operation={operation} />);
                    })}
                </Content>
            </Row>
            <Row>
                <Section>Date</Section>
                <Content>
                    {item.date.map((operation) => {
                        return (<Inner frame={item} type={'date'} operation={operation} />);
                    })}
                </Content>
            </Row>
            <Row
                style={{height: '100%'}}
            >
                <Content>
                    {item.detail.map((operation) => {
                        return (<Inner frame={item} type={'detail'} operation={operation} />);
                    })}
                </Content>
            </Row>
            {
                (selectedFrameId === item.id)
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
    user-select: none;
    font-size: 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 2px solid rgba(235, 186, 7, 0.7);

    width: 180px;
    height: 120px;

    flex-shrink: 0;
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
    width: 24%;
`

const Content = styled.div`
    width: 70%;
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

    var content = JSON.stringify(operation);
    if (content.length > 25){
        content = content.slice(0, 25) + '...';
    }
    return (
        <InnerContainer
            onClick={handleClick}
            style={{border: (selected.operation === operation) ? selectedBorder : defaultBorder}}
        >
            { content }
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

export default FrameCard;