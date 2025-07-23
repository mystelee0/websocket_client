import { useEffect, useRef, useState } from 'react'
import './App.css'

import styled from 'styled-components';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Friends from './components/Friends';
import MainLayout from './components/MainLayout';
import ChatRooms from './components/ChatRooms';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import { useCheckUser } from './useSetUser';
import { useWebsocket } from './useWebsocket';
import Home from './components/Home';
import AuthProvider from './components/auth/AuthProvider';
import ChatRoom from './components/chatting/ChatRoom';

function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [client, setClient] = useState();

  useWebsocket(setClient);

  return (
    <>
      <StyledContainer onClick={() => setMenuOpen(false)}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />

            {/** 유저 로그인여부 체크*/ }
            <Route element={<AuthProvider />}>
              {/** 헤더,푸터 삽입 레이아웃 */}
              <Route element={<MainLayout />}>
                {/** 친구목록 화면 */}
                <Route path='/users' element={<Friends />} />
                {/** 채팅방 목록 화면 */}
                <Route path='/chats' element={<ChatRooms />} />
              </Route>

              {/** 채팅방 들어갔을때 화면 */}
              <Route path='/chats/:id' element={<ChatRoom/>} />
            </Route>

            {/** 로그인 및 회원가입 화면 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

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

export default App
