import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client } from '@stomp/stompjs';
import { addMessage } from "./redux/chatSlice";

const WS_IP = import.meta.env.VITE_WS_IP;

export function useWebsocket() {

    let [client, setClient] = useState();
    let dispatch = useDispatch();
    let storedUser = useSelector((state)=>state.userInfo);
    //웹소켓 연결
    useEffect(() => {
        //메세지 수신
        const messageCallback = function (message) {
            console.log("메세지 콜백 실행");
            // called when the client receives a STOMP message from the server
            if (message.body) {
                console.log("받은메시지", message);
                dispatch(addMessage(message.body));
            } else {
                alert("error");
            }
        }

        const client = new Client({
            brokerURL: `${WS_IP}/websocket-server`,
            onConnect: () => {
                let subscribeId = client.subscribe(`/user/${storedUser}/queue/message`, messageCallback);
                client.subscribe(`/topic/101`, messageCallback);
                console.log(subscribeId);
            },
            // 디버그 로그 출력
            debug: function (str) {
                console.log(str);
            },
        });
        //state에 저장
        setClient(client);

        client.activate();
    }, []);

    return [client];
}