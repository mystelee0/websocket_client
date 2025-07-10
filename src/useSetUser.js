import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/userInfoSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//새로고침 발생 시 유저정보 없어지는 상황을 대처하기 위함
export function useCheckUser(){

    let user = useSelector((state)=>state.userInfo);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://192.168.106.80:8080/auth/me",{withCredentials:true}) //헤더 json으로 만들기 
        .then((res)=>{
            console.log(res);
            dispatch(setUserInfo(res.data));
        })
        .catch(()=>{
            alert("로그인 페이지로 이동합니다...");
            navigate("/login");
        })
        
    },[]);
    
}