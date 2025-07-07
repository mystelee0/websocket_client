import { createSlice } from "@reduxjs/toolkit";

const initialState=[
        {
            roomId:101,
            msg:[
                {messageType : 2, sender : 'system', message : 'this is test message'},
            ]
        },
    ]


export const chatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{
        add:(state,action)=>{
            let msg = JSON.parse(action.payload);
            let pid=msg.roomId;
            let idx=state.findIndex(room=>room.roomId===pid)

            if(idx===-1){
                alert('roomId 오류 ');
            }
            else {
                state[idx].msg.push(msg)
            }
        }
    }
})

export const {add}=chatSlice.actions;

export default chatSlice.reducer;