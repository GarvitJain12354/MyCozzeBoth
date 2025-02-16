import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import CardSwiper from "./CardSwiper";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "../store/Action/Auth";
import axios from "axios";

const Card = ({ data, index, listing, showModal, match, user, type }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.Auth);
  // console.log(data?.owner);
  const [distance, setDistance] = useState(null);

  // Get access token for Ola Maps API
  async function getAccessToken() {
    try {
      const response = await axios.post(
        "https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          scope: "openid",
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return response.data.access_token;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  }

  // Function to geocode listing address
  const geocodeAddress = async (address) => {
    if (!address) {
      console.error("No address provided for geocoding.");
      return null;
    }

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("Failed to fetch access token");

      const response = await axios.get(
        "https://api.olamaps.io/places/v1/geocode",
        {
          params: { address },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response.data, 236);

      if (response.data?.geocodingResults?.length > 0) {
        const { lat, lng } =
          response.data.geocodingResults[0].geometry.location;
        return { lat, lng };
      } else {
        console.error("Geocoding failed: No results found.");
        return null;
      }
    } catch (error) {
      console.error(
        "Error geocoding address:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  // Function to calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const userPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const userLat = userPosition.coords.latitude;
        const userLng = userPosition.coords.longitude;

        const listingAddress = data?.location;
        const listingPosition = await geocodeAddress(listingAddress);
        // console.log(listingPosition, 489);

        if (listingPosition) {
          const { lat: listingLat, lng: listingLng } = listingPosition;
          console.log(userLat, userLng, listingLat, listingLng, 489);

          const dist = calculateDistance(
            userLat,
            userLng,
            listingLat,
            listingLng
          );
          // console.log(dist, 456);

          setDistance(dist.toFixed(2)); // Round to 2 decimal places
        }
      } catch (error) {
        console.error("Error calculating distance:", error);
      }
    };

    fetchDistance();
  }, [data]);
  console.log(distance, 456);

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
            {distance} Km from your search
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
              {distance} Km from your search
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
            {distance} Km from your search
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
