// components/AddPanel.jsx
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FriendSearchForm from "../friends/FriendSearchForm";
import axios from "axios";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { addFriendInfo } from "../../redux/friendInfoSlice";

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

    const isFirstRender = useRef(true);
    // 경로 변경시 초기화
    useEffect(()=>{
      // 첫번재 무시
      if(isFirstRender.current){
        isFirstRender.current = false;
        return;
      }
      setFoundUser();
      setCheckedList([]);
      onClose(false);
    },[location.pathname]);

    const handleAddFriendSubmit = (mobNum) => {
        // 친구 검색 폼
        axios.get(`${SERVER_IP}/users/${mobNum}`,{withCredentials:true})
        .then((res)=>{
          console.log("유저 검색 결과",res.data);
          setFoundUser(res.data);
        }).catch((err)=>{
          console.log(err);
        });
    };

    const friendList = useSelector((state)=>state.friendInfo);
    let [checkedList,setCheckedList] = useState([]);
    
    // 체크박스 선택,해제 시 checkedList 수정 
    function handleCheck(e){
      if(e.target.checked){
        console.log("체크",e.target.id);
        setCheckedList(prev => [...prev, e.target.id]);
      }else{
        console.log("해제",e.target.id);
        setCheckedList(prev => prev.filter(el=>el!==e.target.id));
      }
    }

    // 친구추가 버튼
    function handleAddFriend(){
      alert(JSON.stringify(foundUser));
      dispatch(addFriendInfo(foundUser));
      onClose(false);
    }
    // 채팅방 생성 버튼
    function handleCreateChatRoom(){
      alert(checkedList);
      // 시스템에 방만들기 요청 전송, 보낸후 받은 경로로 구독 및 subRoom에 추가
      onClose(false);
    }

    // chat/{id} 정규식
    const chatPathRegex = /^\/chats\/.+$/;

    return (
        <PanelWrapper className={isClosing ? "slideOut" : "slideIn"}>
            <CloseBtn onClick={() => onClose(false)}>X</CloseBtn>
            {location.pathname === "/users" &&
                <>
                    <div>👥 친구 추가 폼</div>
                    <FriendSearchForm onSubmit={handleAddFriendSubmit} />
                    {
                      foundUser?
                      <>
                      <ListItem type={1} contents={foundUser} />
                      <button onClick={handleAddFriend}>친구 추가</button>
                      </>
                      :null
                    }
                </>}

            {location.pathname === "/chats" && 
            <>
            <div>💬 채팅방 생성 폼</div>
            {
              friendList.map((value,index)=>{
                return (
                  <div key={index}>
                    <ListItem type={1} contents={value}/>
                
                <input id={value.mobNum} type="checkbox" onChange={handleCheck}></input>
                  </div>
                )
              })
            }
            <button onClick={()=>{handleCreateChatRoom()}}>확인</button>
            </>}
            {
              chatPathRegex.test(location.pathname) &&
              <>
                <div>💬 ~채팅방이름 </div>
                <button>방에서 나가기</button>
              </>
            }
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