import styled from "styled-components";

function FriendItem({friend,type}){

    return(
        <FriendContainer>
            
      <ProfileImage src={friend.profileImage} alt={friend.name} />
      <FriendInfo>
        <FriendName>{friend.name}</FriendName>
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

export default FriendItem;