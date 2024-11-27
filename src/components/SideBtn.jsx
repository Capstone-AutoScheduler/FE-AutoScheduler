import styled from 'styled-components'

import useSideStore from '../store/SideStore'

const SideBtn = () => {
    const { isOpen, toggleOpen } = useSideStore((state) => state);

    return (
        <Btn 
            onClick={toggleOpen} 
            style={{ left: (isOpen) ? '250px' : 0}}
        >
            {(isOpen) ? '<' : '>'}
        </Btn>
    );
}

const Btn = styled.button`
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 2px solid #FFFFFF;
    background-color: #008BF0;
    color: #FFFFFF;
    font-size: 24px;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
`

export default SideBtn;