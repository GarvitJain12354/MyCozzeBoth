import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";
import { NavLink } from "react-router-dom";

const UserDets = ({ showDrawer, data, showModal, user }) => {
  console.log(user, "avatar");

  return (
    <div className="flex max-md:flex-col gap-4">
      <div className="h-32 w-28 relative overflow-hidden rounded-2xl">
        <img
          src={`${data?.avatar?.url}`}
          className="h-full w-full object-cover"
          alt="Profile Image"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl flex items-center gap-2 font-semibold">
          {data?.firstname} {data?.lastname}
          <img src="/tick.png" className="object-contain" alt="" />
        </h1>
        <h3 className="bg-[#6f6f6f38] text-sm w-fit text-black p-2 rounded-full">
          1.3 Km from your search
        </h3>
        <div className="flex items-center gap-3">
          {user?.currentPlan ? (
            <div
              onClick={showModal}
              className="flex cursor-pointer bg-primary text-white items-center font-semibold text-lg px-4 py-1 rounded-lg gap-2"
            >
              <Icon icon="ph:phone-light" style={{ color: "white" }} />
              <h3>Call</h3>
            </div>
          ) : (
            <NavLink
              to={"/plans"}
              className="flex cursor-pointer bg-primary text-white items-center font-semibold text-lg px-4 py-1 rounded-lg gap-2"
            >
              <Icon icon="ph:phone-light" style={{ color: "white" }} />
              <h3>Call</h3>
            </NavLink>
          )}

          {user?.currentPlan ? (
            <div
              onClick={showDrawer}
              className="flex cursor-pointer bg-primary text-white items-center font-semibold text-lg px-4 py-1 rounded-lg gap-2"
            >
              <Icon
                icon="bx:message-square-detail"
                style={{ color: "white" }}
              />
              <h3>Message</h3>
            </div>
          ) : (
            <NavLink
              to={"/plans"}
              className="flex cursor-pointer bg-primary text-white items-center font-semibold text-lg px-4 py-1 rounded-lg gap-2"
            >
              <Icon
                icon="bx:message-square-detail"
                style={{ color: "white" }}
              />
              <h3>Message</h3>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDets;
