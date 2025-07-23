import { Outlet } from "react-router-dom";
import { useCheckUser } from "../../useSetUser";

function AuthProvider(){

    //유저 로그인 체크
    useCheckUser();

    return <><Outlet/></>
}

export default AuthProvider;