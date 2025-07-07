import styled from "styled-components";

function FriendsList() {

    return (
        <>
            <Home>홈페이지</Home>
            <div>잘 되나</div>
        </>
    )
}

const Home = styled.div`
    flex:1;
    background-color:white;
    color:black;
`;

export default FriendsList;