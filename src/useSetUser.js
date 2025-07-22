import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/userInfoSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

//새로고침 발생 시 유저정보 없어지는 상황을 대처하기 위함
export function useCheckUser() {

    let user = useSelector((state) => state.userInfo);
    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.mobNum==="") {
            axios.get(`${SERVER_IP}/auth/me`, { withCredentials: true }) //헤더 json으로 만들기 
                .then((res) => {
                    console.log(res);
                    if(user.mobNum!==res.data.mobNum){
                        console.log("유저정보 기존과 다름 !!",user.mobNum,res.data.mobNum);
                        dispatch(setUserInfo(res.data));
                    }
                        
                    //return true;
                    navigate("/users");
                })
                .catch(() => {
                    //return false;
                    alert("로그인 페이지로 이동합니다...");
                    navigate("/login");
                })
        }


    }, []);

}