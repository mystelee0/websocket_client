import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCheckUser } from "../../useSetUser";
import { useEffect, useState } from "react";

function AuthProvider() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    //유저 로그인 체크
    const check = useCheckUser();

    useEffect(() => {
        check().then((res) => {
            if (!res) {
                alert("로그인 페이지로 이동합니다...");
                navigate("/login");
            }
            setIsLoading(true);
        })

    }, []);

    if (!isLoading) {
        return <><h1>로딩중...</h1></>;
    }

    return <><Outlet /></>
}

export default AuthProvider;