import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

const settings = ["My Dashboard", "Logout"];

const AdminNavBar = ({ close }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // Replace with user data from your preferred source

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
    // Add your logout logic here
    setAnchorElUser(null);
  };

  useEffect(() => {
    // Fetch user data logic here if needed
    setLoading(false); // Adjust loading state if fetching user data
    setUser({ firstname: "John", avatar: { url: "/avatar.png" }, role: "flatemate", listing: "" });
  }, []);

  return (
    <div className="w-full h-20 py-2  z-50 fixed top-0 left-0 px-[10vw] flex mont items-center justify-between">
      <NavLink to={"/"}>
        <img src="/Logo.png" className="h-10" alt="" />
      </NavLink>
      <div className="flex items-center gap-4 boldF text-primary font-medium">
        {!close && (
          <>
            {user?.role === "flatemate" && (
              <NavLink
                to={"/user/addlisting"}
                className="bg-primary text-white px-4 py-1 rounded-xl"
              >
                {user?.listing === "" ? (
                  <>
                    Add listing <i className="ri-add-line"></i>
                  </>
                ) : (
                  <>
                    Edit listing <i className="ri-edit-fill"></i>
                  </>
                )}
              </NavLink>
            )}
          </>
        )}

        {!user && loading ? (
          <CircularProgress color="red" />
        ) : user ? (
          close ? (
            <NavLink to={"/"}>
              <i
                className="ri-close-line text-primary text-5xl cursor-pointer"
                style={{ fontWeight: "100" }}
              ></i>
            </NavLink>
          ) : (
            <div className="flex cursor-pointer items-center justify-center gap-2">
              <h3 className="font-[600]">Hi, {user?.firstname}</h3>
              <Box sx={{ flexGrow: 0, borderRadius: "100px" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                    <NavLink to={"/user/profile"}>My Dashboard</NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </div>
          )
        ) : (
          <>
            <NavLink
              to={"/login"}
              className="bg-primary text-white px-7 font-normal py-1 rounded-full"
            >
              Log In
            </NavLink>
            <NavLink
              to={"/register"}
              className="bg-white border-[1.5px] border-primary text-primary  px-7 font-normal py-1 rounded-full"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminNavBar;
