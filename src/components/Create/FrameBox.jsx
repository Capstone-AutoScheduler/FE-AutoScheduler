import styled from 'styled-components';

import useStore from "../../store/Store";

import FrameCard from './FrameCard';

const FrameBox = () => {
    const { appendFrame, frames } = useStore((state) => state);
    
    const addFrame = () => {
        if (frames.length !== 0) {
            const lastFrame = frames[frames.length - 1];
            appendFrame({
                id: lastFrame.id + 1,
                str: 'target',
                x: 1000,
                y: lastFrame.y + lastFrame.height + 20,
                width: 320,
                height: 140,
                title: [],
                date: [],
                detail: [],
            });
        } else {
            appendFrame({
                id: 0,
                str: 'target',
                x: 1000,
                y: 40,
                width: 320,
                height: 140,
                title: [],
                date: [],
                detail: [],
            });
        }
    }

    return (
        <Container>
            {frames.map((frame, index) => {
                return <FrameCard key={index} item={frame} />
            })}
            <AddButton onClick={addFrame}> + </AddButton>
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid black;
    height: 160px;
    margin: 0px 0px 4px 0px;

    display: flex;
    align-items: center;
    overflow-x: scroll;
    gap: 8px;

`

const AddButton = styled.button`
    width: 180px;
    height: 120px;
    border-radius: 15px;
    flex-shrink: 0;
`

export default FrameBox;