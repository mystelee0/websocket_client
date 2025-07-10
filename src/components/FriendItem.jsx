import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShowProfileImage from "./ShowProfileImage";

function FriendItem({ friend, type }) {
  const navigate = useNavigate();
  return (
    <FriendContainer onClick={()=>navigate(`/chats/${friend.id}`)}>
      <ShowProfileImage type={type} item={friend}/>
      <FriendInfo>
        <FriendName>{friend.name || friend.roomName}</FriendName>

          <StatusMessage>{friend.statusMessage}</StatusMessage>
        
      </FriendInfo>
    </FriendContainer>
  )
}

const FriendContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  margin-right: 12px;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FriendName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color:black;
  text-align:left;
`;

const StatusMessage = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
  text-align:left;
`;

const AvatarGroup = styled.div`
  width: 48px;
  height: 48px;
  background: #f0f0f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-right:12px;
`;

const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  border: 1px solid white;
`;
export default FriendItem;