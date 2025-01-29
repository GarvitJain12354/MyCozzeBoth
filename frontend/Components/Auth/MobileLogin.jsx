import { Icon } from "@iconify-icon/react/dist/iconify.js";

import axios from "../../Axios/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MobileLogin = ({ setphone, handleOpen }) => {
  const [number, setNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  // Handle phone number submission (Send OTP via Phone.Email)
  const sendOtp = async () => {
    try {
      const response = await axios.post("/user/loginotp", {
        number: number,
      });
      if (response.status === 200) {
        setOtpSent(true);
        console.log("OTP sent successfully");
      } else {
        console.error("Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setOtpError(error.response.data.error);
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    try {
      const response = await axios.post("/user/verifyNumber", {
        number: number,
        code: otp,
      });
      console.log(response);

      if (response.status === 200) {
        toast.success("OTP verified successfully");
        localStorage.setItem("myCozeetoken", response.data.token);
        window.location.reload();
        //   localStorage.setItem("number", number);
        //   navigate("/registerdets");
      } else {
        setOtpError("Invalid OTP");
        toast.error("Failed to verify OTP");
      }
    } catch (error) {
      // toast.error(error.response.data.error);
      setOtpError(error.response.data.error);
      //   console.error("Error:", error);
    }
  };
  return (
    <div className="max-w-md flex flex-col items-start">
      <h1 className="text-primary md:text-3xl text-3xl font-extrabold flex items-center">
        <Icon
          icon="solar:login-2-linear"
          style={{ color: "#BC2C3D", marginRight: "1vw" }}
        />
        Sign in to your account
      </h1>
      <h3 className="text-sm md:text-base mt-4">
        Enter your phone number, and we will send you an authentication code via
        Phone/Email.
      </h3>

      <div className="flex flex-col mt-6 w-full gap-2">
        <label className="font-extrabold">
          Enter your Phone Number <span className="text-primary">*</span>
        </label>
        <input
          type="number"
          placeholder="+91 1234156799"
          className="w-full p-2 rounded-xl border-2"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      {/* <h3
        onClick={() => setphone(false)}
        className="text-base cursor-pointer text-primary mt-2"
      >
        Login with Email and Password
      </h3> */}
      {!otpSent ? (
        <>
          <h3 onClick={handleOpen} className="text-red-500 cursor-pointer mt-2">
            Troubleshoot Problem ?
          </h3>
          <button
            className="bgRed px-6 py-2 mt-5 rounded-xl text-white text-lg w-full md:w-fit"
            onClick={sendOtp}
          >
            Send Code <i className="ri-arrow-right-wide-line"></i>
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col mt-6 w-full gap-2">
            <label className="font-extrabold">
              Enter OTP <span className="text-primary">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter OTP"
              className="w-full p-2 rounded-xl border-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpError && <p className="text-red-500">{otpError}</p>}
          </div>
          <h3 onClick={handleOpen} className="text-red-500 cursor-pointer mt-2">
            Troubleshoot Problem ?
          </h3>
          <button
            className="bgRed px-6 py-2 mt-5 rounded-xl text-white text-lg w-full md:w-fit"
            onClick={verifyOtp}
          >
            Verify OTP <i className="ri-arrow-right-wide-line"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default MobileLogin;
