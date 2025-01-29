// import React, { useEffect } from "react";
// import NavBar from "../Components/NavBar";
// import { Icon } from "@iconify-icon/react/dist/iconify.js";
// import CardSwiper from "../Components/CardSwiper";
// import PrefrenceCard from "../Components/PrefrenceCard";
// import PremiumPoster from "../Components/Premium/PremiumPoster";
// import PremiumPosterDets from "../Components/Premium/PremiumPosterDets";
// import UserDets from "../Components/Details/UserDets";
// import Amenities from "../Components/Details/Amenities";
// import DescriptionDets from "../Components/Details/DescriptionDets";
// import Footer from "../Components/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllListingId } from "../store/Action/Others";
// import { useParams } from "react-router-dom";

// const UserDetail = () => {
//   const { id } = useParams();

//   const { userDets } = useSelector((state) => state.Others);

//   const info = [
//     {
//       type: "Gender",
//       name: userDets?.user?.gender,
//       icon: "mynaui:male",
//     },
//     {
//       type: "Approx Rent",
//       name: userDets?.approxRent,
//       icon: "mynaui:rupee-solid",
//     },
//     {
//       type: "Occupancy",
//       name: userDets?.occupancy,
//       icon: "fa-solid:user",
//     },
//     {
//       type: "Looking for",
//       name: userDets?.gender,
//       icon: "mynaui:male",
//     },
//   ];
//   const data = [
//     {
//       image: [
//         { img: "/roomL.png" },
//         { img: "/roomL.png" },
//         { img: "/roomL.png" },
//         { img: "/roomL.png" },
//         { img: "/roomL.png" },
//       ],
//     },
//     {
//       image: [
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//       ],
//     },
//     {
//       image: [
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//       ],
//     },
//     {
//       image: [
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//         { img: "/room.png" },
//       ],
//     },
//     {
//       image: [],
//     },
//     {
//       image: [],
//     },
//   ];

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllListingId(id));
//   }, []);
//   return (
//     <div className="w-full">
//       <NavBar />
//       <div className="w-full min-h-screen  translate-y-20 p-5 px-[10vw] pb-20">
//         <UserDets data={userDets?.user} />
//         <h1 className="font-semibold text-3xl mt-8">Location</h1>
//         <h3 className="text-base">
//           <i className="ri-map-pin-line pr-2"></i>
//           {userDets?.location}
//         </h3>
//         <div className="flex flex-col gap-4 mt-6">
//           <h1 className="font-semibold text-4xl">Basic Info</h1>
//           <div className="grid grid-cols-4 gap-2">
//             {info?.map((i, index) => (
//               <div
//                 key={index}
//                 className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center"
//               >
//                 <h3>{i?.type}</h3>
//                 <h1 className="font-semibold text-4xl flex items-center gap-2 justify-center w-fit">
//                   <Icon icon={`${i?.icon}`} style={{ color: "white" }} />

//                   {i?.name}
//                 </h1>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full mt-6 relative rounded-2xl overflow-hidden h-[50vh]">
//           <CardSwiper type={"dets"} img={userDets?.images} index={1} />
//         </div>
//         <Amenities heading={"Prefrences"} data={userDets?.user?.prefrence} />
//         {userDets?.highlights && (
//           <div className="flex flex-col  mt-6 gap-4">
//             <h1 className="font-semibold text-4xl">Highlights</h1>

//             <div className="flex flex-wrap gap-4">
//               {
//                 userDets?.highlights?.map((i,index)=>(
//                   <h1 key={index} className="cursor-pointer bg-[#bc2c3d2f] px-6 border-[1px] border-primary text-primary py-1 rounded-xl">
//                   {i}
//                 </h1>
//                 ))
//               }

//             </div>
//           </div>
//         )}

//         <DescriptionDets />
//         <PremiumPosterDets />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserDetail;
import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import CardSwiper from "../Components/CardSwiper";
import UserDets from "../Components/Details/UserDets";
import Amenities from "../Components/Details/Amenities";
import DescriptionDets from "../Components/Details/DescriptionDets";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListingId,
  getAllPlans,
  getUserById,
} from "../store/Action/Others";
import { useParams } from "react-router-dom";
import PremiumPosterDets from "../Components/Premium/PremiumPosterDets";
import Loading from "../Components/Loading";
import { Modal } from "antd";
import Chat from "../Components/Chat/Chat";
import { isUser } from "../store/Action/Auth";
import ChatDrawer from "../Components/Chat/ChatDrawer";

const UserDetail = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.Auth);
  const { plan } = useSelector((state) => state.Others);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { userDets, loading } = useSelector((state) => state.Others);

  const info = [
    {
      type: "Gender",
      name: userDets?.user?.gender,
      icon: "mynaui:male",
    },
    {
      type: "Approx Rent",
      name: userDets?.approxRent,
      icon: "mynaui:rupee-solid",
    },
    {
      type: "Occupancy",
      name: userDets?.occupancy,
      icon: "fa-solid:user",
    },
    {
      type: "Looking for",
      name: userDets?.gender,
      icon: "mynaui:male",
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
    dispatch(getUserById(id));
    dispatch(isUser());
    dispatch(getAllPlans());
  }, []);
  // if (loading) {
  //   return <Loading />;
  // }
  console.log(userDets, "new");

  return (
    <div className="w-full">
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full min-h-screen pt-32 px-4 md:px-[10vw] pb-20">
          <UserDets
            showDrawer={showDrawer}
            showModal={showModal}
            user={user}
            data={userDets}
          />

          <div className="mt-8">
            <h1 className="font-semibold text-2xl md:text-3xl">Location</h1>
            <h3 className="text-base flex items-center">
              <i className="ri-map-pin-line pr-2"></i>
              {userDets?.city}
            </h3>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <h1 className="font-semibold text-3xl md:text-4xl">Basic Info</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="w-full h-[15vh] bg-primary text-white p-4 rounded-xl text-lg md:text-xl flex flex-col justify-center items-center">
                <h3>Gender</h3>
                <h1 className="font-semibold text-2xl md:text-4xl flex items-center gap-2 justify-center">
                  {/* <Icon style={{ color: "white" }} /> */}
                  {userDets?.gender}
                </h1>
              </div>
              {/* {info?.map((i, index) => (
                <div
                  key={index}
                  className="w-full h-[15vh] bg-primary text-white p-4 rounded-xl text-lg md:text-xl flex flex-col justify-center items-center"
                >
                  <h3>{i?.type}</h3>
                  <h1 className="font-semibold text-2xl md:text-4xl flex items-center gap-2 justify-center">
                    <Icon icon={`${i?.icon}`} style={{ color: "white" }} />
                    {i?.name}
                  </h1>
                </div>
              ))} */}
            </div>
          </div>

          <div className=" ">
            <Amenities heading={"Preferences"} data={userDets?.prefrence} />
          </div>

          {userDets?.highlights && (
            <div className="flex flex-col mt-6 gap-4">
              <h1 className="font-semibold text-3xl md:text-4xl">Highlights</h1>
              <div className="flex flex-wrap gap-4">
                {userDets?.highlights?.map((i, index) => (
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
          {userDets?.description && (
            <DescriptionDets user={user} data={userDets?.description} />
          )}
          {user?.role === "owner" && (
            <PremiumPosterDets data={plan} type={"PG"}></PremiumPosterDets>
          )}
          {user?.role === "flat" && (
            <PremiumPosterDets data={plan} type={"Flat"}></PremiumPosterDets>
          )}
          {user?.role === "flatemate" && (
            <PremiumPosterDets
              data={plan}
              type={"Roommate"}
            ></PremiumPosterDets>
          )}
          {/* <PremiumPosterDets /> */}
          {userDets?.user?._id !== "" && !loading && (
            <>
              <ChatDrawer
                showDrawer={showDrawer}
                open={open}
                onClose={onClose}
                userId={user?._id}
                otherUserId={userDets?.user?._id}
              />
              {/* <Chat /> */}
            </>
          )}
        </div>
      )}
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        footer={""}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">
            {userDets?.user?.firstname}{" "}
          </h1>
          <h1 className="text-base text-gray-400 font-semibold">
            <i className="ri-map-pin-2-line text-sm "></i> {userDets?.city}{" "}
            {userDets?.location}{" "}
          </h1>
          <h1 className="text-lg font-semibold">
            <span className="text-primary">Mobile Number :</span>
            &nbsp; +91 {userDets?.user?.contact}
          </h1>
          <button className="bg-primary py-2 rounded-md flex items-center text-lg justify-center text-white w-fit px-6">
            Call Now
          </button>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default UserDetail;
