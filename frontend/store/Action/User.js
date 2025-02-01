import axios from "../../Axios/axios";
import {
  getTeamDetailsSuccess,
  refundSuccess,
  removeNotificationSuccess,
  userAssignPlanSuccess,
  userChatDetsSuccess,
  userFail,
  userListingSuccess,
  userMatchesSuccess,
  userMessagesDeleteSuccess,
  userMessagesSuccess,
  userNotificationSuccess,
  userReportingSuccess,
  userRequest,
  userResetPasswordSuccess,
  userSuccess,
  userTenantSuccess,
} from "../Reducer/UserReducer";

export const uploadAvatar = (info) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post("/user/upload/avatar", info);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const updateUserDets = (id, info) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post(`/user/update/profile/${id}`, info);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const uploadListingProperty = (info) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post("/user/add/listing", info);
    dispatch(userListingSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const deleteListingProperty = (id) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/delete/listing/${id}`);
    dispatch(userListingSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const getMatchesListing = (id) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/get/matches/listing/${id}`);
    // dispatch(userListingSuccess(data));
    dispatch(userMatchesSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const deleteListingTenant = (id) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/delete/tenant/${id}`);
    console.log(data, 632);

    dispatch(userSuccess(data));
    // dispatch(getUserTenant())
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const updateListingProperty = (id, info) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post(`/user/update/listing/${id}`, info);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const uploadRequirement = (info) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post("/user/add/tenant", info);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

// TENANT UPDATE LISTING

export const updateTenantListing = (id, info) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post(`/user/update/tenant/${id}`, info);
    dispatch(userTenantSuccess(data));
    // dispatch(getUserTenant())
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const getUserListing = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get("/user/user/listing");
    dispatch(userListingSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const getUserTenant = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get("/user/user/tenant");
    dispatch(userTenantSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const getAllNotification = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get("/user/all/notification");
    dispatch(userNotificationSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const seenAllNotification = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get("/user/seen/notification");
    dispatch(userNotificationSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const removeNotification = (id) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/remove/notification/${id}`);
    dispatch(removeNotificationSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const getAllMatches = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get("/user/get/matches");
    dispatch(userMatchesSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const allChats = (userId, otherUserId) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/chat/${userId}/${otherUserId}`);
    dispatch(userMessagesSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const getallUserChats = (userId, otherUserId) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/get/user/chat`);
    // console.log(data,345);

    dispatch(userChatDetsSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const deleteUserChat = (id) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/delete/chat/${id}`);
    // console.log(data,345);

    dispatch(userMessagesDeleteSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const assignPlan = (dets) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post(`/user/assign/plan`, dets);
    // console.log(data,345);

    dispatch(userAssignPlanSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const reportListing = (id, dets) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.post(`/user/reportng/${id}`, dets);
    // console.log(data,345);

    dispatch(userReportingSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const getRefundRequest = () => async (dispatch) => {
  dispatch(userRequest());

  try {
    const { data } = await axios.get("/user/refund");
    dispatch(refundSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const paymentSuccessfull = (dets) => async (dispatch) => {
  dispatch(userRequest());

  try {
    const { data } = await axios.post("/user/save-payment", dets);
    // dispatch(refundSuccess(data));'
    dispatch(userSuccess());
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const resetPassword = (dets) => async (dispatch) => {
  dispatch(userRequest());

  try {
    const { data } = await axios.post("/user/reset/password", dets);
    // dispatch(refundSuccess(data));
    dispatch(userResetPasswordSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};
export const requestRefundInProcess = (dets) => async (dispatch) => {
  dispatch(userRequest());

  try {
    const { data } = await axios.post("/user/request/refund", dets);
    // dispatch(refundSuccess(data));
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const increaseViewsListing = (id) => async (dispatch) => {
  dispatch(userRequest());

  try {
    const { data } = await axios.get(`/user/listing/views/${id} `);
    // dispatch(refundSuccess(data));
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const increaseViewsPg = (id) => async (dispatch) => {
  dispatch(userRequest());

  try {
    const { data } = await axios.get(`/user/pg/views/${id}`);
    // dispatch(refundSuccess(data));
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const getTeamDetails = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get("/user/team/dets");
    dispatch(getTeamDetailsSuccess(data));

  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const loginWithNumber = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get("/user/team/dets");
    dispatch(getTeamDetailsSuccess(data));

  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};

export const getLocationSearch = (location) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const { data } = await axios.get(`/user/get/location/listing/${location}`);
    // dispatch(getTeamDetailsSuccess(data));

  } catch (error) {
    dispatch(userFail(error.response.data));
  }
};