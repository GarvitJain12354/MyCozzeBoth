import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isUser, userLogout } from "../store/Action/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { toast } from "react-toastify";
import { clearMessage } from "../store/Reducer/Auth";
import { getAllNotification } from "../store/Action/User";
const settings = ["My Dashboard", "Logout"];
import { io } from "socket.io-client";
import axios from "axios";

let socket;
const getSocket = () => {
  if (!socket) {
    // socket = io("http://localhost:5001/", { path: "/socket.io" });
    socket = io("https://api.mycozee.in/", {
      path: "/socket.io",
    });
  }
  return socket;
};

const NavBar = ({ close, isOpen, setIsOpen, dashboard, mobile }) => {



  // Replace with the search text you want to use

  const { user, loading, isAuthenticated } = useSelector((state) => state.Auth);
  const { notification, count, message, error } = useSelector(
    (state) => state.User
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUser());
  }, []);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const socket = io("http://localhost:5001", { path: "/socket.io" });

  useEffect(() => {
    dispatch(getAllNotification());
    const socketInstance = getSocket();

    if (!socketInstance.hasListeners("userconnect")) {
      socketInstance.on("userconnect", (data) => {
        // console.log(data, "user connected");
        if (user._id === data.id) {
          toast.success(data.description);

          console.log("hgellp", user._id, data.id, 432);

          dispatch(getAllNotification());
          playNotificationSound();
        }
      });
    }

    // Clean up the socket event listener when component unmounts
    return () => {
      socketInstance.off("userconnect");
    };
  }, [dispatch]);
  useEffect(() => {}, [message, error, count]);

  const playNotificationSound = () => {
    const audio = new Audio("/bell.mp3");
    audio.play();
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(userLogout());
    setAnchorElUser(null);
  };
  //  useEffect(() => {

  //  }, [loading,message,error,isAuthenticated,dispatch])
  const t = () => {
    toast.success("DEMO TOast");
  };
  return (
    <div className="w-full bg-white  h-20 py-2 max-md:h-16  z-50 fixed top-0 left-0  px-[10vw] max-md:px-4 flex items-center justify-between shadow-sm">
      <NavLink to={"/"}>
        <img src="/Logo.png" className="h-10" alt="" />
      </NavLink>

      <div className="flex items-center gap-4 boldF text-primary font-medium">
        {!close && (
          <>
            {user?.role === "flatemate" &&
              (user?.flateOwner ? (
                <>
                  <NavLink
                    to={"/user/addlisting"}
                    className="bg-primary text-white px-3 py-1 md:px-4 md:py-2 rounded-xl text-sm"
                  >
                    Add listing <i className="ri-add-line"></i>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={"/user/addlisting"}
                    className="bg-primary text-white max-md:px-2  py-1 md:px-4 md:py-2 rounded-xl text-sm"
                  >
                    {/* {(user?.listing === "" && user?.tenant === "") ||
                (user.listing === null && user?.tenant === null) ? (

                  <>
                    Add listing <i className="ri-add-line"></i>
                  </>
                ) : (
                  <>
                    Edit listing <i className="ri-edit-fill"></i>
                  </>
                )} */}
                    {user?.tenant ? (
                      <>
                        Edit listing <i className="ri-edit-fill"></i>
                      </>
                    ) : (
                      <>
                        Add listing <i className="ri-add-line"></i>
                      </>
                    )}
                  </NavLink>

                  {user?.tenant && (
                    <NavLink
                      to="/user/matches"
                      className={`bg-primary ${
                        mobile ? "max-md:hidden" : "flex"
                      } text-white flex items-center justify-center py-[0.4rem] max-md:px-2 px-2 md:py-2 gap-1 rounded-xl text-sm  font-semibold`}
                    >
                      <span className="hidden sm:inline">Your Matches</span>
                      <Icon icon="mdi:puzzle" style={{ color: "white" }} />
                    </NavLink>
                  )}
                </>
              ))}

            {user?.role === "owner" && (
              <NavLink
                to={"/owner/list"}
                className="bg-primary text-white px-3 py-1 md:px-4 md:py-2 rounded-xl text-sm"
              >
                <>
                  Manage PG <i className="ri-add-line"></i>
                </>
              </NavLink>
            )}
            {/* <NavLink className="font-[600]" to={""}>
              Apartments
            </NavLink>
            <NavLink className="font-[600]" to={""}>
              Roommates
            </NavLink> */}
          </>
        )}
        {!isAuthenticated && loading ? (
          <CircularProgress color="red" />
        ) : isAuthenticated ? (
          close ? (
            <NavLink to={"/"}>
              <i
                className="ri-close-line text-primary text-5xl cursor-pointer"
                style={{ fontWeight: "100" }}
              ></i>
            </NavLink>
          ) : (
            <div className="flex cursor-pointer items-center justify-center gap-2">
              <h3 className="font-[600] max-md:hidden">
                Hi, {user?.firstname}
              </h3>
              <Box sx={{ flexGrow: 0, borderRadius: "100px" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {count !== 0 && (
                      <div className="h-5 w-5 bg-black flex items-center justify-center text-white absolute -top-1 border-2 right-0 z-40 rounded-full">
                        <h4 className="font-extrabold text-xs">{count}</h4>
                      </div>
                    )}

                    <Avatar alt="Remy Sharp" src={`${user?.avatar?.url}`} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    {user?.role === "flatemate" && (
                      <NavLink to={"/user/profile"}>My Dashboard</NavLink>
                    )}
                    {user?.role === "owner" && (
                      <NavLink to={"/owner/profile"}>My Dashboard</NavLink>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
              {/* <div className="h-10 w-10 rounded-full relative overflow-hidden">
            <img src={`${user?.avatar?.url}`} className="h-full w-full rounded-full object-contain" alt="" />
          </div> */}
            </div>
          )
        ) : (
          <>
            <div className="flex items-center gap-2 md:gap-4">
              <NavLink
                to={"/login"}
                className="bg-primary text-white px-4 py-1 md:px-7 md:py-2 text-sm md:text-base rounded-full"
              >
                Log In
              </NavLink>
              <NavLink
                to={"/register"}
                className="bg-white border border-primary text-primary px-4 py-1 md:px-7 md:py-2 text-sm md:text-base rounded-full"
              >
                Sign Up
              </NavLink>
            </div>
          </>
        )}
        {dashboard && (
          <div className="lg:hidden">
            {isAuthenticated && (
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <Icon icon="material-symbols:close" width={24} />
                ) : (
                  <Icon icon="mdi:menu" width={24} />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
