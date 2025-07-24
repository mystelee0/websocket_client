import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/userInfoSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

/**
 * 로그인 여부 확인 함수
 * 
 * 요청 결과로 유저정보가 담겨있으면 리덕스 유저정보 공간에 저장
 * check()의 결과로 true,false 반환
 */
export function useCheckUser() {

    const userMobNum = useSelector((state) => state.userInfo.mobNum);
    const dispatch = useDispatch();

    async function check() {
        try {
            const res = await axios.get(`${SERVER_IP}/auth/me`, { withCredentials: true })
            console.log("세션 확인 결과 : ", res.data);
            //새로고침으로 유저정보가 비워진 경우
            if (userMobNum !== res.data.mobNum) {
                //유저정보 다시 저장
                dispatch(setUserInfo(res.data));
            }

            return true;

        } catch (err) {
            return false;
        }
    }

    return check;
}