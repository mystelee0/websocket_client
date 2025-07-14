import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import userInfoReducer from "./userInfoSlice";
import friendInfoReducer from "./friendInfoSlice";

export const store=configureStore({
    reducer:{
        chat:chatReducer,
        userInfo:userInfoReducer,
        friendInfo:friendInfoReducer
    },
})