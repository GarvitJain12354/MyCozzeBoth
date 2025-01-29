import axios from "../../Axios/axios";
import { getPgSuccess } from "../Reducer/Admin";
import {
  getCityIdSuccess,
  getCitySuccess,
  getFilterDataSuccess,
  getListIdSuccess,
  getListingSuccess,
  getPgIdSuccess,
  getPgOtherSuccess,
  getPlanSuccess,
  getTestimonialSuccess,
  getUserIdSuccess,
  isFailOther,
  isRequestOther,
} from "../Reducer/Others";

export const getAllListings = () => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get("/other/get/all/listing");
    dispatch(getListingSuccess(data));
  } catch (error) {
    dispatch(isFailOther(error.response.data));
  }
};
export const getAllPgs = () => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get("/other/get/all/pg");
    dispatch(getPgOtherSuccess(data));
  } catch (error) {
    console.log(error);

    dispatch(isFailOther(error.response.data));
  }
};

export const getAllListingId = (id) => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get(`/other/get/listing/${id}`);
    dispatch(getListIdSuccess(data));
  } catch (error) {
    console.log(error);

    dispatch(isFailOther(error.response.data));
  }
};
export const getUserById = (id) => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get(`/other/get/user/${id}`);
    dispatch(getUserIdSuccess(data));
  } catch (error) {
    dispatch(isFailOther(error.response.data));
  }
};
export const getPgId = (id) => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get(`/other/get/pg/${id}`);
    dispatch(getPgIdSuccess(data));
  } catch (error) {
    console.log(error);

    dispatch(isFailOther(error.response.data));
  }
};

export const getAllCity = () => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get(`/other/get/city`);
    dispatch(getCitySuccess(data));
  } catch (error) {
    console.log(error);

    dispatch(isFailOther(error.response.data));
  }
};

export const getCityById = (id) => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get(`/other/get/city/${id}`);
    dispatch(getCityIdSuccess(data));
  } catch (error) {
    console.log(error);

    dispatch(isFailOther(error.response.data));
  }
};

export const getFilterData =
  (type, location, budget, gender) => async (dispatch) => {
    dispatch(isRequestOther());
    try {
      const { data } = await axios.get(
        `/other/get/filter/data?type=${type}&location=${location}&budget=${budget}&gender=${gender}`
      );
      dispatch(getFilterDataSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(isFailOther(error.response.data));
    }
  };
export const getFilterTenant = (city,budget, gender) => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    console.log("Hello",459);
    
    const { data } = await axios.get(
      `/other/get/filter/tenant?city=${city}&budget=${budget}&gender=${gender}`
    );
    dispatch(getFilterDataSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(isFailOther(error.response.data));
  }
};

export const getAllPlans = () => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get(`/other/get/all/plan`);
    dispatch(getPlanSuccess(data));
  } catch (error) {
    dispatch(isFailOther(error.response.data));
  }
};

export const getAllTestimonial = () => async (dispatch) => {
  dispatch(isRequestOther());
  try {
    const { data } = await axios.get(`/other/get/testimonial`);
    dispatch(getTestimonialSuccess(data));
  } catch (error) {
    dispatch(isFailOther(error.response.data));
  }
};
