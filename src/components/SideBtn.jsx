import styled from 'styled-components'

import useSideStore from '../store/SideStore'

import SVG0 from '../static/side0.png';
import SVG1 from '../static/side1.png';

const SideBtn = () => {
    const { isOpen, toggleOpen } = useSideStore((state) => state);

    return (
        <Btn 
            onClick={toggleOpen} 
            style={{ left: (isOpen) ? '250px' : 0}}
        >
            <IMG alt='side button' src={(isOpen) ?  SVG1 : SVG0}></IMG>
        </Btn>
    );
}

const Btn = styled.div`
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    color: #FFFFFF;
    font-size: 24px;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
`

const IMG = styled.img`
    width: 52px;
    height: 70px;
`

export default SideBtn;