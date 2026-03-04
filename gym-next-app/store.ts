import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./action/authSlice";
import alertReducer from "./action/alertSlice";
import todoReducer from "./action/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    todo: todoReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
