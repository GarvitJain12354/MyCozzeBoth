import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
};
export const Admin = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    adminRequest: (state, action) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      (state.loading = false),
        (state.allUser = action.payload.users),
        (state.totalPages = action.payload.totalPages);
    },
    getOwnerSuccess: (state, action) => {
      (state.loading = false), console.log(action.payload);

      (state.owners = action.payload.users),
        (state.totalPages = action.payload.totalPages);
    },
    getFlatOwnerSuccess: (state, action) => {
      (state.loading = false),
      (state.flatOwner = action.payload.users),
        (state.totalPages = action.payload.totalPages);
    },
    getListingSuccess: (state, action) => {
      (state.loading = false),
        (state.listing = action.payload.listings),
        (state.totalPages = action.payload.totalPages);
      state.message = action.payload.message;
    },
    getFlatsSuccess: (state, action) => {
      (state.loading = false),
        (state.flat = action.payload.flat),
        (state.totalPages = action.payload.totalPages);
      state.message = action.payload.message;
    },
    getPgSuccess: (state, action) => {
      (state.loading = false),
        (state.pg = action.payload.rooms),
        (state.totalPages = action.payload.totalPages);
      state.message = action.payload.message;
    },
    getSalesPersonSuccess: (state, action) => {
      (state.loading = false),
        (state.sales = action.payload.users),
        (state.totalPages = action.payload.totalPages);
    },
    registerSalesPersonSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    uploadCitySuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    uploadPlanSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    updatePlanSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    getPlanAdminSuccess: (state, action) => {
      (state.plan = action.payload.plan), (state.loading = false);
    },
    uploadTestimonialAdminSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    deleteTestimonialAdminSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    getRefundAdminSuccess: (state, action) => {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.refund = action.payload.refund);
    },
    statusRefundAdminSuccess: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    getUserDetailSuccess: (state, action) => {
      (state.loading = false),
        (state.user = action.payload.user),
        (state.message = action.payload.message);
    },
    getDashboardDetailsSuccess: (state, action) => {
      (state.loading = false),
        (state.dashboard = action.payload.data),
        (state.message = action.payload.message);
    },
    getDashboardListingSuccess: (state, action) => {
      (state.loading = false),
      
      state.dashboardlisting = action.payload.data,
        (state.message = action.payload.message);
    },
    adminFail: (state, action) => {
      state.loading = false;
    },
    getAdminFlatMateDetailsSuccess: (state, action) => {
      state.loading = false;
      state.flatgraph = action.payload.data;
      state.message = action.payload.message;
    },
    clearAdminMessage: (state, action) => {
      state.message = null;
    },
    clearAdminError: (state, action) => {
      state.error = null;
    },
  },
});
export const {
  adminRequest,
  adminFail,
  getUserSuccess,
  getListingSuccess,
  getPgSuccess,
  getSalesPersonSuccess,
  clearAdminError,
  clearAdminMessage,
  registerSalesPersonSuccess,
  uploadCitySuccess,
  uploadPlanSuccess,
  updatePlanSuccess,
  getPlanAdminSuccess,
  getFlatsSuccess,
  uploadTestimonialAdminSuccess,
  deleteTestimonialAdminSuccess,
  getRefundAdminSuccess,
  statusRefundAdminSuccess,
  getUserDetailSuccess,
  getOwnerSuccess,
  getDashboardDetailsSuccess,
  getDashboardListingSuccess,
  getAdminFlatMateDetailsSuccess,
  getFlatOwnerSuccess
} = Admin.actions;
export default Admin.reducer;
