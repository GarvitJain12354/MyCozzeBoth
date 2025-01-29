import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrefrenceCard from "../PrefrenceCard";
import { PrefrenceData } from "../../src/db/PrefrenceData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorUser,
  clearMessageUser,
} from "../../store/Reducer/UserReducer";
import { isUser } from "../../store/Action/Auth";
import { updateUserDets } from "../../store/Action/User";

const MyPrefrence = ({ user }) => {
  const { message, loading, error } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(isUser());
      dispatch(clearMessageUser());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorUser());
    }
  }, [message, error, dispatch, loading]);
  const [selectedPrefrence, setselectedPrefrence] = useState(user?.prefrence || []);
  const handleUpdate = () => {
    const dets = {
        prefrence:selectedPrefrence
    }
    dispatch(updateUserDets(user?._id, dets));
  };
  return (
    <>
      <h1 className="text-2xl mb-2 font-semibold">Your Preferences</h1>
      <h3 className="mb-2">
        It’ll show others what kind of preferences you have! Please select at
        least 5 preferences.
      </h3>
      <Divider className="w-[92%] " />
      <div className="w-[92%] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-10">
        {PrefrenceData?.map((i, index) => (
          <PrefrenceCard
          key={index}
          selectedPrefrence={selectedPrefrence}
          setselectedPrefrence={setselectedPrefrence}
          data={i}
          isInitiallySelected={!!selectedPrefrence.find(
            (pref) => pref.prefrence === i.prefrence
          )}
        />
        ))}

      </div>
      <div className="w-full flex items-center justify-center">

        <button onClick={handleUpdate} className="bg-primary w-fit py-3 px-8 text-white text-xl rounded-md mt-5 mx-auto">
          Update Prefrences <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </>
  );
};

export default MyPrefrence;
