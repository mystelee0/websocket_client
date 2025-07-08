import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function FriendItem({ friend, type }) {
  const navigate = useNavigate();
  return (
    <FriendContainer onClick={()=>navigate(`/chats/${friend.id}`)}>
      {
        type !== "chat" || friend.count === 1 ? <ProfileImage src={friend.profileImage} alt={friend.name || friend.roomName} /> :
          <AvatarGroup>
            <AvatarImage
              src={"/profile.jpg"}
              style={{ bottom: "2px", left: "2px" }}
            />
            <AvatarImage
              src={"/profile.jpg"}
              style={{ bottom: "2px", right: "2px" }}
            />
            <AvatarImage
              src={"/profile.jpg"}
              style={{ top: "2px", left: "50%", transform: "translateX(-50%)" }}
            />
          </AvatarGroup>
      }
      <FriendInfo>
        <FriendName>{friend.name || friend.roomName}</FriendName>
        {friend.statusMessage && (
          <StatusMessage>{friend.statusMessage}</StatusMessage>
        )}
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