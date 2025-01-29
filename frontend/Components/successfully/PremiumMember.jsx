import React from "react";
import { NavLink } from "react-router-dom";

const PremiumMember = ({ plan, type }) => {
  return (
    <div className="w-full mt-6 bg-[#aebcc310] flex flex-col gap-3 border-2 p-4 rounded-xl">
      <h1 className="text-2xl font-semibold">Be a premium member</h1>
      <h3>To connect with users you will need a subscription plan</h3>
      <div className="grid w-full grid-cols-2 gap-8 mt-2">
        {plan?.map(
          (i, index) =>
            i.type === type && (
              <div
                key={index}
                className="h-[30vh] w-full rounded-xl flex flex-col text-white items-center justify-center gap-4 customBg"
              >
                <h1 className="text-2xl font-[100]">{i?.planName}</h1>
                <h1 className="text-5xl font-semibold">
                  ₹ {i?.price}{" "}
                  <span className="text-xl font-light">/ {i?.days} Days</span>
                </h1>
                <NavLink
                  to={"/plans"}
                  className="bg-white w-fit py-2 px-8  text-primary text-2xl rounded-md mt-5 mx-auto"
                >
                  View Plan <i className="ri-arrow-right-s-line"></i>
                </NavLink>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default PremiumMember;
