import { useState } from 'react';

import styled from 'styled-components';

import useStore from "../../../store/Store";

const StandardDate = () => {
    const { setStartDate } = useStore((state) => state);

    const [ date, setDate ] = useState('2024-09-01');

    return (
        <Container>
            <Input value={date} onChange={(event) => setDate(event.target.value)} type="date"></Input>
            <Btn onClick={() => { setStartDate(date) }}>설정</Btn>
        </Container>
    );
}

const Container = styled.div`
`

const Input = styled.input`
`

const Btn = styled.button`
    border: 1px solid black;
`

export default StandardDate;