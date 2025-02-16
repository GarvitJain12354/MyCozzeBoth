import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptTeamRequest, getTeamRequest } from "../../../store/Action/User";
import { toast } from "react-toastify";
import { clearMessageUser } from "../../../store/Reducer/UserReducer";
import Loading from "../../Loading";

const Received = () => {
  const { request, loading, message, error } = useSelector(
    (state) => state.User
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeamRequest());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessageUser());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessageUser());
    }
  }, [message, error]);

  const handleAcceptRequest = (id) => {
    dispatch(acceptTeamRequest(id));
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {request?.length > 0 ? (
            <div className="mx-auto flex w-1/2 flex-col">
              {request?.map((i, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border-2"
                >
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={`${i?.admin?.avatar?.url}`}
                      className="h-10 w-10 rounded-full border-2 "
                      alt=""
                    />
                    <h1>
                      {i?.admin?.firstname} {i?.admin?.lastname}
                    </h1>
                  </div>
                  <button
                    onClick={() => handleAcceptRequest(i?._id)}
                    className="bg-primary p-2 px-3 rounded-xl text-white font-semibold "
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex gap-3 flex-col items-center justify-center p-4">
              <img
                src="/received.png"
                className="object-contain h-[30vh] sm:h-[40vh] md:h-[50vh] w-full max-w-xs sm:max-w-md"
                alt="No requests"
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-primary font-semibold text-center">
                No Request found
              </h1>
              <h3 className="w-full sm:w-3/4 md:w-[40%] text-center font-[gilroy] font-extralight text-base sm:text-lg md:text-xl">
                No new request received for team up, You’ll be informed if you
                get any request.
              </h3>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Received;
