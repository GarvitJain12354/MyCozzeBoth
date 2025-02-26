import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  message: null,
  error: null,
};

export const Auth = createSlice({
  name: "flatmate",
  initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      (state.isAuthenticated = false), (state.loading = true);
    },
    userLoginSuccess: (state, action) => {
      (state.isAuthenticated = true),
        (state.loading = false),
        (state.message = "User Login Successfully"),
        (state.user = action.payload.user);
    },
    userLoginFail: (state, action) => {
      (state.isAuthenticated = false),
        (state.loading = false),
        (state.error = action.payload.message);
    },
    userRegisterRequest: (state, action) => {
      (state.isAuthenticated = false), (state.loading = true);
    },
    userRegisterSuccess: (state, action) => {
      (state.isAuthenticated = true),
        (state.loading = false),
        // (state.message = "User Register Successfully"),
        (state.user = action.payload.user);
    },
    userRegisterFail: (state, action) => {
      (state.isAuthenticated = true),
        (state.loading = false),
        (state.error = action.message);
    },
    userRegisterFail: (state, action) => {
      (state.isAuthenticated = true),
        (state.loading = false),
        (state.error = action.message);
    },
    userRegisterFail: (state, action) => {
      (state.isAuthenticated = true),
        (state.loading = false),
        (state.error = action.message);
    },
    userRegisterFail: (state, action) => {
      (state.isAuthenticated = true),
        (state.loading = false),
        (state.error = action.payload.message);
    },

    userLogoutSuccess: (state, action) => {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = null);
    },
    userForgetLinkSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    isUserRequest: (state, action) => {
      state.loading = true;
      // (state.isAuthenticated = false),
      // (state.user = null);
    },
    deleteAccountSuccess: (state, action) => {
      state.loading = false;
    },
    isUserSuccess: (state, action) => {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload.user);
    },
    isUserFail: (state, action) => {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = null);
    },
    isRequest: (state, action) => {
      state.loading = true;
    },
    isSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    isFail: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
    clearMessage: (state, action) => {
      state.message = null;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});
export const {
  userLoginFail,
  userLoginRequest,
  userLoginSuccess,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  isRequest,
  isFail,
  isSuccess,
  clearError,
  clearMessage,
  userLogoutSuccess,
  isUserFail,
  isUserSuccess,
  isUserRequest,
  userNotificationSuccess,
  userForgetLinkSuccess,
  deleteAccountSuccess,
} = Auth.actions;
export default Auth.reducer;
