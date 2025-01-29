import axios from "../../Axios/axios";
import {
  getOwnerPgSuccess,
  isFailOwner,
  isOwnerFail,
  isOwnerRequest,
  isOwnerSuccess,
  isRequestOwner,
  isSuccessOwner,
} from "../Reducer/Owner";

export const isOwner = () => async (dispatch) => {
  dispatch(isOwnerRequest());
  try {
    const { data } = await axios.get("/owner/owner");
    dispatch(isOwnerSuccess(data));
  } catch (error) {
    dispatch(isOwnerFail(error.response.data));
  }
};
export const addPg = (info) => async (dispatch) => {
  dispatch(isRequestOwner());
  try {
    const { data } = await axios.post("/owner/add/pg", info);
    dispatch(isSuccessOwner(data));
  } catch (error) {
    dispatch(isFailOwner(error.response.data));
  }
};
export const updatePgDetails = (id, info) => async (dispatch) => {
  dispatch(isOwnerRequest());
  try {
    const { data } = await axios.post(`/owner//update/pg/${id}`, info);
    dispatch(isOwnerSuccess(data));
  } catch (error) {
    dispatch(isOwnerFail(error.response.data));
  }
};
export const deletePg = (id) => async (dispatch) => {
  dispatch(isOwnerRequest());
  try {
    const { data } = await axios.get(`/owner/delete/pg/${id}`);
    dispatch(isSuccessOwner(data));
  } catch (error) {
    dispatch(isFailOwner(error.response.data));
  }
};
export const getOwnerPg = () => async (dispatch) => {
  dispatch(isRequestOwner());
  try {
    const { data } = await axios.get("/owner/get/pg");
    dispatch(getOwnerPgSuccess(data));
  } catch (error) {
    dispatch(isFailOwner(error.response.data));
  }
};
