import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const ProfileCard = ({ src, name }) => {
  return (
    <div className="max-w-[25rem] mx-auto bg-white rounded-xl border-2 overflow-hidden ">
      {/* Image */}
      <div className="customBg relative  flex  justify-center">
        <div className="w-32 relative top-20 h-32 bg-black rounded-full border-4 border-white">
          <img
            className="rounded-full object-cover w-full h-full"
            src={src}
            // alt="Kunal Goswami"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center px-6 pt-[7rem]  flex justify-center items-center flex-col ">
        <h2 className="text-xl font-semibold  text-red-600 mb-2"> {name}</h2>
        <p className=" text-sm ">
          With a strong background in marketing, operations, and brand
          management at renowned companies like Nestlé and Paytm, Kunal brings a
          wealth of experience to Mycozee. His passion for creating innovative
          solutions drives his vision to make the roommate-finding process
          seamless and hassle-free.
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-2 py-8">
        <div className=" flex justify-center  bg-[#bc2c3d] text-white rounded p-2 cursor-pointer ">
          <Icon icon="ri:linkedin-fill" width={30} />
        </div>
        <div className=" flex justify-center items-center bg-[#bc2c3d] text-white rounded p-2 cursor-pointer">
          <Icon icon="mage:facebook" width={30} />
        </div>
        <div className=" flex justify-center items-center bg-[#bc2c3d] text-white rounded p-2 cursor-pointer">
          <Icon icon="lets-icons:insta" width={30} />
        </div>
        <div className=" flex justify-center items-center bg-[#bc2c3d] text-white rounded p-2 cursor-pointer">
        <i className="ri-twitter-x-line text-2xl w-[30px] text-center" ></i>        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
