import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import LogoSVG from '../static/Logo.svg'
import LogoPNG from '../static/Logo.png'

const Navbar = ()=> {
    const navigate = useNavigate();

    localStorage.setItem('memberId', 1);

    return (
        <Container>
            <Logo onClick={() => navigate('/')}>
                <IMG src={LogoPNG}></IMG>
                <div>AutoScheduler</div>
            </Logo>
            <Menu>
                <Taps>
                    <Tap onClick={() => {navigate('/')}}>캘린더</Tap>
                    <Tap onClick={() => {navigate('/generator')}}>내 생성기</Tap>
                    <Tap onClick={() => {navigate('/store')}}>생성기 가져오기</Tap>
                </Taps>
                <Login>로그인</Login>
            </Menu>
        </Container>
    )
};

const Container = styled.div`
    height: 10vh;
    background-color: #FFFFFF;
    color: #868686;

    display: flex;
`

const Logo = styled.div`
    width: 250px;
    background-color: #008BF0;
    color: #FFFFFF;
    font-size: 26px;
    font-weight: bold;
    border-bottom: 1px solid #CCD8E0;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`

const IMG = styled.img`
    width: 20px;
    height: 20px;

    margin-right: 8px;
`

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
`

const Taps = styled.div`
    display: flex;
`

const Tap = styled.div`
    font-weight: bold;
    margin: 20px;

    cursor: pointer;
`

const Login = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 28px;
    cursor: pointer;
`

export default Navbar