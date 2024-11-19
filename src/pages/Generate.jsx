import styled from 'styled-components';

import ReadPDF from '../components/Generate/ReadPDF';
import Result from '../components/Generate/Result';

const Generate = () => {
    return (
        <Container>
            <ReadPDF />
            <Result />
        </Container>
    );
}

const Container = styled.div`
`

export default Generate;