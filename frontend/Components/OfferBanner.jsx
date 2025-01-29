import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";

const OfferBanner = ({ user }) => {
  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm a");
  };
  return (
    <>
    <div className="flex flex-col w-[92%] max-md:w-full">
    <div className="customBg text-white rounded-lg md:text-xl w-full p-10 max-md:p-5">
        <div className=" flex md:flex justify-between">
          <h1>My Plan</h1>
          <h1 className="">My Cozee</h1>
        </div>
        <div className=" flex gap-10 mt-20 max-md:flex-wrap max-md:mt-10">
          {!user?.currentPlan ? (
            <div className="flex-col max-md:text-lg max-md:w-full  text-nowrap">
              <h3>No Plan Yet</h3>
              <h3>---</h3>
            </div>
          ) : (
            <div className="flex-col max-md:text-lg max-md:w-full  text-nowrap">
              <h3>{user?.currentPlan?.planName}</h3>
              <h4 className="font-extralight text-xl mont">
                {" "}
                {user?.currentPlan?.days} Days
              </h4>
            </div>
          )}
          <div className="flex-col max-md:text-lg max-md:w-full  text-nowrap ">
            <h3>Purchased on</h3>
            {user?.planPurchaseDate ? (
              <h4 className="font-extralight text-xl mont">
                {user?.planPurchaseDate
                  ? formatDate(user.planPurchaseDate)
                  : "N/A"}
              </h4>
            ) : (
              <h3>---</h3>
            )}
          </div>
          <div className="flex-col ">
            <h3>Expiring on</h3>
            {user?.planExpiryDate ? (
              <h4 className="font-extralight text-xl mont">
                {user?.planExpiryDate ? formatDate(user.planExpiryDate) : "N/A"}
              </h4>
            ) : (
              <h3>---</h3>
            )}
          </div>
        </div>
      </div>
      <NavLink to={"/plans"} className="bg-white w-fit border-primary border-[1px]  text-primary px-10 py-2 rounded-md mt-6 max-md:mt-4">
        View Plans <i className="ri-arrow-right-s-line"></i>
      </NavLink>
    </div>
    </>
  );
};

export default OfferBanner;
