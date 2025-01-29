import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import NotificationCard from "./NotificationCard";
import PremiumPoster from "../Premium/PremiumPoster";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotification,
  seenAllNotification,
} from "../../store/Action/User";
import Loading from "../Loading";
import { toast } from "react-toastify";
import {
  clearErrorUser,
  clearMessageUser,
} from "../../store/Reducer/UserReducer";
import { getAllPlans } from "../../store/Action/Others";

const MyNotification = () => {
  const { notification, loading, message, error } = useSelector(
    (state) => state.User
  );
  const { user } = useSelector((state) => state.Auth);
  const { plan } = useSelector((state) => state.Others);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNotification());
    dispatch(seenAllNotification());
    dispatch(getAllPlans());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllNotification());
      dispatch(clearMessageUser());
    }
    if (error) {
      toast.success(error);
      dispatch(clearErrorUser());
    }
  }, [message, error]);

  return (
    <>
      <h1 className="text-2xl max-md:text-xl mb-2 font-semibold">
        Notifications
      </h1>
      <Divider className="w-[92%] max-md:w-full" />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full gap-5 flex flex-col py-4 justify-start">
          {notification?.length === 0 || !notification ? (
            <div className="h-[50vh] w-full flex items-center justify-center">
              <h1 className="text-3xl max-md:text-xl font-semibold">
                No New Notifications Here
              </h1>
            </div>
          ) : (
            notification?.map((i, index) => (
              <NotificationCard data={i} key={index} />
            ))
          )}
        </div>
      )}
      {user.role === "owner" && <PremiumPoster plan={plan} type={"PG"} />}
      {user.role === "flatemate" && !user?.flateOwner && (
        <PremiumPoster plan={plan} type={"Roommate"} />
      )}
      {user.role === "flatemate" && user?.flateOwner && (
        <PremiumPoster plan={plan} type={"Flat"} />
      )}
    </>
  );
};

export default MyNotification;
