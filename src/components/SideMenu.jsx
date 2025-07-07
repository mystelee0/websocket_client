import { useState } from "react";
import styled from "styled-components";

function SideMenu({menuOpen}){

    return(
        <>
            <SideMenuContainer open={menuOpen}>
                <MenuItem>프로필</MenuItem>
                <MenuItem>설정</MenuItem>
                <MenuItem>로그아웃</MenuItem>
            </SideMenuContainer>
        </>
    );
}

const SideMenuContainer = styled.div`
position:absolute;
top:0;
right:0;
  width: 200px;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
`;
const MenuItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  color: #333;
  font-size: 15px;

  &:hover {
    color: #007bff;
  }
`;

export default SideMenu;