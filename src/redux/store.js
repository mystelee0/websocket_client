import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import userIdReducer from "./userIdSlice";
export const store=configureStore({
    reducer:{
        chat:chatReducer,
        userId:userIdReducer,
    },
})