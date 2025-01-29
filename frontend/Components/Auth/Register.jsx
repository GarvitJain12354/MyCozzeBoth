import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../Axios/axios";
import { toast } from "react-toastify";

const Register = () => {
  const [number, setNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  // Handle phone number submission (Send OTP via Phone.Email)
  const sendOtp = async () => {
    try {
      const response = await axios.post("/user/send-otp", {
        number: number,
      });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent successfully");
        // console.log("OTP sent successfully");
      } else {
        toast.error(response.data.error);
        // console.error("Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response.data.error);

      // console.error("Error sending OTP:", error);
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    try {
      const response = await axios.post("/user/verify-otp", {
        number: number,
        code: otp,
      });
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        localStorage.setItem("number", number);
        navigate("/registerdets");
      } else {
        setOtpError("Invalid OTP");
        toast.error("Failed to verify OTP");
      }
    } catch (error) {
      setOtpError("Error verifying OTP");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-between relative">
      <div className="w-full absolute top-0 left-0 flex items-center justify-between px-6 md:px-[10vw] py-2">
        <img src="/Logo.png" className="h-10" alt="Logo" />
        <NavLink to="/">
          <i className="ri-close-line text-primary text-3xl md:text-5xl cursor-pointer font-light"></i>
        </NavLink>
      </div>

      {/* Left Image Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full  flex items-center  justify-center">
        <img
          src="/login.png"
          alt="login"
          className="min-w-[80%] m-0 max-h-[60%]  mt-20 object-contain"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 h-full flex max-md:px-5     items-center justify-center">
        <div className="max-w-md flex flex-col items-start">
          <h1 className="text-primary md:text-3xl text-3xl font-extrabold flex items-center">
            <Icon
              icon="solar:login-2-linear"
              style={{ color: "#BC2C3D", marginRight: "1vw" }}
            />
            Create your account
          </h1>
          <h3 className="text-sm md:text-base mt-4">
            Enter your phone number, and we will send you an authentication code
            via Phone/Email.
          </h3>

          <div className="flex flex-col mt-6 w-full gap-2">
            <label className="font-extrabold">
              Enter your Phone Number <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="+91 1234156799"
              className="w-full p-2 rounded-xl border-2"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          {!otpSent ? (
            <button
              className="bgRed px-6 py-2 mt-5 rounded-xl text-white text-lg w-full md:w-fit"
              onClick={sendOtp}
            >
              Send Code <i className="ri-arrow-right-wide-line"></i>
            </button>
          ) : (
            <>
              <div className="flex flex-col mt-6 w-full gap-2">
                <label className="font-extrabold">
                  Enter OTP <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-2 rounded-xl border-2"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpError && <p className="text-red-500">{otpError}</p>}
              </div>
              <button
                className="bgRed px-6 py-2 mt-5 rounded-xl text-white text-lg w-full md:w-fit"
                onClick={verifyOtp}
              >
                Verify OTP <i className="ri-arrow-right-wide-line"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
