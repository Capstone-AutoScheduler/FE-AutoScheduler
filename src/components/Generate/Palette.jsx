import styled from 'styled-components';

const Palette = () => {
    return (
        <Container>
            <Color color={'#000000'}></Color>
            <Color color={'#FFFFFF'}></Color>
            <Color color={'#FF8C00'}></Color>
            <Color color={'#008BF0'}></Color>
            <Color color={'#2B658E'}></Color>
            <Color color={'#123456'}></Color>
            <Color color={'#654321'}></Color>
        </Container>
    );
}

const Container = styled.div`
`

const Color = ({ color }) => {
    return (
        <Dye style={{backgroundColor: color}}></Dye>
    );
};

const Dye = styled.button`
    margin : 4px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
`

export default Palette;