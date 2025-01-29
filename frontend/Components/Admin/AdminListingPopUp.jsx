import React, { useEffect } from "react";
// import NavBar from "../Components/NavBar";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
// import CardSwiper from "./Components/CardSwiper";
import PrefrenceCard from "../PrefrenceCard";
import PremiumPoster from "../Premium/PremiumPoster";
import PremiumPosterDets from "../Premium/PremiumPosterDets";
import UserDets from "../Details/UserDets";
import Amenities from "../Details/Amenities";
import DescriptionDets from "../Details/DescriptionDets";
import { useDispatch, useSelector } from "react-redux";
// import { getAllListingId } from "../store/Action/Others";
import { useParams } from "react-router-dom";
import CardSwiper from "../CardSwiper";

const AdminListingPopUp = ({ list, setselectedList }) => {
  //   const { id } = useParams();

  //   const { list } = useSelector((state) => state.Others);

  const info = [
    {
      type: "Gender",
      name: list?.user?.gender,
      icon: "mynaui:male",
    },
    {
      type: "Approx Rent",
      name: list?.approxRent,
      icon: "mynaui:rupee-solid",
    },
    {
      type: "Occupancy",
      name: list?.occupancy,
      icon: "fa-solid:user",
    },
    {
      type: "Looking for",
      name: list?.gender,
      icon: "mynaui:male",
    },
  ];

  const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getAllListingId(id));
  //   }, []);
  return (
    <div className="w-full relative overflow-y-auto">
      {/* <NavBar /> */}
      <i className="ri-arrow-left-line absolute top-10 left-10 text-3xl cursor-pointer" onClick={()=>setselectedList("")}></i>
      <div className="w-full min-h-screen   translate-y-20 p-5 px-[10vw] pb-20">
        <UserDets data={list?.user} />
        <h1 className="font-semibold text-2xl max-md:text-xl mt-8">Location</h1>
        <h3 className="text-base">
          <i className="ri-map-pin-line pr-2"></i>
          {list?.location}
        </h3>
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="font-semibold text-2xl max-md:text-xl">Basic Info</h1>
          <div className="grid grid-cols-4 max-md:grid-cols-1  gap-2">
            {info?.map((i, index) => (
              <div
                key={index}
                className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center"
              >
                <h3>{i?.type}</h3>
                <h1 className="font-semibold text-2xl max-md:text-xl">
                  <Icon icon={`${i?.icon}`} style={{ color: "white" }} />

                  {i?.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-6 relative rounded-2xl overflow-hidden h-[50vh]">
          <CardSwiper type={"dets"} img={list?.images} index={1} />
        </div>
        <Amenities heading={"Prefrences"} data={list?.user?.prefrence} />
        {list?.highlights && (
          <div className="flex flex-col  mt-6 gap-4">
            <h1 className="font-semibold text-4xl">Highlights</h1>

            <div className="flex flex-wrap gap-4">
              {list?.highlights?.map((i, index) => (
                <h1
                  key={index}
                  className="cursor-pointer bg-[#bc2c3d2f] px-6 border-[1px] border-primary text-primary py-1 rounded-xl"
                >
                  {i}
                </h1>
              ))}
            </div>
          </div>
        )}
        {/* <div className="w-full flex flex-col gap-2 mt-6">
          <h1 className="font-semibold text-4xl">Description</h1>
          <div className="flex flex-wrap gap-4">
            <p className="text-lg blur-sm pointer-events-none select-none">
              {list?.description}
            </p>
          </div>
        </div> */}
        {/* <DescriptionDets /> */}
        {/* <PremiumPosterDets /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminListingPopUp;
