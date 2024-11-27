import styled from 'styled-components';

import Sidebar from '../components/Generate/Sidebar';
import ReadPDF from '../components/Generate/ReadPDF';
import Result from '../components/Generate/Result';
import Edit from '../components/Generate/Edit';
import Preview from '../components/Generate/Preview';

import useSideStore from '../store/SideStore';

const Generate = () => {
    const { isOpen, setIsOpen } = useSideStore((state) => state);

    return (
        <Container>
            {(isOpen) ? <Sidebar /> : <></>}
            <Content>
                <Top>
                    <ReadPDF />
                    <Result />
                </Top>
                <Bottom>
                    <Edit />
                    <Preview />
                </Bottom>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    display : flex;
    height: 90vh;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    overflow: hidden;
`

const Top = styled.div`
    background-color: #FFFFFF;
    margin: 10px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px var(--Gray-800, #DEDEDE);
`

const Bottom = styled.div`
    margin: 8px 0px 0px 0px;
    display : flex;
    align-items: flex-start;
    justify-content: space-around;
`

export default Generate;