import React from "react";

const Sent = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center px-4 lg:px-0">
      <img
        src="/sent.png"
        className="object-contain h-[40vh] sm:h-[50vh] w-full max-w-[400px] lg:max-w-none"
        alt="No Sent Requests"
      />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-primary font-semibold text-center">
        No Pending Request
      </h1>
      <h3 className="w-full sm:w-[70%] lg:w-[40%] text-center font-[gilroy] font-extralight text-lg sm:text-xl">
        No sent request is pending for team up, Create a team now!
      </h3>
    </div>
  );
};

export default Sent;
