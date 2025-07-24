import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Home({}){

    let mobNum = useSelector((state)=>state.userInfo.mobNum);
    const navigate = useNavigate();

    return (
        <>
        <div style={{flex:1}}>
            <h2>채팅 사이트에 들어온 것을 환영함..!</h2>
        </div>
        </>
    );
}

export default Home;