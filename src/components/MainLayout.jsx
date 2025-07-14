import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCheckUser } from "../useSetUser";

function MainLayout() {

    const location = useLocation();

    function getTitle(){
        if(location.pathname==="/") return "친구";
        else return "채팅";
    }
    useCheckUser();
    return (
        <>
            <PageTitle >{getTitle()}</PageTitle>
            <Outlet />
            <div>
                <Link to="/users">친구 </Link>
                <Link to="/chats">채팅 </Link>
                <Link to={"/login"}>로그인 </Link>
            </div>
        </>
    )
}

const PageTitle = styled.div`
font-weight: bold;
 font-size: 20px;
 text-align:left;
 color:black;
 padding:12px 16px;
`;

export default MainLayout;
