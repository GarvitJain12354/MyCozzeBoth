import React from "react";
import icon from "../../src/assets/icon.jpg";
import icon2 from "../../src/assets/icon2.jpg";

const SuccessfullyListed = ({ handleCloseModal }) => {
  return (
    <div className="flex bg-white p-4 flex-col items-center justify-center px-20  ">
      <div>
        <img src={icon} width={50} alt="" />
      </div>
      <div className="flex flex-col items-center text-center mb-6  ">
        {/* Checkmark Icon */}
        <div className=" mb-2"></div>
        <div className="flex flex-col justify-center items-center w-[25rem]">
          <h1 className="text-xl font-bold text-black">Successfully Listed</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            We've received your listing and are processing it. It should be
            available online shortly.
          </p>
        </div>
      </div>

      {/* Notification Bell Icon and Text */}
      <div className="flex items-center mt-5 mb-10 w-[25rem]">
        <div className="">
          <img src={icon2} width={80} height={80} alt="" />
        </div>
        <p className="text-gray-600  text-sm text-center">
          For real-time updates on leads and chat conversations, enable
          notifications.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-full"
          onClick={handleCloseModal}
        >
          Yes, Allow Notifications
        </button>
        <button
          className="border-2 border-red-500 text-red-500 px-6 py-2 rounded-full"
          onClick={handleCloseModal}
        >
          No, Don't Allow Notifications
        </button>
      </div>
    </div>
  );
};

export default SuccessfullyListed;
