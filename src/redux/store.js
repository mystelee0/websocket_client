import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import userInfoReducer from "./userInfoSlice";

export const store=configureStore({
    reducer:{
        chat:chatReducer,
        userInfo:userInfoReducer,
    },
})