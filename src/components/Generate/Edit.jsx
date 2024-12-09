import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useGenerateStore from '../../store/GenerateStore';

const Edit = () => {
    const { results, selectedResult, updateResultAtIndex } = useGenerateStore(state=>state);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [detail, setDetail] = useState('');
    
    useEffect(() => {
        if (selectedResult != null) {
            const selected = results[selectedResult];
            setTitle(selected.title);
            setDate(selected.date);
            setDetail(selected.detail);
        }
    }, [ selectedResult ]);

    const applyChange = () => {
        const newResult = {
            title: title,
            date: date,
            detail: detail,
        }
        updateResultAtIndex(selectedResult, newResult);
    };

    return (
        <Container>
            <Box>
                <BoxUpper>
                    <Title 
                        value={title}
                        onChange={(event) => {setTitle(event.target.value)}}
                    ></Title>
                    <input 
                        value={date} 
                        onChange={(event) => {setDate(event.target.value)}}
                        type="date" />
                </BoxUpper>
                <Content 
                    value={detail}
                    onChange={(event) => {setDetail(event.target.value)}}
                ></Content>
            </Box>
            <Down>
                <Btn onClick={applyChange}>적용하기</Btn>
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
    justify-content: center;
    display: flex;
`

const Btn = styled.button`
    border: 2px solid #008BF0;
    margin: 4px;
    padding: 2px 40px;
    border-radius: 10px;

    &:hover {
        background-color: #D0D0D0;
    }
`
export default Edit;