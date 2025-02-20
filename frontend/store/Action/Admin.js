import axios from "../../Axios/axios";
import {
  adminFail,
  adminRequest,
  deleteTestimonialAdminSuccess,
  getAdminFlatMateDetailsSuccess,
  getDashboardDetailsSuccess,
  getDashboardListingSuccess,
  getFlatOwnerSuccess,
  getFlatsSuccess,
  getListingSuccess,
  getOwnerSuccess,
  getPgSuccess,
  getPlanAdminSuccess,
  getRefundAdminSuccess,
  getSalesPersonSuccess,
  getUserDetailSuccess,
  getUserSuccess,
  registerSalesPersonSuccess,
  statusRefundAdminSuccess,
  updatePlanSuccess,
  uploadCitySuccess,
  uploadPlanSuccess,
  uploadTestimonialAdminSuccess,
} from "../Reducer/Admin";

export const getAllUser = (page, limit) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(
      `/admin/get/user?page=${page}&limit=${limit}`
    );
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};
export const getAllPgOwners = (page, limit) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(
      `/admin/get/owner?page=${page}&limit=${limit}`
    );
    dispatch(getOwnerSuccess(data));
  } catch (error) {
    console.log(error);

    dispatch(adminFail(error.response.data));
  }
};
export const getAllFlatOwners = (page, limit) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(
      `/admin/get/flat?page=${page}&limit=${limit}`
    );
    dispatch(getFlatOwnerSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};
export const getAllListing = (page, limit) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(
      `/admin/get/listing?page=${page}&limit=${limit}`
    );
    dispatch(getListingSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const getAllFlat = (page, limit) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(
      `/admin/get/flats?page=${page}&limit=${limit}`
    );
    dispatch(getFlatsSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const getAllPg = (page, limit) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(
      `/admin/get/pg?page=${page}&limit=${limit}`
    );
    dispatch(getPgSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const updateStatusListing = (id) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/update/status/listing/${id}`);
    dispatch(getListingSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};
export const updateStatusPg = (id, info) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.post(`/admin/update/status/pg/${id}`, info);
    dispatch(getPgSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};
export const getAllSalesPerson = (page, limit) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(
      `/admin/get/sales?page=${page}&limit=${limit}`
    );
    dispatch(getSalesPersonSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const registerSalesPerson = (info) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.post(`/admin/register/sales`, info);
    dispatch(registerSalesPersonSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const updateStatusSalesPerson = (id) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/update/status/sales/${id}`);
    dispatch(registerSalesPersonSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const uploadCity = (info) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.post(`/admin/upload/city`, info);
    dispatch(uploadCitySuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const deleteCity = (id) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/delete/city/${id}`);
    dispatch(uploadCitySuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const uploadPlan = (dets) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.post(`/admin/add/plan`, dets);
    dispatch(uploadPlanSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};
export const updatePlan = (id, dets) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.post(`/admin/edit/plan/${id}`, dets);
    dispatch(updatePlanSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};
export const getAllPlansAdmin = () => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/get/all/plan`);
    dispatch(getPlanAdminSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const uploadTestimonials = (dets) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.post(`/admin/upload/testimonial`, dets);
    dispatch(uploadTestimonialAdminSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const deleteTestimonials = (id) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/delete/testimonial/${id}`);
    dispatch(deleteTestimonialAdminSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const getRequestRefund = (id) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/get/refund`);
    dispatch(getRefundAdminSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const updateStatusRefund = (info) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.post(`/admin/update/status/refund`, info);
    dispatch(statusRefundAdminSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const getUserAllDetails = (id) => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/get/user/${id}`);
    dispatch(getUserDetailSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const getAdminDashboardDetails =
  (filter, start, end) => async (dispatch) => {
    dispatch(adminRequest());
    try {
      const { data } = await axios.get(
        `/admin/dashboard/details?filterType=${filter}&startDate=${start}&endDate=${end}`
      );
      dispatch(getDashboardDetailsSuccess(data));
    } catch (error) {
      dispatch(adminFail(error.response.data));
    }
  };

export const getAdminDashboardListing = () => async (dispatch) => {
  dispatch(adminRequest());
  try {
    const { data } = await axios.get(`/admin/dashboard/users`);

    dispatch(getDashboardListingSuccess(data));
  } catch (error) {
    dispatch(adminFail(error.response.data));
  }
};

export const getAdminFlatMateDetails =
  (role, gender, city, plans) => async (dispatch) => {
    dispatch(adminRequest());
    try {
      const { data } = await axios.get(
        `/admin/dashboard/flatmate/details?role=${role}&gender=${gender}&city=${city}&plans=${plans}`
      );

      dispatch(getAdminFlatMateDetailsSuccess(data));
    } catch (error) {
      dispatch(adminFail(error.response.data));
    }
  };
