import axios from 'axios';
import styled from 'styled-components';

import BookmarkPNG from '../../static/bookmark.png'
import BookmarkFillPNG from '../../static/bookmark-fill.png'

const Card = ({item, update, setUpdate}) => {
    const handleBookmark = async () => {
       try {
            const response = await axios.post(
                `http://3.35.252.162:8080/bookmark/add/${localStorage.getItem('memberId')}/${item.generatorId}`,
            );
            console.log(response.data.result);
            alert('북마크하였습니다.');
            setUpdate(!update);
        } catch (error) {
            console.error("북마크 실패패", error);
        }
    }

    const handleUnBookmark = async () => {
        try {
             const response = await axios.delete(
                 `http://3.35.252.162:8080/bookmark/delete/${localStorage.getItem('memberId')}/${item.generatorId}`,
             );
             console.log(response.data.result);
             alert('북마크를 해제하였습니다.');
             setUpdate(!update);
         } catch (error) {
             console.error("북마크 해제 실패", error);
         }
     }

    return (
        <Container>
            <Info>
                <Type>
                    <TypeContent>
                        <div
                            style={{
                                marginRight: "4px",
                                backgroundColor: item.sourceType === "PDF" ? "#b30c00" : "#4caf50",
                                width: "15px",
                                height: "15px",
                                borderRadius: "15px",
                            }}
                        ></div>
                        <div style={{ color: item.sourceType === "PDF" ? "#b30c00" : "#4caf50", }}>
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
            </Info>
            <Title>{item.generatorTitle}</Title>
            <Description>{item.generatorDetail}</Description>

            <BookmarkBox>
                {
                    (item.bookmarked)
                    ?
                    <Icon 
                        src={BookmarkFillPNG}
                        onClick={handleUnBookmark}
                    />
                    :
                    <Icon 
                        src={BookmarkPNG}
                        onClick={handleBookmark}
                    />
                }
            </BookmarkBox>
        </Container>
    );
}

const Container = styled.div`
  width: 260px;
  height: 170px;
  background-color: rgba(255, 255, 100, 0.6);
  border: 2px solid rgba(255, 204, 0, 1);
  border-radius: 8px;
  padding: 8px;
  padding-top: 12px;
  position: relative;
`

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

const BookmarkBox = styled.div`
    position: absolute;
    top: 12px;
    right: 8px;
`

const Icon = styled.img`
  width: 24px;
  height: 24px;

  &:hover{
    width: 30px;
    height: 30px;
  }
`;

export default Card;