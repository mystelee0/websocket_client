import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    {
        mobNum:"001",
        nickName:"사람1"
    },
    {
        mobNum:"002",
        nickName:"사람2"
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
        addFriendInfo(state,action){
            let newFriend = action.payload;
            state.push(newFriend);
        }
    }
})

export const {setFriendInfo} = friendInfoSlice.actions;
export const {addFriendInfo} = friendInfoSlice.actions;
export default friendInfoSlice.reducer;