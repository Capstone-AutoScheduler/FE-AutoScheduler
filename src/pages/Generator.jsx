import styled from "styled-components";

import Content from '../components/Generator/Content';

const Generator = () => {
    return (
        <Container>
            <Content></Content>
        </Container>
    );
}

const Container = styled.div`
    display : flex;
    height: 90vh;
`

export default Generator;