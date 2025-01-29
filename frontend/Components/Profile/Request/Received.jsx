import React from "react";

const Received = () => {
  return (
    <div className="w-full flex gap-3 flex-col items-center justify-center p-4">
      <img
        src="/received.png"
        className="object-contain h-[30vh] sm:h-[40vh] md:h-[50vh] w-full max-w-xs sm:max-w-md"
        alt="No requests"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-primary font-semibold text-center">
        No Request found
      </h1>
      <h3 className="w-full sm:w-3/4 md:w-[40%] text-center font-[gilroy] font-extralight text-base sm:text-lg md:text-xl">
        No new request received for team up, You’ll be informed if you get any request.
      </h3>
    </div>
  );
};

export default Received;
