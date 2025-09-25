import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import AddPanel from "../common/AddPanel";
import { useState } from "react";

function ChatRoom({ client }) {

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isPanelClosing, setIsPanelClosing] = useState(false);

  function handlePlus() {
    setIsPanelVisible(true);
    setIsPanelClosing(false);
  }

  function handlePanelClose(finalClose) {
    if (finalClose) {
      // 완전히 닫을 때
      setIsPanelVisible(false);
    } else {
      // 닫기 애니메이션 시작
      setIsPanelClosing(true);
    }
  }

  return (
    <>
      <ChatHeader handlePlus={handlePlus}/>
      {isPanelVisible && <AddPanel onClose={handlePanelClose} isClosing={isPanelClosing} />}
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