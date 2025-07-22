import { useEffect, useRef, useState } from 'react'
import './App.css'


import ChatHeader from './components/chatting/ChatHeader';
import ChatMessages from './components/chatting/ChatMessages';
import ChatInput from './components/chatting/ChatInput';
import SideMenu from './components/SideMenu';

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

function App() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  
  let [client] = useWebsocket();

  return (
    <>
      <StyledContainer onClick={() => setMenuOpen(false)}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route element={<MainLayout/>}>
              <Route path='/users' element={<Friends />} />
              <Route path='/chats' element={<ChatRooms />} />
            </Route>

            <Route path='/chats/:id' element={
              <>
                <ChatHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <BodyArea>
                  <ChatMessages />
                  <SideMenu menuOpen={menuOpen} />
                </BodyArea>
                <ChatInput client={client} />
              </>
            } />

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
const BodyArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;
export default App
