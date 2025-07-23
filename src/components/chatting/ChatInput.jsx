import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function ChatInput({client}) {

  let [input,setInput] = useState("");
  let userInfo = useSelector((state)=>state.userInfo);
  
  const inputRef = useRef();

  let date = new Date();

  const sendMessage = ()=>{
    if (input === '') {
            alert('입력해주세요');
            return;
        }
        else {
            //메시지 형식
            let body = {
                'messageType':1, //1=토픽(broadcast) 2=유저(queue) 시스템
                'roomId': 101,
                'sender': userInfo,
                'message': input,
                'date': date
            }
            //메시지 보내기

            client.publish({
                destination: "/topic/101",
                body: JSON.stringify(body),
            })
            setInput('');
            inputRef.current.value="";
            inputRef.current.focus();
        }
    }
  return (
    <InputContainer>
      <Input
        ref={inputRef}
        type="text"
        placeholder="메시지를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e)=>{
            if(e.key==="Enter") sendMessage()
        }}
      />
      <SendButton onClick={sendMessage}>전송</SendButton>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 8px;
  background-color: #128c7e;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
`;

export default ChatInput;