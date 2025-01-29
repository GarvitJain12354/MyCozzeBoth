import React from "react";
import { NavLink } from "react-router-dom";

const PremiumPosterDets = ({ data, type }) => {
  return (
    <div className="w-full  mt-6 bg-[#aebcc310] flex flex-col gap-3 border-2 p-4 rounded-xl">
      <h1 className="text-lg md:text-2xl font-semibold">Be a premium member</h1>
      <h3 className="text-sm md:text-base">
        To connect with users you will need a subscription plan
      </h3>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mt-2">
        {data?.map(
          (i, index) =>
            i.type === type && (
              <NavLink to={"/plans"} className="h-[25vh] cursor-pointer md:h-[30vh] w-full rounded-xl flex flex-col text-white items-center justify-center gap-2 md:gap-4 customBg">
                <h1 className="text-xl md:text-2xl font-[100]">{i?.planName}</h1>
                <h1 className="text-4xl md:text-5xl font-semibold">
                  ₹ {i?.price}{" "}
                  <span className="text-lg md:text-xl font-light">
                    / {i.days} Days
                  </span>
                </h1>
                <button className="bg-white w-fit py-1 md:py-2 px-6 md:px-8 text-primary text-xl md:text-2xl rounded-md mt-4 mx-auto">
                  View Plan <i className="ri-arrow-right-s-line"></i>
                </button>
              </NavLink>
            )
        )}

        {/* <div className="h-[25vh] md:h-[30vh] w-full rounded-xl flex flex-col text-white items-center justify-center gap-2 md:gap-4 customBg">
          <h1 className="text-xl md:text-2xl font-[100]">Quarterly Plan</h1>
          <h1 className="text-4xl md:text-5xl text-center font-semibold">
            ₹ 1,999{" "}
            <span className="text-lg md:text-xl font-light">/ 3 months</span>
          </h1>
          <h4 className="font-medium text-xs md:text-sm">
            flat hunting supported by a dedicated person
          </h4>
          <button className="bg-white w-fit py-1 md:py-2 px-6 md:px-8 text-primary text-xl md:text-2xl rounded-md mt-4 mx-auto">
            View Plan <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        <div className="h-[25vh] md:h-[30vh] w-full rounded-xl flex flex-col text-white items-center justify-center gap-2 md:gap-4 customBg">
          <h1 className="text-xl md:text-2xl font-[100]">Half Yearly Plan</h1>
          <h1 className="text-4xl md:text-5xl text-center font-semibold">
            ₹ 3,499{" "}
            <span className="text-lg md:text-xl font-light">/ 6 months</span>
          </h1>
          <h4 className="font-medium text-xs md:text-sm">
            flat hunting supported by a dedicated person
          </h4>
          <button className="bg-white w-fit py-1 md:py-2 px-6 md:px-8 text-primary text-xl md:text-2xl rounded-md mt-4 mx-auto">
            View Plan <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        <div className="h-[25vh] md:h-[30vh] w-full rounded-xl flex flex-col text-white items-center justify-center gap-2 md:gap-4 customBg">
          <h1 className="text-xl md:text-2xl font-[100]">Yearly Plan</h1>
          <h1 className="text-4xl md:text-5xl text-center font-semibold">
            ₹ 6,999{" "}
            <span className="text-lg md:text-xl font-light">/ 12 months</span>
          </h1>
          <button className="bg-white w-fit py-1 md:py-2 px-6 md:px-8 text-primary text-xl md:text-2xl rounded-md mt-4 mx-auto">
            View Plan <i className="ri-arrow-right-s-line"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PremiumPosterDets;
