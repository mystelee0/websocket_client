import styled from "styled-components";
import { useSelector } from "react-redux"
import ShowProfileImage from "./ShowProfileImage";
import MessageTime from "./MessageTime";
import { useParams } from "react-router-dom";

function ChatMessages() {
    
    const params = useParams()
    
    let messages = useSelector((state) => state.chat.find(ob => ob.roomId === parseInt(params.id)))
    let userInfo = useSelector((state) => state.userInfo);

    let prev;

    function renderSwitch(msg, index, prev) {
    
        switch (msg.messageType) {
            // 1. 사용자 메시지
            case 1:
                return (
                    // 1.1 자기메시지 (콜백으로 받은 메시지가 자기자신이 보낸 경우)
                    msg.sender.mobNum === userInfo.mobNum ?       
                        <RightContainer className="rightcontainer">
                            <MessageTime time={msg.date} prevTime={prev.date}/>
                            <MyMessage key={index}>{msg.message}</MyMessage>
                        </RightContainer>
                        :
                        // 1.2 이전 메시지가 있는데, 보낸 사람이 같은 경우
                        prev !== null && prev.sender.mobNum === msg.sender.mobNum ?
                            //프로필 이미지와 닉네임 제외하고 렌더링
                            <LeftContainer>
                                <div style={{ width: "48px", height: "40px", marginLeft: "12px" }}></div>
                                <OtherMessage key={index}>{msg.message}</OtherMessage>
                                <MessageTime time={msg.date} prevTime={prev.date}/>
                            </LeftContainer>
                            :
                            // 1.3 프로필 이미지, 닉네임, 메시지 같이 렌더링
                            <LeftContainer>
                                <ShowProfileImage type={1} contents={msg.sender} />
                                <OtherInfoContainer>
                                    <div style={{ textAlign: "left", color: "black" }}>{msg.sender.nickName}</div>
                                    <OtherMessage key={index}>{msg.message}</OtherMessage>
                                    <MessageTime time={"202507111630"} prevTime={"202507111630"}/>
                                </OtherInfoContainer>
                                <MessageTime time={msg.date} prevTime={prev.date}/>
                            </LeftContainer>
                )
            // 2. 시스템 메시지
            case 2:
                return <SystemMessage key={index}>{`System : ${msg.message}`}</SystemMessage>;
        }
    }
    return (
        <MessagesContainer>
            {
                messages !== undefined ?
                    messages.msg.map((msg, index) => {
                    const render = renderSwitch(msg, index, prev);
                    prev = msg;
                    return render;
                })
                :null
            }
        </MessagesContainer>
    );
}

const MessagesContainer = styled.div`
flex: 1;
padding: 10px;
overflow-y: auto;
background-color: #e5ddd5;
display: flex;
flex-direction: column;
gap: 5px;
`;
const RightContainer = styled.div`
    display:flex;
    justify-content:flex-end; //수평정렬
    width:100%;
`;
const MyMessage = styled.div`
align-self: flex-end; //수직정렬
background-color: #dcf8c6;
padding: 8px 12px;
border-radius: 12px;
max-width: 45%;
word-break: break-word;
color:black;
text-align:left;
`;
const LeftContainer = styled.div`
    display:flex;
`;
const OtherInfoContainer = styled.div`
    display:flex;
    flex-direction: column;
`;
const OtherMessage = styled.div`
align-self: flex-start;
background-color: white;
padding: 8px 12px;
border-radius: 12px;
max-width: 100%;
word-break: break-word;
color:black;
text-align:left;
`;

const SystemMessage = styled.div`
  align-self: center;
  font-size: 12px;
  color: #777;
  margin: 8px 0;
  white-space: pre-wrap;
`;
export default ChatMessages;