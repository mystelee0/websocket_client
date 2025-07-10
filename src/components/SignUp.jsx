import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function SignUp() {

    let [newUser,setNewUser]=useState({
        mobNum:"",
        nickName:"",
        password:""
    });
    function handleChange(e){
        setNewUser({
            ...newUser,
            [e.target.name]:e.target.value
        })
    }
  function handleSignUp(){
    axios.post("http://localhost:8080/users",newUser)
    .then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
  };

  return (
    <Container>
      <LoginBox>
        <Logo src="/jjanggu.jpeg" alt="Logo" />
        <Title>채팅하자 회원가입</Title>
        <Input placeholder="전화번호" name="mobNum" onChange={handleChange}></Input>
        <Input placeholder="별명" name="nickName" onChange={handleChange}></Input>
        <Input placeholder="비밀번호" name="password" onChange={handleChange}></Input>
        <LoginButton onClick={handleSignUp}>
          가입하기
        </LoginButton>
        <InfoText>계정이 이미 있으신가요? <a href="/login">로그인하기</a></InfoText>
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

export default SignUp;