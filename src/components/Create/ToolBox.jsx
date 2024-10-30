import styled from "styled-components";

import useStore from "../../store/Store";

const ToolBox = () => {
    const { appendFrame } = useStore(
        (state) => state
      );

    return (
        <Container>
            <button>Add new frame</button>
        </Container>
    );
};

const Container = styled.div`
    border: 1px solid black;
`

export default ToolBox;