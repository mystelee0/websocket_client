import styled from "styled-components";
import friends from "../data/friendsData"; //테스트데이터
import ListItem from "./ListItem";
import { useSelector } from "react-redux";
import { useCheckUser } from "../useSetUser";

function Friends() {

    const userInfo = useSelector((state)=>state.userInfo);
    console.log("친구목록 유저인포",userInfo);
    
    return (
        <ListContainer>
            <ListItem type={1} contents={{ name: userInfo.nickName, statusMessage: "안녕!" ,profileImage:"/profile.jpg"}}/>
            {friends.map((friend) =>
                <ListItem type={1} key={friend.mobNum} contents={friend} />
            )}
        </ListContainer>

    )
}

const ListContainer = styled.div`
    flex:1;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #ddd;
  overflow: hidden;
`;

export default Friends;