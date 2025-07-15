// components/AddPanel.jsx
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FriendAddForm from "./FriendAddForm";
import axios from "axios";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { addFriendInfo } from "../redux/friendInfoSlice";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

function AddPanel({ onClose, isClosing }) {
    const location = useLocation();
    let [foundUser,setFoundUser] = useState();
    const dispatch = useDispatch();


    // 닫는 애니메이션이 끝나고 나서 실제로 unmount 하도록
    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                onClose(true); // 실제로 완전히 닫히도록 신호
            }, 300); // 애니메이션 시간과 맞춰야 함

            return () => clearTimeout(timer);
        }
    }, [isClosing]);

    const handleAddFriendSubmit = (mobNum) => {
        //친구추가 작성해야함
        axios.get(`${SERVER_IP}/users/${mobNum}`,{withCredentials:true})
        .then((res)=>{
          setFoundUser(res.data);
        }).catch((err)=>{
          console.log(err);
        });
    };

    return (
        <PanelWrapper className={isClosing ? "slideOut" : "slideIn"}>
            <CloseBtn onClick={() => onClose(false)}>X</CloseBtn>
            {location.pathname === "/users" &&
                <>
                    <div>👥 친구 추가 폼</div>
                    <FriendAddForm onSubmit={handleAddFriendSubmit} />
                    {
                      foundUser?
                      <>
                      <ListItem type={1} contents={foundUser}/>
                      <button onClick={()=>{
                        dispatch(addFriendInfo(foundUser));
                      }}>친구 추가</button>
                      </>
                      :null
                    }
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