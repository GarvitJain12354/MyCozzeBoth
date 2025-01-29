import React, { useEffect } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import CardSwiper from "../CardSwiper";
import PrefrenceCard from "../PrefrenceCard";
import PremiumPoster from "../Premium/PremiumPoster";
import PremiumPosterDets from "../Premium/PremiumPosterDets";
import UserDets from "../Details/UserDets";
import Amenities from "../Details/Amenities";
import DescriptionDets from "../Details/DescriptionDets";
import { useDispatch, useSelector } from "react-redux";
// import { getAllListingId, getPgId } from "../store/Action/Others";
import { useParams } from "react-router-dom";

const AdminRoomPopUp = ({ pgDets, setselectedList }) => {
  //   const { id } = useParams();
  //   const { pgDets } = useSelector((state) => state.Others);
  const rent = [
    {
      type: "Single Sharing",
      rend: "15000",
    },
    {
      type: "Double Sharing",
      rend: "10000",
    },
    {
      type: "Triple Sharing",
      rend: "5000",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getPgId(id));
  }, []);
  console.log(pgDets, 1234);

  return (
    <div className="w-full relative overflow-y-auto">
      {/* <NavBar /> */}
      <i
        className="ri-arrow-left-line absolute top-10 left-10 text-3xl cursor-pointer"
        onClick={() => setselectedList("")}
      ></i>

      <div className="w-full min-h-screen  translate-y-20 p-5 px-[10vw] pb-20">
        <UserDets data={pgDets?.owner} />

        <h1 className="font-semibold text-2xl max-md:text-xl mt-8">{pgDets?.pgName}</h1>
        <h3>
          PG for <span className="text-primary">Boys & Girls</span> | For{" "}
          <span className="text-primary">Students & Professionals</span>
        </h3>
        <h3 className="text-base">
          <i className="ri-map-pin-line pr-2"></i>
          {pgDets?.location}
        </h3>
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="font-semibold text-2xl max-md:text-xl">Basic Info</h1>
          <div className="grid grid-cols-4 max-md:grid-cols-1  gap-2">
            {pgDets?.rent?.single && (
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-lg flex flex-col justify-center-center">
                <h3>{pgDets?.rent?.single && "Single Sharing"}</h3>
                <h1 className="font-semibold text-2xl max-md:text-xl">
                  ₹ {pgDets?.rent?.single}
                </h1>
              </div>
            )}

            {pgDets?.rent?.double && (
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-lg flex flex-col justify-center-center">
                <h3>{pgDets?.rent?.double && "Double Sharing"}</h3>
                <h1 className="font-semibold text-2xl max-md:text-xl">
                  ₹ {pgDets?.rent?.double}
                </h1>
              </div>
            )}

            {pgDets?.rent?.triple && (
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-lg flex flex-col justify-center-center">
                <h3>{pgDets?.rent?.double && "Triple Sharing"}</h3>
                <h1 className="font-semibold text-2xl max-md:text-xl">
                  ₹ {pgDets?.rent?.triple}
                </h1>
              </div>
            )}

            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-lg flex flex-col justify-center-center">
              <h3>Deposit</h3>
              <h1 className="font-semibold text-2xl max-md:text-xl flex items-center gap-3">
                <img src="/deposit.svg" className="h-6" alt="" /> 1 Month
              </h1>
            </div>
            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-lg flex flex-col justify-center-center">
              <h3>Electricity</h3>
              <h1 className="font-semibold text-2xl max-md:2xl flex items-center gap-3">
                {" "}
                {pgDets?.elecricityCharges !== 0
                  ? "₹" + " " + pgDets?.elecricityCharges
                  : "Included In Rent"}
              </h1>
            </div>
            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-lg flex flex-col justify-center-center">
              <h3>Notice</h3>
              <h1 className="font-semibold text-xl max-md:text-2xl flex items-center gap-3">
                <img src="/white.svg" className="h-6 max-md:text-2xl" alt="" />{" "}
                {pgDets?.noticePeriod}
              </h1>
            </div>
            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-lg flex flex-col justify-center-center">
              <h3>Maintenance Charge</h3>
              <h1 className="font-semibold text-xl max-md:text-2xl flex items-center gap-3">
                {pgDets?.elecricityCharges}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 relative rounded-2xl overflow-hidden h-[50vh]">
          <CardSwiper type={"dets"} img={pgDets?.images} index={1} />
        </div>
        <Amenities heading={"Amenities"} data={pgDets?.amenities} />
        <div className="w-full flex flex-col gap-2 mt-6">
          <h1 className="font-semibold text-xl">Description</h1>
          <div
            className="flex flex-wrap gap-4"
            dangerouslySetInnerHTML={{ __html: pgDets?.description }}
          >
            {/* <p className="text-lg"> */}

            {/* </p> */}
          </div>
        </div>
        {/* <PremiumPosterDets /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminRoomPopUp;
