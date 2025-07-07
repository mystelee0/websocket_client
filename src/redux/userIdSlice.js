import { createSlice } from "@reduxjs/toolkit";

const initialState="none"


export const userIdSlice=createSlice({
    name:'userId',
    initialState,
    reducers:{
        setUserId(state,action){
            return action.payload
        },
    }
})

export const {setUserId} = userIdSlice.actions;
export default userIdSlice.reducer;