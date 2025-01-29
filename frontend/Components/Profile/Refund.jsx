import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRefundRequest,
  requestRefundInProcess,
} from "../../store/Action/User";
import Loading from "../Loading";
import { toast } from "react-toastify";
import {
  clearErrorUser,
  clearMessageUser,
} from "../../store/Reducer/UserReducer";
import moment from "moment";

const Refund = () => {
  const dispatch = useDispatch();
  const { refund, loading, message, error } = useSelector(
    (state) => state.User
  );
  useEffect(() => {
    dispatch(getRefundRequest());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getRefundRequest());

      dispatch(clearMessageUser());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorUser());
    }
  }, [message, error]);
  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm a");
  };
  const handleInProcess = (dets) => {
    dispatch(requestRefundInProcess(dets));
  };
  return (
    <>
      <h1 className="text-2xl max-md:text-xl mb-2 font-semibold">
        Request Refund
      </h1>
      <Divider className="w-[92%] max-md:w-full" />
      {loading ? (
        <Loading />
      ) : !refund || refund.length === 0 ? (
        <div className="w-full  flex flex-col h-full lightF items-center justify-center">
          <h1 className="text-4xl max-md:text-2xl text-center lightF">You haven’t any active plan yet!</h1>
        </div>
      ) : (
        <div className="w-[92%] max-md:w-full flex flex-col h-full lightF items-center justify-start  py-4 relative overflow-y-auto ">
          {refund?.map((user, index) => (
            <div className="customBg text-white rounded-lg  md:text-2xl w-full p-10  ">
              <div className=" flex md:flex max-md:flex text-2xl justify-between items-center">
                <h1>My Plan</h1>
                {/* <h1 className="">My Cozee</h1> */}
                {user?.refundStatus === "Request" ? (
                  <button
                    onClick={() => handleInProcess(user)}
                    className="border-2 p-2 text-xl max-md:p-2 rounded-lg max-md:text-sm "
                  >
                    {user?.refundStatus}
                  </button>
                ) : (
                  <button className="border-2 p-2 text-xl max-md:p-2 rounded-lg max-md:text-sm ">
                    {user?.refundStatus}
                  </button>
                )}
              </div>
              <div className=" max-md:flex-col flex gap-10 mt-10 ">
                <div className="flex-col">
                  <h3>{user?.planId?.planName}</h3>
                  <h4 className="font-extralight text-xl mont">
                    {" "}
                    {user?.planId?.days} Days
                  </h4>
                </div>
                <div className="flex-col text-2xl ">
                  <h3>Purchased on</h3>
                  {user?.startDate ? (
                    <h4 className="font-extralight text-xl mont">
                      {user?.startDate ? formatDate(user.startDate) : "N/A"}
                    </h4>
                  ) : (
                    <h3>---</h3>
                  )}
                </div>
                <div className="flex-col text-2xl ">
                  <h3>Expired on</h3>
                  {user?.expiryDate ? (
                    <h4 className="font-extralight text-xl mont">
                      {user?.expiryDate ? formatDate(user.expiryDate) : "N/A"}
                    </h4>
                  ) : (
                    <h3>---</h3>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Refund;
