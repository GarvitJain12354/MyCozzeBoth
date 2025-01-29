import React from "react";

const Testimonials = ({ handleDelete, admin, data, className }) => {
  return (
    <div className="flex w-full justify-center rounded-lg relative  py-10">
      <div
        className={`bg-white  w-full max-md:w-full relative ${className}`}
      >
        {/* Image */}
        {admin && (
          <i
            className="ri-close-circle-fill absolute -top-3 -right-2 z-10 text-3xl text-primary"
            onClick={() => handleDelete(data?._id)}
          ></i>
        )}
        <img
          src={`${data?.image?.url}`}
          alt="profile"
          className="absolute object-contain border border-red-500 left-1/2 transform -translate-x-1/2 top-[-35px] h-[5rem] w-[5rem] rounded-full bg-green-200"
        />

        {/* Card content */}
        <div className="border border-[#BC2C3D] w-full rounded-lg p-6 sm:p-10 flex flex-col items-center whitespace-break-spaces">
  <h1 className="w-[80%]  flex flex-col relative py-[1rem] mb-4 text-center text-base whitespace-pre-wrap break-words   max-md:mt-4">
    {data?.description}
  </h1>
  <div className="flex flex-col justify-center items-center">
    <p className="text-xl sm:text-2xl font-semibold">{data?.name}</p>
    <p className="text-sm text-gray-400">{data?.designation}</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default Testimonials;
