import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useEffect } from "react";
import CardSwiper from "./CardSwiper";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "../store/Action/Auth";

const Card = ({ data, index, listing, showModal, match, user, type }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.Auth);
  // console.log(data?.owner);

  // useEffect(() => {
  //   dispatch(isUser());
  // }, []);
  // useEffect(() => {

  // }, [isAuthenticated,dispatch])
  // console.log(match, 789);
  // console.log(data, listing, 596);
  console.log(data, user, listing, type, 1234);

  return isAuthenticated ? (
    user ? (
      <NavLink
        to={`/userdetail/${data?.user?._id}`}
        className="h-fit border-2 w-full md:w-[45vw] lg:w-[25vw] rounded-2xl overflow-hidden relative flex flex-col cursor-pointer"
      >
        {match && user && (
          <div className="w-40 z-40 h-8 rounded-br-xl text-xs flex items-center justify-center gap-1 text-white customBg absolute top-0 left-0">
            <img src="/match.png" className="h-5 w-5 object-contain" alt="" />{" "}
            <h1>{data?.matchPercentage} % Compatible</h1>
          </div>
        )}
        <div className="flex items-center gap-2 ">
          {/* <div className="h-10 w-10  rounded-full relative bg-red-500 overflow-hidden">
            <img
              // src={`${data?.user?.avatar?.url}`}
              src={`${
                listing ? data?.user?.avatar?.url : data?.owner?.avatar?.url
              }`}
              className="h-full w-full object-cover"
              alt=""
            />
          </div> */}
          <div className="w-full h-[28vh] bg-red-500">
            <img
              src={`${
                listing ? data?.user?.avatar?.url : data?.owner?.avatar?.url
              }`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <h1 className="flex font-semibold text-base gap-2 items-center">
            {data?.user?.firstname} {data?.user?.lastname}{" "}
            <img src="/tick.png" className="object-contain" alt="" />
          </h1>
          <h3 className="bg-[#bc2c3d28] w-fit text-xs text-primary px-2 rounded-full">
            1.3 Km from your search
          </h3>
        </div>

        <div className="flex flex-col p-4 gap-1">
          <h1 className="text-lg md:text-xl font-extrabold">
            ₹ {data?.approxRent}
            <span className="text-xs">/ mo</span>
          </h1>
          <h3 className="text-sm">{data?.location}</h3>
          <h3 className="text-sm">
            {listing ? (
              <>
                Looking for <span className="text-primary">Roommate</span>
              </>
            ) : listing?.isFlat ? (
              <>
                Flat for <span className="text-primary">{listing?.gender}</span>
              </>
            ) : (
              <>
                PG for <span className="text-primary">Any</span>
              </>
            )}
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#bc2c3d28] items-center px-3 py-1 rounded-full gap-2">
              <Icon icon="ph:phone-light" style={{ color: "black" }} />
              <h3 className="text-sm">Call</h3>
            </div>
            <div className="flex bg-[#bc2c3d28] items-center px-3 py-1 rounded-full gap-2">
              <Icon
                icon="bx:message-square-detail"
                style={{ color: "black" }}
              />
              <h3 className="text-sm">Message</h3>
            </div>
          </div>
        </div>
      </NavLink>
    ) : (
      <NavLink
        to={`/${listing ? "roommate" : "room"}/${data?._id}`}
        className="h-fit border-2 w-full md:w-[45vw] lg:w-[25vw] rounded-2xl relative flex flex-col cursor-pointer"
      >
        {match && user && (
          <div className="w-40 z-40 h-8 rounded-bl-xl text-xs flex items-center justify-center gap-1 text-white customBg absolute top-0 right-0">
            <img src="/match.png" className="h-5 w-5 object-contain" alt="" />{" "}
            <h1>{data?.matchPercentage} % Compatible</h1>
          </div>
        )}
        <div className="flex items-center gap-2 p-3">
          <div className="h-10 w-10  rounded-full relative bg-red-500 overflow-hidden">
            <img
              // src={`${data?.user?.avatar?.url}`}
              src={`${
                listing || type === "Flat"
                  ? data?.user?.avatar?.url
                  : data?.owner?.avatar?.url
              }`}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="flex font-semibold text-base gap-2 items-center">
              {listing || type === "Flat" ? (
                <>
                  {data?.user?.firstname} {data?.user?.lastname}
                </>
              ) : (
                <>
                  {data?.owner?.firstname} {data?.owner?.lastname}{" "}
                </>
              )}
              {/* {
                data?.user?.firstname
              } */}
              {/* {data?.owner?.firstname} {data?.owner?.lastname}{" "} */}
              <img src="/tick.png" className="object-contain" alt="" />
            </h1>
            <h3 className="bg-[#bc2c3d28] text-xs text-primary px-2 rounded-full">
              1.3 Km from your search
            </h3>
          </div>
        </div>

        <div className="w-full h-[25vh] md:h-[28vh] relative overflow-hidden">
          {match && (
            <div className="w-40 z-40 h-8 rounded-br-xl text-xs flex items-center justify-center gap-1 text-white customBg absolute top-0 left-0">
              <img src="/match.png" className="h-5 w-5 object-contain" alt="" />{" "}
              <h1>{data?.matchPercentage} % Compatible</h1>
            </div>
          )}

          <CardSwiper img={data?.images} index={index} />
        </div>

        <div className="flex flex-col p-4 gap-1">
          {listing || type === "Flat" ? (
            <h1 className="text-lg md:text-xl font-extrabold">
              ₹ {data?.approxRent}
              <span className="text-xs">/ mo</span>
            </h1>
          ) : (
            <h1 className="text-lg md:text-xl font-extrabold">
              ₹ {data?.rent?.single}
              <span className="text-xs">/ mo</span>
            </h1>
          )}
          <h3 className="text-sm">{data?.location}</h3>
          <h3 className="text-sm">
            {listing && type !== "Flat" ? (
              <>
                Looking for <span className="text-primary">Roommate</span>
              </>
            ) : type === "Flat" ? (
              <>
                Flat for <span className="text-primary">{data?.gender}</span>
              </>
            ) : (
              <>
                PG for <span className="text-primary">{data?.gender}</span>
              </>
            )}
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#bc2c3d28] items-center px-3 py-1 rounded-full gap-2">
              <Icon icon="ph:phone-light" style={{ color: "black" }} />
              <h3 className="text-sm">Call</h3>
            </div>
            <div className="flex bg-[#bc2c3d28] items-center px-3 py-1 rounded-full gap-2">
              <Icon
                icon="bx:message-square-detail"
                style={{ color: "black" }}
              />
              <h3 className="text-sm">Message</h3>
            </div>
          </div>
        </div>
      </NavLink>
    )
  ) : (
    <div
      onClick={showModal}
      className="h-fit border-2 w-full md:w-[45vw] lg:w-[25vw] rounded-2xl flex flex-col cursor-pointer"
    >
      <div className="flex items-center gap-2 p-3">
        <div className="h-10 w-10  rounded-full relative bg-red-500 overflow-hidden">
          <img
            // src={`${data?.user?.avatar?.url}`}
            src={`${
              listing ? data?.user?.avatar?.url : data?.owner?.avatar?.url
            }`}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="flex font-semibold text-base gap-2 items-center">
            {listing || type === "Flat" ? (
              <>
                {data?.user?.firstname} {data?.user?.lastname}
              </>
            ) : (
              <>
                {data?.owner?.firstname} {data?.owner?.lastname}{" "}
              </>
            )}{" "}
            <img src="/tick.png" className="object-contain" alt="" />
          </h1>
          <h3 className="bg-[#bc2c3d28] text-xs text-primary px-2 rounded-full">
            1.3 Km from your search
          </h3>
        </div>
      </div>
      <div className="w-full h-[25vh] md:h-[28vh] relative overflow-hidden">
        <CardSwiper img={data?.images} index={index} />
      </div>
      <div className="flex flex-col p-4 gap-1">
        <h1 className="text-lg md:text-xl font-extrabold">
          {listing ? (
            <h1 className="text-lg md:text-xl font-extrabold">
              ₹ {data?.approxRent}
              <span className="text-xs">/ mo</span>
            </h1>
          ) : (
            <h1 className="text-lg md:text-xl font-extrabold">
              ₹ {data?.rent?.single}
              <span className="text-xs">/ mo</span>
            </h1>
          )}
          {/* <span className="text-xs">/ mo</span> */}
        </h1>
        <h3 className="text-sm">{data?.location}</h3>
        <h3 className="text-sm">
          {listing ? (
            <>
              Looking for <span className="text-primary">Roommate</span>
            </>
          ) : (
            <>
              PG for <span className="text-primary">Any</span>
            </>
          )}
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#bc2c3d28] items-center px-3 py-1 rounded-full gap-2">
            <Icon icon="ph:phone-light" style={{ color: "black" }} />
            <h3 className="text-sm">Call</h3>
          </div>
          <div className="flex bg-[#bc2c3d28] items-center px-3 py-1 rounded-full gap-2">
            <Icon icon="bx:message-square-detail" style={{ color: "black" }} />
            <h3 className="text-sm">Message</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
