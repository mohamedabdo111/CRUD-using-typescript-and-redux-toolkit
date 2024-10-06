import { configureStore } from "@reduxjs/toolkit";
// ...
import AuthSlice from "./slices/authReducer";
import UserPermisions from "./slices/userSlice";
import { useDispatch } from "react-redux";
import adminSlice from "./slices/adminSlice";

const Store = configureStore({
  reducer: {
    Auth: AuthSlice,
    posts: UserPermisions,
    adminCategory: adminSlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default Store;
