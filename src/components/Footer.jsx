import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/users", label: "친구", icon: "👥" },
    { path: "/chats", label: "채팅", icon: "💬" },
    { path: "/", label: "홈", icon: "🏠" },
  ];

  return (
    <FooterContainer>
      {menuItems.map((item) => (
        <FooterBox
          key={item.path}
          $active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </FooterBox>
      ))}
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #f7f7f7;
  border-top: 1px solid #ccc;
`;

const FooterBox = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? "#e0e0e0" : "transparent")};
  color: ${({ $active }) => ($active ? "#000" : "#888")};
  transition: background-color 0.3s, color 0.3s;

  .icon {
    font-size: 22px;
    display: block;
  }

  .label {
    font-size: 12px;
    display: block;
  }

  &:hover {
    background-color: #eaeaea;
  }
`;