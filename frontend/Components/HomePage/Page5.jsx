import React from "react";

const Page5 = () => {
  return (
    <div className="w-full relative h-fit py-[10vh] flex px-20 items-center gap-10">
      <img src="/home.png" className="w-[50%] h-full object-contain" alt="" />
      <div className="flex flex-col">
        <h1 className="text-5xl red">Discover Ideal Location</h1>
        <h3 className="text-2xl  lightF mt-2">With the search feature</h3>
        <p className="mt-10 lightF text-xl">
          The journey commences with a straightforward quest. On FlatMate.in,
          you possess the authority to search into your favored location and
          unearth the listings that align with your requirements. Whether you're
          in pursuit of a room, a flat, or looking for a flatmates to share your
          space, our user-friendly exploration feature empowers you to filter
          your options based on your preferences, budget, and geographical
          preference.
        </p>
      </div>
      <div className="absolute w-full h-[1px] bg-[#BC2C3D33] bottom-5 left-0">
        <button className="p-4 bgRed px-10 py-2 w-fit rounded-full text-white text-xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          Know More <i className="ri-arrow-right-double-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default Page5;
