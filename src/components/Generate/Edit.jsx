import styled from 'styled-components';

import Palette from './Palette';

const Edit = () => {
    return (
        <Container>
            <Box>
                <BoxUpper>
                    <Title></Title>
                    <input type="date" />
                </BoxUpper>
                <Content></Content>
            </Box>
            <Down>
                <Palette></Palette>
                <button>적용</button>
                <button>일괄 적용</button>
            </Down>
        </Container>
    );
}

const Container = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px var(--Gray-800, #DEDEDE);
`

const Box = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
`

const BoxUpper = styled.div`
    display: flex;
`

const Title = styled.input`
    flex-grow: 1;
`

const Content = styled.textarea`
    height: 200px;
    resize: none;
    box-sizing: border-box;
`

const Down = styled.div`
    justify-content: space-between;
    display: flex;
`
export default Edit;