// components/AddPanel.jsx
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import FriendAddForm from "./FriendAddForm";

function AddPanel({ onClose, isClosing }) {
  const location = useLocation();

  // 닫는 애니메이션이 끝나고 나서 실제로 unmount 하도록
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose(true); // 실제로 완전히 닫히도록 신호
      }, 300); // 애니메이션 시간과 맞춰야 함

      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  return (
    <PanelWrapper className={isClosing ? "slideOut" : "slideIn"}>
      <CloseBtn onClick={() => onClose(false)}>X</CloseBtn>
      {location.pathname === "/users" && 
      <>
      <div>👥 친구 추가 폼</div>
      <FriendAddForm/>
      </>}
      {location.pathname === "/chats" && <div>💬 채팅방 생성 폼</div>}
    </PanelWrapper>
  );
}

const PanelWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background: white;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  &.slideIn {
    animation-name: slideIn;
  }

  &.slideOut {
    animation-name: slideOut;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

const CloseBtn = styled.button`
  float: right;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding:0;
  color:black;
`;

export default AddPanel;