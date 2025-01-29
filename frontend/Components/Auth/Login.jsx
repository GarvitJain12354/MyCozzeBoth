import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogin } from "../../store/Action/Auth";
import { toast } from "react-toastify";
import { clearError, clearMessage } from "../../store/Reducer/Auth";
import MobileLogin from "./MobileLogin";
import { Box, Modal, Typography } from "@mui/material";
import TroubleShoot from "../../Pages/TroubleShoot";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  padding:"5rem",
  borderRadius:"1rem"
};
const Login = () => {
  const { message, error } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const dets = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(userLogin(dets));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [message, error]);
  const [phone, setphone] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="w-full  flex flex-col lg:flex-row min-h-screen items-center lg:items-stretch justify-between">
      {/* Header */}
      <div className="w-full absolute top-0 left-0 flex items-center justify-between px-4 md:px-[10vw] py-2">
        <img src="/Logo.png" className="h-10" alt="Logo" />
        <NavLink to={"/"}>
          <i
            className="ri-close-line text-primary text-4xl md:text-5xl cursor-pointer"
            style={{ fontWeight: "100" }}
          ></i>
        </NavLink>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-20 px-4 lg:p-0 order-1">
        <img
          src="/login.png"
          alt="Login Illustration"
          className="w-[80%] md:w-fit h-auto object-contain"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center  items-center lg:items-start p-6 lg:p-12 order-2">
        {phone ? (
          <MobileLogin handleOpen={handleOpen} setphone={setphone} />
        ) : (
          <form
            onSubmit={onSubmit}
            className="w-full max-w-md flex flex-col justify-center"
          >
            <h1 className="text-primary md:text-3xl text-3xl font-extrabold flex items-center">
              <Icon
                icon="solar:login-2-linear"
                style={{ color: "#BC2C3D", marginRight: "1vw" }}
              />
              Sign in to your account
            </h1>
            <h3 className="w-full mt-4 text-center lg:text-left lightF">
              Enter your email and password to sign in to your account.
            </h3>

            <div className="flex flex-col items-start w-full gap-2 p-2 mt-6">
              <label className="font-extrabold">
                Enter your Email address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                placeholder="xyz@abcd.com"
                className="w-full p-2 rounded-xl border-2"
                name="email"
              />
            </div>

            <div className="flex flex-col items-start w-full gap-2 p-2 mt-2">
              <label className="font-extrabold">
                Enter your Password <span className="text-primary">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 rounded-xl border-2"
                name="password"
              />
            </div>
            <h3
              onClick={() => setphone(!phone)}
              className="text-base cursor-pointer text-primary"
            >
              Login with phone number
            </h3>
            <button
              type="submit"
              className="bgRed px-10 py-2 mt-5 rounded-xl text-white text-xl w-full lg:w-auto lg:ml-0 mx-auto"
            >
              Login <i className="ri-arrow-right-wide-line"></i>
            </button>
          </form>
        )}
      </div>
      {/* Form Section */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Icon onClick={handleClose} className="absolute right-10 top-10 cursor-pointer" icon="material-symbols:close-rounded" width="30" height="30" />
         <TroubleShoot/>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
