import { createSlice } from "@reduxjs/toolkit";
import { getTeamDetails } from "../Action/User";
import { act } from "react";

const initialState = {
  isAuthenticated: false,
  loading: false,
  message: null,
};

export const User = createSlice({
  name: "flatmate",
  initialState,
  reducers: {
    userRequest: (state, action) => {
      (state.loading = true), (state.message = null), (state.error = null);
    },
    userListingSuccess: (state, action) => {
      (state.loading = false),
        (state.listing = action.payload.data),
        (state.message = action.payload.message),
        (state.error = null);
    },

    userTenantSuccess: (state, action) => {
      (state.loading = false),
        (state.tenant = action.payload.data),
        (state.message = action.payload.message),
        (state.error = null);
    },
    userSuccess: (state, action) => {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.error = null);
    },
    userResetPasswordSuccess: (state, action) => {
      (state.loading = false),
        (state.message = "Password Changed Successfully"),
        (state.error = null);
    },
    userFail: (state, action) => {
      (state.loading = false),
        (state.message = null),
        (state.error = action.payload.message);
      console.log(action.payload);
    },
    userMatchesSuccess: (state, action) => {
      (state.matches = action.payload.matches), (state.loading = false);
    },
    userMessagesSuccess: (state, action) => {
      (state.message = action.payload), (state.loading = false);
    },
    userChatDetsSuccess: (state, action) => {
      (state.chatDets = action.payload.receiver), (state.loading = false);
    },
    userMessagesDeleteSuccess: (state, action) => {
      state.dlt = action.payload.message;
      state.loading = false;
    },
    userAssignPlanSuccess: (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    },
    userReportingSuccess: (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    },
    clearDlt: (state, action) => {
      state.dlt = null;
    },
    userNotificationSuccess: (state, action) => {
      (state.loading = false),
        (state.notification = action.payload.notification),
        (state.count = action.payload.number);
    },
    removeNotificationSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    refundSuccess: (state, action) => {
      (state.loading = false), (state.refund = action.payload.refund);
    },
    getTeamDetailsSuccess: (state, action) => {
      (state.team = action.payload.tenant), (state.loading = false);
    },
    clearMessageUser: (state, action) => {
      state.message = null;
    },
    clearErrorUser: (state, action) => {
      state.error = null;
    },
  },
});
export const {
  userRequest,
  userSuccess,
  userFail,
  clearMessageUser,
  clearErrorUser,
  userListingSuccess,
  userTenantSuccess,
  userNotificationSuccess,
  removeNotificationSuccess,
  userMatchesSuccess,
  userMessagesSuccess,
  userChatDetsSuccess,
  userMessagesDeleteSuccess,
  userAssignPlanSuccess,
  userReportingSuccess,
  clearDlt,
  refundSuccess,
  getTeamDetailsSuccess,
  userResetPasswordSuccess,
} = User.actions;
export default User.reducer;
