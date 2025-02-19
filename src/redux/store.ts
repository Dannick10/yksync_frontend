import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/AuthSlices"
import userReduce from "./slices/userSlices"
import projectReduce from "./slices/ProjectSlices"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReduce,
    project: projectReduce
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
