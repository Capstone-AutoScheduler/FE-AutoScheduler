import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom';

import LogoPNG from '../static/Logo.png'

const Navbar = ()=> {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedColor = "#008BF0";
    const selectedBorder = "8px solid #008BF0";
    localStorage.setItem('memberId', 1);

    console.log(location.pathname);

    return (
        <Container>
            <Logo onClick={() => navigate('/')}>
                <IMG src={LogoPNG}></IMG>
                <div>AutoScheduler</div>
            </Logo>
            <Menu>
                <Taps>
                    <Tap 
                        style={(['/'].includes(location.pathname)) ? { color: selectedColor, borderBottom: selectedBorder } : {}}
                        onClick={() => {navigate('/')}}
                    >
                        캘린더
                    </Tap>
                    <Tap
                        style={(['/generator'].includes(location.pathname)) ? { color: selectedColor, borderBottom: selectedBorder } : {}}
                        onClick={() => {navigate('/generator')}}
                    >
                        내 생성기
                    </Tap>
                    <Tap
                        style={(['/store'].includes(location.pathname)) ? { color: selectedColor, borderBottom: selectedBorder } : {}}
                        onClick={() => {navigate('/store')}}
                    >
                        생성기 가져오기
                    </Tap>
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
    height: 100%;
`

const Tap = styled.div`
    display:flex;
    align-items: center;
    font-weight: bold;
    margin: 0px 20px;
    cursor: pointer;
    border: 8px solid #FFFFFF;

    &:hover {
        transition: 0.3s ease, color 0.3s ease;
        color: #008BF0;
        border-bottom: 8px solid #008BF0;
    }
`

const Login = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 28px;
    cursor: pointer;
`

export default Navbar