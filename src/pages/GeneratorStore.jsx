import styled from "styled-components";
import React, { useState, useCallback, useEffect } from "react"; // useState, useCallback 추가

const data = [
  {
    title: "중앙대학교 강의계획서",
    description: "강의계획서에 대한 생성기입니다.",
  },
  {
    title: "서울대학교 강의계획서",
    description: "강의계획서에 대한 생성기입니다.",
  },
  {
    title: "연세대학교 강의계획서",
    description: "강의계획서에 대한 생성기입니다.",
  },
  {
    title: "고려대학교 강의계획서",
    description: "강의계획서에 대한 생성기입니다.",
  },
  {
    title: "한양대학교 강의계획서",
    description: "강의계획서에 대한 생성기입니다.",
  },
  {
    title: "성균관대학교 강의계획서",
    description: "강의계획서에 대한 생성기입니다.",
  },
];

const GeneratorStore = () => {
  return (
    <div>
      <Name>생성기 Store</Name>
      <Container>
        {data.map((item, index) => (
          <Generator>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </Generator>
        ))}
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

const Name = styled.div`
  padding-left: 80px;
  padding-top: 80px;
  font-size: 30px;
`;

const Title = styled.div`
  font-size: 19px;
  margin-bottom: 6px;
`;

const Description = styled.div`
  font-size: 13px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 40px 80px;
  padding: 80px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Generator = styled.div`
  width: 200px;
  height: 120px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

export default GeneratorStore;
