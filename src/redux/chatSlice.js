import { createSlice } from "@reduxjs/toolkit";

const initialState=[
        {
            roomId:101,
            msgs:[
                {messageType : 2, sender : 'system', message : 'this is test message'},
            ]
        },
    ]


export const chatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{
        addMessage:(state,action)=>{
            let msg = action.payload;
            let pid=msg.roomId;
            let idx=state.findIndex(room=>room.roomId===pid)

            if(idx===-1){
                alert('roomId 오류 ');//방에 초대된경우 없음 새로 넣어야함
            }
            else {
                state[idx].msgs.push(msg)
            }
        }
    }
})

export const {addMessage}=chatSlice.actions;

export default chatSlice.reducer;