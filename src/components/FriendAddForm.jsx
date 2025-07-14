import { useState } from "react";
import styled from "styled-components";

function FriendAddForm({ onSubmit }) {
  const [mobNum, setMobNum] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = mobNum.trim();
    if (trimmed === "") {
      alert("전화번호를 입력해주세요.");
      return;
    }
    onSubmit(trimmed);
    setMobNum("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="tel"
        placeholder="전화번호 입력 (-) 없이"
        value={mobNum}
        onChange={(e) => setMobNum(e.target.value)}
      />
      <AddButton type="submit">추가</AddButton>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: #128c7e;
  }
`;

const AddButton = styled.button`
  padding: 10px 16px;
  background-color: #128c7e;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0d6b5e;
  }
`;

export default FriendAddForm;