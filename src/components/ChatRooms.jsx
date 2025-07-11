import styled from "styled-components";
import chatRoomsItem from "../data/chatRooms";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";

function ChatRooms() {

    
    return ( 
        <ChatRoomsWrapper>
            {
                chatRoomsItem.map((roomInfo) =>
                    <ListItem type={roomInfo.count} key={roomInfo.id} contents={roomInfo}/> 
                )
            }
        </ChatRoomsWrapper>
    );
}

const ChatRoomsWrapper = styled.div`
    flex:1;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #ddd;
  overflow: hidden;
`;

export default ChatRooms;