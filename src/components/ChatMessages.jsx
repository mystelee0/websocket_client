import styled from "styled-components";
import testMessages from "../data/testMessage"; //테스트 후 삭제
import { useSelector } from "react-redux"
function ChatMessages() {

    let messages = useSelector((state) => state.chat.find(ob => ob.roomId === parseInt(101)))
    let userInfo = useSelector((state) => state.userInfo);

    function renderSwitch(msg,index) {
        //스위치 시스템추가
        switch (msg.messageType) {
            case 1:
                return msg.sender.mobNum === userInfo.mobNum ? 
                        <MyMessage key={index}>{msg.message}</MyMessage>
                     : 
                     <>
                     <div style={{textAlign:"left", color:"black"}}>{msg.sender.nickName}</div>
                     <OtherMessage key={index}>{msg.message}</OtherMessage>
                     </>
                        
            case 2:
                return <SystemMessage key={index}>{`System : ${msg.message}`}</SystemMessage>;
        }
    }
    return (
        <MessageContainer>
            {
                messages.msg.map((msg, index) =>
                    renderSwitch(msg,index)
                )}
        </MessageContainer>
    );
}

const MessageContainer = styled.div`
flex: 1;
padding: 10px;
overflow-y: auto;
background-color: #e5ddd5;
display: flex;
flex-direction: column;
gap: 5px;
`;

const MyMessage = styled.div`
align-self: flex-end;
background-color: #dcf8c6;
padding: 8px 12px;
border-radius: 12px;
max-width: 45%;
word-break: break-word;
color:black;
`;

const OtherMessage = styled.div`
align-self: flex-start;
background-color: white;
padding: 8px 12px;
border-radius: 12px;
max-width: 45%;
word-break: break-word;
color:black;
`;

const SystemMessage = styled.div`
  align-self: center;
  font-size: 12px;
  color: #777;
  margin: 8px 0;
  white-space: pre-wrap;
`;
export default ChatMessages;