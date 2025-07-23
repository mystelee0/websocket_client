import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatRoom({client}){

    return (
                <>
                  <ChatHeader/>
                  <BodyArea>
                    <ChatMessages />
                  </BodyArea>
                  <ChatInput client={client} />
                </>
    )
}

const BodyArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

export default ChatRoom;