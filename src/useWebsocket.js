import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client } from '@stomp/stompjs';
import { addMessage } from "./redux/chatSlice";

const WS_IP = import.meta.env.VITE_WS_IP;

export function useWebsocket() {
    console.log("@@@@useWebsocket 호출@@@@");
    let [client, setClient] = useState();
    let dispatch = useDispatch();
    let storedUser = useSelector((state) => state.userInfo);

    //웹소켓 연결
    useEffect(() => {
        console.log("useweboscket useeffect 실행", storedUser);
        if (!storedUser.mobNum) {
            console.log("storedUser가 비어있어 웹소켓 연결 안함");
            return;
        }
        //메세지 수신
        const messageCallback = function (message) {
            console.log("메세지 콜백 실행");
            // called when the client receives a STOMP message from the server
            if (message.body) {
                console.log("받은메시지", message.body);
                let msg = JSON.parse(message.body);
                if(msg.messageType===2){
                    console.log("시스템 메시지 도착");
                }else {
                    console.log("유저 메시지 도착");
                }
                dispatch(addMessage(msg));
            } else {
                alert("error");
            }
        }

        const client = new Client({
            brokerURL: `${WS_IP}/websocket-server`,
            onConnect: () => {
                const subscribeId = client.subscribe(`/user/${storedUser.mobNum}/queue/message`, messageCallback);
                client.subscribe(`/topic/101`, messageCallback);
                console.log(subscribeId);

                return () => {
                    subscribeId.unsubscribe();
                }
            },
            // 디버그 로그 출력
            debug: function (str) {
                console.log(str);
            },
        });
        //state에 저장
        setClient(client);

        client.activate();
    }, [storedUser]);

    return [client];
}