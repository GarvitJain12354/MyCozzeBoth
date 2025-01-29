import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center text-primary justify-center">
      <CircularProgress color="red" />
    </div>
  );
};

export default Loading;
