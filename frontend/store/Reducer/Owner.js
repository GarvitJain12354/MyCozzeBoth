import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticatedOwner: false,
};

export const Owner = createSlice({
  name: "Owner",
  initialState,
  reducers: {
    isOwnerRequest: (state, action) => {
      (state.isAuthenticatedOwner = false), (state.loading = true);
    },
    isOwnerSuccess: (state, action) => {
      (state.isAuthenticatedOwner = true), (state.loading = false);
    },
    isOwnerFail: (state, action) => {
      (state.isAuthenticatedOwner = false), (state.loading = false);
    },
    getOwnerPgSuccess: (state, action) => {
      state.loading = false;
      state.pg = action.payload.room;
    },
    isRequestOwner: (state, action) => {
      state.loading = true;
    },
    isSuccessOwner: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    isFailOwner: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
    clearMessageOwner: (state, action) => {
      state.message = null;
    },
    clearErrorOwner: (state, action) => {
      state.error = null;
    },
  },
});
export const {
  isOwnerFail,
  isOwnerRequest,
  isOwnerSuccess,
  isRequestOwner,
  isSuccessOwner,
  isFailOwner,
  clearMessageOwner,
  clearErrorOwner,
  getOwnerPgSuccess,
} = Owner.actions;
export default Owner.reducer;
