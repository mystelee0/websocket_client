import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    {
        mobNum:"001",
        nickName:"테스트1"
    },
    {
        mobNum:"002",
        nickName:"테스트2"
    },
];

//친구목록 저장
export const friendInfoSlice=createSlice({
    name:'friendInfo',
    initialState,
    reducers:{
        setFriendInfo(state,action){
            return action.payload
        },
    }
})

export const {setFriendInfo} = friendInfoSlice.actions;
export default friendInfoSlice.reducer;