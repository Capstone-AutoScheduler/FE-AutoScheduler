import styled from "styled-components";
import React, { useState, useCallback, useEffect } from "react"; // useState, useCallback 추가
import axios from "axios";
import Card from '../components/GeneratorStore/Card'

const GeneratorStore = () => {
    const [list, setList] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [typeColor, setTypeColor] = useState("#4caf50");

    const [name, setName] = useState(localStorage.getItem('name'));
    const [update, setUpdate] = useState(true);

    async function getAllGeneratorList() {
        try {
            const response = await axios.get(
                `http://3.35.252.162:8080/generator/list/${localStorage.getItem('memberId')}`,
                {
                    timeout: 3000,
                }
            );
            console.log(response.data.result.generators);
            setList(response.data.result.generators);
        } catch (error) {
            console.error("Failed to get generator list", error);
        }
    }

    useEffect(() => {
        getAllGeneratorList();
    }, [update]);

    return (
        <Container>
            <GenerateContainer>
                {list.map((item, index) => {
                    return ((name===item.memberName)?<></>:<Card key={index} item={item} update={update} setUpdate={setUpdate}/>)
                })}
            </GenerateContainer>
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
  height: 90vh;
`;

const GenerateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-template-rows: repeat(3, 150px);
  row-gap: 40px; /* 세로 간격 */
  column-gap: 80px; /* 가로 간격 */
  background-color: #ffffff;

  padding-top: 40px;
  padding-bottom: 60px;
  padding-left: 49px;

  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px var(--Gray-800, #dedede);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default GeneratorStore;
