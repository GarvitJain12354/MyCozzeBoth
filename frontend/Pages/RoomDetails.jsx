import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import CardSwiper from "../Components/CardSwiper";
import PrefrenceCard from "../Components/PrefrenceCard";
import PremiumPoster from "../Components/Premium/PremiumPoster";
import PremiumPosterDets from "../Components/Premium/PremiumPosterDets";
import UserDets from "../Components/Details/UserDets";
import Amenities from "../Components/Details/Amenities";
import DescriptionDets from "../Components/Details/DescriptionDets";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingId, getAllPlans, getPgId } from "../store/Action/Others";
import { useParams } from "react-router-dom";
import { increaseViewsPg } from "../store/Action/User";
import { isUser } from "../store/Action/Auth";
import { Modal } from "antd";

const RoomDetails = () => {
  const { id } = useParams();
  const { pgDets } = useSelector((state) => state.Others);
  const { user } = useSelector((state) => state.Auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { plan } = useSelector((state) => state.Others);
  const { list, loading } = useSelector((state) => state.Others);
  const { message, error } = useSelector((state) => state.User);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const data = [
    {
      image: [
        { img: "/roomL.png" },
        { img: "/roomL.png" },
        { img: "/roomL.png" },
        { img: "/roomL.png" },
        { img: "/roomL.png" },
      ],
    },
    {
      image: [
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
      ],
    },
    {
      image: [
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
      ],
    },
    {
      image: [
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
      ],
    },
    {
      image: [],
    },
    {
      image: [],
    },
  ];
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPgId(id));
    dispatch(isUser());
    dispatch(increaseViewsPg(id));
    dispatch(getAllListingId(id));
    dispatch(getAllPlans());
  }, []);

  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full min-h-screen  translate-y-20 p-5 px-[10vw] pb-20">
        <UserDets
          showModal={showModal}
          showDrawer={showDrawer}
          data={pgDets?.owner}
          user={user}
        />

        <h1 className="font-semibold text-3xl mt-8">{pgDets?.pgName}</h1>
        <h3>
          PG for <span className="text-primary">Boys & Girls</span> | For{" "}
          <span className="text-primary">Students & Professionals</span>
        </h3>
        <h3 className="text-base">
          <i className="ri-map-pin-line pr-2"></i>
          {pgDets?.location}
        </h3>
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="font-semibold text-4xl">Basic Info</h1>
          <div className="grid grid-cols-4 gap-2">
            {pgDets?.rent?.single && (
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                <h3>{pgDets?.rent?.single && "Single Sharing"}</h3>
                <h1 className="font-semibold text-4xl">
                  ₹ {pgDets?.rent?.single}
                </h1>
              </div>
            )}

            {pgDets?.rent?.double && (
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                <h3>{pgDets?.rent?.double && "Double Sharing"}</h3>
                <h1 className="font-semibold text-4xl">
                  ₹ {pgDets?.rent?.double}
                </h1>
              </div>
            )}

            {pgDets?.rent?.triple && (
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                <h3>{pgDets?.rent?.double && "Triple Sharing"}</h3>
                <h1 className="font-semibold text-4xl">
                  ₹ {pgDets?.rent?.triple}
                </h1>
              </div>
            )}

            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
              <h3>Deposit</h3>
              <h1 className="font-semibold text-4xl flex items-center gap-3">
                <img src="/deposit.svg" className="h-10" alt="" /> 1 Month
              </h1>
            </div>
            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
              <h3>Electricity</h3>
              <h1 className="font-semibold text-3xl flex items-center gap-3">
                {" "}
                {pgDets?.elecricityCharges !== 0
                  ? "₹" + " " + pgDets?.elecricityCharges
                  : "Included In Rent"}
              </h1>
            </div>
            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
              <h3>Notice</h3>
              <h1 className="font-semibold text-3xl flex items-center gap-3">
                <img src="/white.svg" className="h-10" alt="" />{" "}
                {pgDets?.noticePeriod}
              </h1>
            </div>
            <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
              <h3>Maintenance Charge</h3>
              <h1 className="font-semibold text-3xl flex items-center gap-3">
                {pgDets?.elecricityCharges}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 relative rounded-2xl overflow-hidden h-[50vh]">
          <CardSwiper type={"dets"} img={pgDets?.images} index={1} />
        </div>
        <Amenities heading={"Amenities"} data={pgDets?.amenities} />
        <DescriptionDets
          showDrawer={showDrawer}
          list={list} 
          loading={loading}
          openDrawer={open}
          onClose={onClose}
        />
        <PremiumPosterDets />
        <Modal
          centered
          open={isModalOpen}
          onOk={handleOk}
          footer={""}
          onCancel={handleCancel}
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">
              {pgDets?.owner?.firstname} {pgDets?.owner?.lastname}{" "}
            </h1>
            <h1 className="text-base text-gray-400 font-semibold">
              <i className="ri-map-pin-2-line text-sm "></i> {pgDets?.city}{" "}
              {pgDets?.location}{" "}
            </h1>
            <h1 className="text-lg font-semibold">
              <span className="text-primary">Mobile Number :</span>
              &nbsp; +91 {pgDets?.owner?.contact}
            </h1>
            <button className="bg-primary py-2 rounded-md flex items-center text-lg justify-center text-white w-fit px-6">
              Call Now
            </button>
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default RoomDetails;
