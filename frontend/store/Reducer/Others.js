import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const Others = createSlice({
  name: "Others",
  initialState,
  reducers: {
    getListingSuccess: (state, action) => {
      (state.listing = action.payload.list), (state.loading = false);
    },
    getPgOtherSuccess: (state, action) => {
      (state.pg = action.payload.pg), (state.loading = false);
    },
    getListIdSuccess: (state, action) => {
      (state.list = action.payload.listing), (state.loading = false);
    },

    getUserIdSuccess: (state, action) => {
      (state.userDets = action.payload.user), (state.loading = false);
    },
    getPgIdSuccess: (state, action) => {
      (state.pgDets = action.payload.pg), (state.loading = false);
    },
    getCitySuccess: (state, action) => {
      (state.city = action.payload.city), (state.loading = false);
    },
    getCityIdSuccess: (state, action) => {
      (state.cityId = action.payload.city), (state.loading = false);
    },
    getFilterDataSuccess: (state, action) => {
      (state.loading = false), (state.filterData = action.payload.data);
    },
    getPlanSuccess: (state, action) => {
      (state.plan = action.payload.plan), (state.loading = false);
    },
    getTestimonialSuccess: (state, action) => {
      (state.testimonial = action.payload.testimonial), (state.loading = false);
    },
    isRequestOther: (state, action) => {
      state.loading = true;
    },
    isFailOther: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
  },
});
export const {
  getListingSuccess,
  isFailOther,
  getListIdSuccess,
  isRequestOther,
  getPgOtherSuccess,
  getPgIdSuccess,
  getCitySuccess,
  getCityIdSuccess,
  getFilterDataSuccess,
  getPlanSuccess,
  getUserIdSuccess,
  getTestimonialSuccess,
} = Others.actions;
export default Others.reducer;
