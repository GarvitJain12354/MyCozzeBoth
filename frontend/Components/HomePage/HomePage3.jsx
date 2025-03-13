import React from "react";
import { NavLink } from "react-router-dom";

const HomePage3 = () => {
  return (
    <div className="w-full h-screen flex px-[10vw]">
      <div className="w-1/2 h-full flex flex-col justify-center gap-6">
        <h1 className="text-4xl">Geeting Rental Agreement made easy, quick and affordable</h1>
        <p className="text-2xl">Lowest Price Guaranteed!!! Create your rental agreement</p>
        <NavLink
          to="/user/matches"
          className={`bg-primary text-white w-fit flex items-center justify-center py-[0.4rem] max-md:px-2 px-6 md:py-2 gap-1 rounded-xl text-xl  font-semibold`}
        >
          <span className="hidden sm:inline">Create Now</span>
          {/* <Icon icon="mdi:puzzle" style={{ color: "white" }} /> */}
        </NavLink>
      </div>
      <div className="w-1/2 h-full bg-gray-300">
      
      </div>
    </div>
  );
};

export default HomePage3;
