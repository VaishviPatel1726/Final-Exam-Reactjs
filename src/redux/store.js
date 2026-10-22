import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentslice";

export const store = configureStore({
    reducer: {
        students: studentReducer
    }
});