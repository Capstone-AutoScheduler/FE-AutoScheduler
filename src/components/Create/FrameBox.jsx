import styled from 'styled-components';

import useStore from "../../store/Store";

import FrameCard from './FrameCard';

const FrameBox = () => {
    const { frames } = useStore((state) => state);
    
    return (
        <Container>
            {frames.map((frame) => {
                return <FrameCard key={frame.id} item={frame} />
            })}
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid black;
    height: 160px;
    margin: 0px 0px 4px 0px;

    display: flex;
    align-items: center;
    overflow-x: scroll;
`

export default FrameBox;