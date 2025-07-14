import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Home({}){

    let mobNum = useSelector((state)=>state.userInfo.mobNum);
    const navigate = useNavigate();

    function handleOnClick(){
        if(mobNum===""){
            alert("로그인 페이지로 이동합니다.");
            navigate("/login");
        }else{
            navigate("/users");
        }
    }
    return (
        <>
        <div>
            <h2>반갑..!</h2>
        </div>
        <button onClick={handleOnClick}>시작하기</button>
        </>
    );
}

export default Home;