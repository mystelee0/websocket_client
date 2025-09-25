import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import userInfoReducer from "./userInfoSlice";
import friendInfoReducer from "./friendInfoSlice";
import subRoomReducer from "./subRoomSlice";

export const store=configureStore({
    reducer:{
        chat:chatReducer,
        userInfo:userInfoReducer,
        friendInfo:friendInfoReducer,
        subRoom:subRoomReducer
    },
})