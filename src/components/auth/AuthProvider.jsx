import { Outlet } from "react-router-dom";
import { useCheckUser } from "../../useSetUser";
import { useState } from "react";

function AuthProvider(){

    
    const [menuOpen, setMenuOpen] = useState(false);
    //유저 로그인 체크
    useCheckUser();

    

    return <><Outlet/></>
}

export default AuthProvider;