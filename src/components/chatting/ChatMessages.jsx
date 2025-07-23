import styled from "styled-components";
import { useSelector } from "react-redux"
import ShowProfileImage from "../ShowProfileImage";
import MessageTime from "./MessageTime";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

function ChatMessages() {

    const params = useParams()

    let messages = useSelector((state) => state.chat.find(ob => ob.roomId === parseInt(params.id)))
    let userInfo = useSelector((state) => state.userInfo);
    console.log("지금 채팅메시지 유저 명", userInfo.mobNum);

    let prev, next;
    
    const containerRef = useRef();
    
    useEffect(()=>{
        //맨 밑으로 자동 스크롤
        containerRef.current.scrollTo({top:containerRef.current.scrollHeight, behavior:"smooth"});
    },[messages])

    // 조건에 따른 메시지 출력 함수
    function renderSwitch(msg, index, prev, next) {
        let nextDate = new Date(next?.date);
        let msgDate = new Date(msg?.date);
        let prevDate = new Date(prev?.date);

        let nextHm = nextDate.getHours()+""+nextDate.getMinutes();
        let msgHm = msgDate.getHours()+""+msgDate.getMinutes();
        let prevHm = prevDate.getHours()+""+prevDate.getMinutes();

        // 시간 표시여부 default : true
        let timeRender = true;

        // 현 채팅과 다음 채팅의 유저정보와 시간이 같을경우
        if (next?.sender.mobNum === msg?.sender.mobNum && nextHm === msgHm) { //옵셔널 체이닝 적용해봄
            //시간컴포넌트 미표시
            timeRender = false;
        }

        // 1. 사용자 메시지
        if (msg.messageType === 1)

            // 1.1 본인 메시지 (콜백으로 받은 메시지가 자기자신이 보낸 경우)
            if (msg.sender.mobNum === userInfo.mobNum)
                return (
                    <RightContainer key={index}>
                        {timeRender?<MessageTime time={msg.date} />:null}
                        <MyMessage >{msg.message}</MyMessage>
                    </RightContainer>
                )
            // 1.2 상대방 메시지 시작 (이전 메시지가 있는데, 보낸 사람이 다른 경우 || 같은 사용자지만 시간이 다른경우)
            else if ( (prev && prev.sender.mobNum !== msg.sender.mobNum) || prevHm!==msgHm)
                // 프로필 이미지, 닉네임, 메시지 같이 출력
                return (
                    <LeftContainer key={index}>
                        <ShowProfileImage type={1} contents={msg.sender} />
                        <OtherInfoContainer>
                            <div style={{ textAlign: "left", color: "black" }}>{msg.sender.nickName}</div>
                            <OtherMessage key={index}>{msg.message}</OtherMessage>
                        </OtherInfoContainer>
                        {timeRender?<MessageTime time={msg.date} />:null}
                    </LeftContainer>
                )
            // 1.3 상대방 메시지 이어짐
            else
                // 메시지만 출력 
                return (
                    <LeftContainer key={index}>
                        <div style={{ width: "48px", height: "40px", marginLeft: "12px" }}></div>
                        <OtherMessage key={index}>{msg.message}</OtherMessage>
                        {timeRender?<MessageTime time={msg.date} />:null}
                    </LeftContainer>
                )
        // 2. 시스템 메시지 
        if (msg.messageType === 2)
            return <SystemMessage key={index}>{`System : ${msg.message}`}</SystemMessage>;

    }
    return (
        <MessagesContainer ref={containerRef}>
            {
                messages !== undefined ?
                    messages.msgs.map((msg, index) => {
                        next = messages.msgs[index + 1];
                        const render = renderSwitch(msg, index, prev, next);
                        prev = msg;
                        return render;
                    })
                    : null
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

  overflow: auto;

  /* 스크롤바 숨기기 - 크롬, 사파리 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* IE, Edge */
  -ms-overflow-style: none;

  /* Firefox */
  scrollbar-width: none;
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