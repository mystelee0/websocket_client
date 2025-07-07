import chatRooms from "../data/chatRooms";
import FriendItem from "./FriendItem";

function ChatRooms(){

    return(
        chatRooms.map((roomInfo)=>{
            <FriendItem key={chatRooms.id} type="chat" friend={roomInfo}></FriendItem>
        })
    );
}

export default ChatRooms;