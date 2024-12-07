import styled from 'styled-components';

import useGenerateStore from '../../store/GenerateStore';

const Palette = () => {
    return (
        <Container>
            <Color color={'#000000'}></Color>
            <Color color={'#44BB44'}></Color>
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
    const { setScheduleColor } = useGenerateStore(state=>state);

    return (
        <Dye 
            onClick={() => {setScheduleColor(color)}}    
            style={{backgroundColor: color}} />
    );
};

const Dye = styled.button`
    border: 1px solid black;
    margin: 4px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
`

export default Palette;