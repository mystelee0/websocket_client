import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setUserInfo } from "../redux/userInfoSlice";
import { useNavigate } from "react-router-dom";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

function Login() {

    let [loginData, setLoginData] = useState({
        mobNum: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    };

    function handleLogin(){
        axios.post(`${SERVER_IP}/auth/login`,loginData,{withCredentials:true})
        .then((res)=>{
            console.log("로그인 결과값 ",res.data);
            alert("로그인 성공");
            dispatch(setUserInfo(res.data));     
            navigate("/users");
        })
        .catch((err)=>alert("로그인 실패",err));
    }

    return (
        <Container>
            <LoginBox>
                <Logo src="/jjanggu.jpeg" alt="Kakao Logo" />
                <Title>채팅하자 로그인</Title>
                <Input placeholder="전화번호" name="mobNum" onChange={handleChange}></Input>
                <Input placeholder="비밀번호" name="password" onChange={handleChange}></Input>
                <LoginButton onClick={handleLogin}>
                    로그인
                </LoginButton>
                <InfoText>계정이 없으신가요? <a href="/signup">회원가입</a></InfoText>
            </LoginBox>
        </Container>
    );
}

const Container = styled.div`
  
  flex:1;
  background: #f7e600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 300px;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  color: #3c1e1e;
`;
const Input = styled.input`
    box-sizing:border-box;
    width:100%;
    padding: 12px 10px;
    margin-bottom: 16px;
    background-color: transparent;
    border:1px solid #eee;
    border-radius:6px;
    color:black;
    font-size:16px;
`
const LoginButton = styled.button`
  background: #ffe812;
  border: none;
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background 0.2s;

  &:hover {
    background: #ffde00;
  }
`;

const InfoText = styled.p`
  font-size: 13px;
  color: #666;
  a {
    text-decoration: none;
    color: #3c1e1e;
    font-weight: bold;
  }
`;

export default Login;