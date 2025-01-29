import { configureStore } from "@reduxjs/toolkit";
import User from "./Reducer/UserReducer";
import Auth from "./Reducer/Auth";
import Others from "./Reducer/Others";
import Owner from "./Reducer/Owner";
import Admin from "./Reducer/Admin";

export const store = configureStore({
  reducer: {
    User,
    Auth,
    Others,
    Owner,
    Admin
  },
});
