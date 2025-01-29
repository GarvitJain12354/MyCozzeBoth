import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
const TeamUpPopUp = ({ open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm md:max-w-[40%] w-full text-center">
              {/* Image Section */}
              <div className="flex justify-center mb-6">
                <img
                  src="/teamup.png" // Replace with your image link
                  alt="Team Illustration"
                  className="w-40 h-40 object-cover"
                />
              </div>

              {/* Text Section */}
              <h2 className="text-2xl font-bold text-[#bc2c3d] mb-2">
                Together, we achieve more
              </h2>
              <p className="text-gray-600 mb-6">
                If you're unable to find a flat on your own, you can team up
                with other users to search for one together.
              </p>

              {/* Buttons Section */}
              <div className="flex justify-center space-x-4">
                <button onClick={handleClose} className="bg-[#bc2c3d] text-white px-8 py-3 rounded-lg ">
                  Okay
                </button>
              </div>
            </div>
        </Box>
      </Modal>
    </>
  );
};

export default TeamUpPopUp;
