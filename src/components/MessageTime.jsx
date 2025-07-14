
function MessageTime({time,prevTime}){

    if(time===prevTime){
        return <span style={{fontSize:"12px",color:"black",alignSelf:"flex-end", marginRight:"5px"}}>{time}</span>
    }else {
        return null;
    }
}

export default MessageTime;