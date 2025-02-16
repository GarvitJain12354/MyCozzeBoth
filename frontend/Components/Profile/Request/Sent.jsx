import React, { useEffect } from "react";
import { getTeamSentRequest } from "../../../store/Action/User";
import { useDispatch, useSelector } from "react-redux";

const Sent = () => {
  const { sent } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeamSentRequest());
  }, []);

  return (
    <>
      {sent?.length > 0 ? (
        <div className="mx-auto flex w-1/2 flex-col">
          {sent?.map((i, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-2"
            >
              <div className="flex items-center justify-center gap-2">
                <img
                  src={`${i?.avatar?.url}`}
                  className="h-10 w-10 rounded-full border-2 "
                  alt=""
                />
                <h1>
                  {i?.firstname} {i?.lastname}
                </h1>
              </div>
              <button
                // onClick={() => handleSendRequest(i?.user._id)}
                className="bg-primary p-2 px-3 cursor-not-allowed rounded-xl text-white font-semibold "
              >
                Request Pending
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
          <img
            src="/sent.png"
            className="object-contain h-[40vh] sm:h-[50vh] w-full max-w-[400px] lg:max-w-none"
            alt="No Sent Requests"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-primary font-semibold text-center">
            No Pending Request
          </h1>
          <h3 className="w-full sm:w-[70%] lg:w-[40%] text-center font-[gilroy] font-extralight text-lg sm:text-xl">
            No sent request is pending for team up, Create a team now!
          </h3>
        </div>
      )}
    </>
  );
};

export default Sent;
