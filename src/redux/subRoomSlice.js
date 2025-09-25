import { createSlice } from "@reduxjs/toolkit";

const initialState=[
        "/topic/101"
    ]


export const subRoomSlice=createSlice({
    name:'subRoom',
    initialState,
    reducers:{
        addSubRoom:(state,action)=>{
            let roomId = action.payload;

            if(state.find(subId=>subid===roomId)){
                return false;
            }
            else {
                state.push(roomId);
                return true;
            }
        }
    }
})

export const {addSubRoom}=subRoomSlice.actions;

export default subRoomSlice.reducer;