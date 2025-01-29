import React, { useState } from "react";
import Received from "./Received";
import Sent from "./Sent";

const Request = () => {
  const [open, setopen] = useState(false);
  return (
    <div className="w-full h-full flex flex-col items-center p-4 md:p-5">
      <div className="flex items-center w-full sm:w-fit font-semibold text-base sm:text-lg relative overflow-hidden text-white justify-center min-h-fit  rounded-2xl border-2 border-primary">
        <button
          onClick={() => setopen(false)}
          className={`p-2 sm:p-3 w-1/2 sm:w-40  transition-all ease-in-out duration-300 ${
            !open ? "bg-primary text-white" : "bg-white text-primary"
          }`}
        >
          Received
        </button>
        <button
          onClick={() => setopen(true)}
          className={`p-2 sm:p-3 w-1/2 sm:w-40 transition-all ease-in-out duration-300 ${
            open ? "bg-primary text-white" : "bg-white text-primary"
          }`}
        >
          Sent
        </button>
      </div>
      <div className="w-full mt-5">{!open ? <Received /> : <Sent />}</div>
    </div>
  );
};

export default Request;
