import styled from "styled-components";
import React, { useState, useCallback, useEffect } from "react"; // useState, useCallback 추가
import axios from "axios";
const GeneratorStore = () => {
  const [list, setList] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [typeColor, setTypeColor] = useState("#4caf50");

  async function getAllGeneratorList() {
    try {
      const response = await axios.get(
        `http://3.35.252.162:8080/generator/list`,
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
  }, []);

  return (
    <div>
      <Container>
        <GenerateContainer>
          {list.map((item, index) => (
            <Generator>
              <Info>
                <Type>
                  <TypeContent>
                    <div
                      style={{
                        marginRight: "4px",
                        backgroundColor:
                          item.sourceType === "PDF" ? "#b30c00" : "#4caf50",
                        width: "15px",
                        height: "15px",
                        borderRadius: "15px",
                      }}
                    ></div>
                    <div
                      style={{
                        color:
                          item.sourceType === "PDF" ? "#b30c00" : "#4caf50",
                      }}
                    >
                      {item.sourceType}
                    </div>
                  </TypeContent>
                </Type>
                <Creator>
                  <CreateContent>
                    <div
                      style={{
                        marginRight: "4px",
                        backgroundColor: "#008bf0",
                        width: "15px",
                        height: "15px",
                        borderRadius: "15px",
                      }}
                    ></div>
                    <div>{item.memberName}</div>
                  </CreateContent>
                </Creator>
                <Icon></Icon>
              </Info>
              <Title>{item.generatorTitle}</Title>
              <Description>{item.generatorDetail}</Description>
            </Generator>
          ))}
        </GenerateContainer>
      </Container>
    </div>
  );
};

// styled component 동적 생성 가능한지,
// 안된다면 css를 리액트에서 적용하는 방법 알아내기

// css를 index.html의 head에 react-helmet라이브러리를 활용해 넣어주면 된다.
// 그러나 프로그래머스 사이트 테스트를 했을 때 상단메뉴에 css가 적용되지 않는다..
// -> 상단메뉴에대한 css 찾아보기
// 네이버는 head의 css파일만으로 css전부다 적용됨.

const Info = styled.div`
  display: flex;
`;

const Creator = styled.div`
  display: flex;
`;

const CreateContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  padding: 0px 4px;
  color: #008bf0;
  background-color: #ffffff;
  border-radius: 4px;
`;

const Type = styled.div`
  display: flex;
`;

const TypeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 4px;
  padding: 0px 4px;
  background-color: #ffffff;
  border-radius: 4px;
`;

const Title = styled.div`
  font-size: 19px;
  margin-bottom: 6px;
  padding-left: 6px;
  padding-top: 10px;
`;

const Description = styled.div`
  display: -webkit-box; /* 플렉스박스를 사용한 레이아웃 */
  -webkit-box-orient: vertical; /* 텍스트를 세로 방향으로 정렬 */
  -webkit-line-clamp: 4; /* 최대 줄 수를 3줄로 제한 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis;
  font-size: 13px;
  padding-left: 6px;
`;

const Icon = styled.div`
  padding: 20px;
`;

const Container = styled.div`
  padding: 20px;
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

const Generator = styled.div`
  width: 260px;
  height: 170px;
  background-color: rgba(255, 255, 100, 0.6);
  border: 2px solid rgba(255, 204, 0, 1);
  border-radius: 8px;
  padding: 8px;
  padding-top: 12px;
`;

export default GeneratorStore;
