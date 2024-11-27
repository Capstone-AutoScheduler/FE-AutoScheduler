import styled from "styled-components";

import useStore from "../../store/Store";

const ToolBox = () => {
    const { frames, bubbles } = useStore((state) => state);

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
            <button onClick={printFrames}>Print frames</button>
            <button onClick={saveMachine}>Save</button>
        </Container>
    );
};

const Container = styled.div`
    border: 1px solid black;
`

export default ToolBox;