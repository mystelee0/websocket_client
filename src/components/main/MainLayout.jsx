import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCheckUser } from "../../useSetUser";
import { useEffect, useState } from "react";
import AddPanel from "../common/AddPanel";
import { useWebsocket } from "../../useWebsocket";
import Footer from "./Footer";

function MainLayout() {

    const location = useLocation();

    useCheckUser();

    function getTitle() {
        if (location.pathname === "/users") return "친구";
        else if (location.pathname === "/chats") return "채팅";
        else if (location.pathname === "/") return "WELCOME !";
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


    return (
        <>
            <PageTitle >
                {getTitle()}
                <button onClick={handlePlus} style={{ float: "right", padding: "0 5px", margin: "0" }}>+</button>

            </PageTitle>
            {isPanelVisible && <AddPanel onClose={handlePanelClose} isClosing={isPanelClosing} />}
            <Outlet />

            <Footer/>
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
