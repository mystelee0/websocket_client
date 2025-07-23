
function MessageTime({time}){

    let date = new Date(time);

    let h = date.getHours();
    let m = date.getMinutes();
    let amPm = '오전';
    if( h >= 12 ) amPm="오후";
    if( h >= 13 ) h = h-12; 
    if( m < 10 ) m = "0"+m;
    

    return <span style={{fontSize:"12px",color:"black",alignSelf:"flex-end", marginRight:"5px"}}>{`${amPm} ${h}:${m}`}</span>
    
}

export default MessageTime;