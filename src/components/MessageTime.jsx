
function MessageTime({time,prevTime}){

    if(time===prevTime){
        return null;
    }else {
        return <span style={{fontSize:"12px",color:"black",alignSelf:"flex-end", marginRight:"5px"}}>{"오후 15:10"}</span>
    }
}

export default MessageTime;