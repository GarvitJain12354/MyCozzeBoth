import React from "react";
import { NavLink } from "react-router-dom";

const PremiumPoster = ({ plan, type }) => {
  return (
    <div className="w-[92%] max-md:w-full bg-[#aebcc310] flex flex-col gap-3 border-2 p-4 rounded-xl ">
      <h1 className="text-2xl font-semibold text-center md:text-3xl">
        Be a premium member
      </h1>
      <h3 className="text-center text-lg">
        To connect with users you will need a subscription plan
      </h3>
      <div className="grid w-full grid-cols-1 gap-8 mt-4 md:grid-cols-2">
        {plan?.map((i, index) => (
          i.type === type &&
          <div className="h-[30vh] w-full rounded-xl flex flex-col text-white items-center justify-center gap-4 customBg p-4">
            <h1 className="text-2xl font-light">{i?.planName}</h1>
            <h1 className="text-5xl font-semibold">
              ₹ {i?.price} <span className="text-xl font-light">/ {i?.days} days</span>
            </h1>
            <NavLink to={"/plans"} className="bg-white w-fit py-2 px-8 text-primary text-2xl rounded-md mt-5 mx-auto">
              View Plan <i className="ri-arrow-right-s-line"></i>
            </NavLink>
          </div>
        ))}

        {/* <div className="h-[30vh] w-full rounded-xl flex flex-col text-white items-center justify-center gap-4 customBg p-4">
          <h1 className="text-2xl font-light">Premium Plan</h1>
          <h1 className="text-4xl max-md:text-2xl text-center font-semibold">
            ₹ 799 <span className="text-xl font-light">/ 1 month</span>
          </h1>
          <h4 className="font-medium text-xs text-center">
            Flat hunting to be supported by a dedicated person
          </h4>
          <button className="bg-white w-fit py-2 px-8 text-primary text-2xl rounded-md mt-5 mx-auto">
            View Plan <i className="ri-arrow-right-s-line"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PremiumPoster;
