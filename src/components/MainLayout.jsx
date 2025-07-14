import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCheckUser } from "../useSetUser";
import { useState } from "react";
import AddPanel from "./AddPanel";

function MainLayout() {

    const location = useLocation();

    function getTitle() {
        if (location.pathname === "/users") return "친구";
        else if (location.pathname === "/chats") return "채팅";
    }

    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [isPanelClosing, setIsPanelClosing] = useState(false);

    function handlePlus() {
        setIsPanelVisible(true);
        setIsPanelClosing(false);
    }

    function handlePanelClose(finalClose) {
        if (finalClose) {
            // 완전히 닫을 때
            setIsPanelVisible(false);
        } else {
            // 닫기 애니메이션 시작
            setIsPanelClosing(true);
        }
    }
    useCheckUser();
    return (
        <>
            <PageTitle >
                {getTitle()}
                <button onClick={handlePlus} style={{ float: "right", padding: "0 5px", margin: "0" }}>+</button>

            </PageTitle>
            {isPanelVisible && <AddPanel onClose={handlePanelClose} isClosing={isPanelClosing} />}
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
