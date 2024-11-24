import styled from "styled-components";

import useStore from "../../store/Store";

const ToolBox = () => {
    const { appendFrame, frames, bubbles } = useStore((state) => state);

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

    const printFrames = () => {
        const stringData = JSON.stringify(frames);
        console.log(stringData);
        console.log(JSON.parse(stringData));
    }

    const saveMachine = () => {
        localStorage.setItem('frames', JSON.stringify(frames));
        var Mapping = [];
        bubbles.forEach((bubble) => {
            if (bubble.mapping) {
                Mapping.push({
                    bubbleId: bubble.id,
                    string: bubble.str,
                    x: bubble.x,
                    y: bubble.y,
                });
            }
        });
        localStorage.setItem('mapping', JSON.stringify(Mapping));
    }

    return (
        <Container>
            <button onClick={addFrame}>Add new frame</button>
            <button onClick={printFrames}>Print frames</button>
            <button onClick={saveMachine}>Save</button>
        </Container>
    );
};

const Container = styled.div`
    border: 1px solid black;
`

export default ToolBox;