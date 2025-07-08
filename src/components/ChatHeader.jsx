import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ChatHeader({menuOpen,setMenuOpen}) {

  const navigate = useNavigate();

    function toggleMenu(e){
        setMenuOpen(!menuOpen);
        e.stopPropagation();
    }

  

  return (
    <>
    <Header>
      <BackButton onClick={()=>navigate("/chats")}>←</BackButton>
      <Title>채팅방</Title>
      <Hamburger onClick={(e)=>toggleMenu(e)}>☰</Hamburger>
    </Header>
    </>
  );
}

const Header = styled.div`
  height: 50px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-right: 10px;
  color:black;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  color:black;
`;

const Hamburger = styled.div`
  font-weight: bold;
  font-size: 22px;
  color:black;
  margin-left:auto;
  margin-right:5px;
`;


export default ChatHeader;