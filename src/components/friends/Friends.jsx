import styled from "styled-components";
import ListItem from "../common/ListItem";
import { useSelector } from "react-redux";

function Friends() {

    const userInfo = useSelector((state)=>state.userInfo);
    const friendInfo = useSelector((state)=>state.friendInfo);
    
    return (
        <ListContainer>
            <ListItem type={1} contents={userInfo}/>
            {friendInfo.map((friend) =>
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