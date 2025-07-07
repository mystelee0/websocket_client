import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Client } from '@stomp/stompjs';

import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import SideMenu from './components/SideMenu';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { add } from './redux/chatSlice'
import { setUserId } from './redux/userIdSlice';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Friends from './components/Friends';
import MainLayout from './components/MainLayout';
import ChatRooms from './components/ChatRooms';

function App() {


  let [client, setClient] = useState();
  let dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  //메세지 수신
  const messageCallback = function (message) {
    console.log("메세지 콜백 실행");
    // called when the client receives a STOMP message from the server
    if (message.body) {
      console.log("받은메시지", message);
      dispatch(add(message.body));
    } else {
      alert("error");
    }
  }
  let subscribeId;
  //웹소켓 연결
  useEffect(() => {
    let userIdCopy = window.prompt("닉네임을 입력하세요");
    dispatch(setUserId(userIdCopy));

    const client = new Client({
      brokerURL: `ws://192.168.106.80:8080/websocket-server?userId=${userIdCopy}`,
      onConnect: () => {
        subscribeId = client.subscribe(`/user/${userIdCopy}/queue/message`, messageCallback);
        client.subscribe(`/topic/101`, messageCallback);
        console.log(subscribeId);
      },
      // 디버그 로그 출력
      debug: function (str) {
        console.log(str);
      },
    });
    //state에 저장
    setClient(client);

    client.activate();
  }, []);


  return (
    <>
      <StyledContainer onClick={() => setMenuOpen(false)}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout/>}>
              <Route path='/' element={<Friends />} />
              <Route path='/chats' element={<ChatRooms/>} />
            </Route>
            
            <Route path='/chats/101' element={
              <>
                <ChatHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <BodyArea>
                  <ChatMessages />
                  <SideMenu menuOpen={menuOpen} />
                </BodyArea>
                <ChatInput client={client} />
              </>
            } />
          </Routes>

        </BrowserRouter>

      </StyledContainer>
    </>
  )
}

const StyledContainer = styled.div`
  position: relative;
  overflow:hidden;
  display: flex;
  flex-direction: column;
  min-height:90vh;
  max-height:95vh;
  width:480px;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
  font-family: 'Arial', sans-serif;
  background:#fff;
`;
const BodyArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;
export default App
