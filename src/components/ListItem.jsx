import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShowProfileImage from "./ShowProfileImage";

function ListItem({ contents, type }) {
  const navigate = useNavigate();
  return (
    <ListContainer onClick={()=>navigate(`/chats/${contents.id}`)}>
      <ShowProfileImage type={type} contents={contents}/>
      <ListInfo>
        <ListTitle>{contents.name || contents.roomName}</ListTitle>

          <ListMessage>{contents.message}</ListMessage>
        
      </ListInfo>
    </ListContainer>
  )
}

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color:black;
  text-align:left;
`;

const ListMessage = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
  text-align:left;
`;

export default ListItem;