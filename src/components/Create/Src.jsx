import { useState } from 'react';
import styled from 'styled-components';

import InputPDF from "./InputPDF";
import InputWeb from "./Web/InputWeb";

const Src = () => {
    const [type, setType] = useState(null);
    const handleChange = (event) => {
        setType(event.target.value);
      }; 
    return (
        <Container>
            <Title>원본 파일</Title>
            <Radio>
                <label>
                    <input
                    type="radio"
                    value="pdf"
                    checked={type === 'pdf'}
                    onChange={handleChange}
                    />
                    PDF
                </label>
                <label>
                    <input
                    type="radio"
                    value="web"
                    checked={type === 'web'}
                    onChange={handleChange}
                    />
                    Web
                </label>
            </Radio>

            {(type === 'pdf' ? <InputPDF /> : <></>)}
            {(type === 'web' ? <InputWeb /> : <></>)}
        </Container>
    );
}

const Container = styled.div`
    width: 760px;
    height: 150px;
`

const Title = styled.div`
    margin: 0px 10px;
    font-size: 24px;
    font-weight: bold;
`

const Radio = styled.div`
    margin: 10px;
`

export default Src;