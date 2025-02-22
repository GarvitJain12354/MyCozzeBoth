import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useDispatch } from "react-redux";
import { deletePg } from "../../store/Action/Owner";
import {
  deleteListingProperty,
  getMatchesListing,
} from "../../store/Action/User";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "antd";
import CardSwiper from "../CardSwiper";
import Amenities from "../Details/Amenities";
import DescriptionDets from "../Details/DescriptionDets";
import UserDets from "../Details/UserDets";

const PGCard = ({ showModal, status, data, listing }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDetail, setopenDetail] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const matchUser = () => {
    dispatch(getMatchesListing(data?._id));
  };
  const handleCloseUserMenu = (value, data) => {
    setAnchorElUser(null);
    if (value === "View") {
      setopenDetail(true);
      // if (listing) {
      //   // dispatch(deleteListingProperty(data?._id));
      //   showModalDelete();
      // } else {
      //   dispatch(deletePg(data?._id));
      // }
    }
    if (value === "Delete") {
      showModalDelete();
      // if (listing) {
      //   // dispatch(deleteListingProperty(data?._id));
      //   showModalDelete();
      // } else {
      //   dispatch(deletePg(data?._id));
      // }
    }
    if (value === "Edit") {
      showModal(data);
    }
  };

  const settings = ["View", "Edit", "Delete"];
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalDelete = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    if(listing){
      dispatch(deleteListingProperty(data?._id));

    }else{
      dispatch(deletePg(data?._id))
    }
    // dispatch(getUserListing());
    setIsModalOpen(false);
  };
  const pgDets = data;
  console.log(pgDets, 123);

  return (
    <>
      <div className="w-full border-2 rounded-xl p-4 flex flex-col gap-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl max-md:text-xl">
            {data?.pgName} <br />
            <h2 className="text-sm mt-2">
              <Icon icon="mdi:location" style={{ color: "black" }} />
              {data?.location}
            </h2>
          </h1>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View Actions">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Icon
                  icon="pepicons-pop:dots-y"
                  style={{
                    color: "black",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting, data)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
        {listing ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3>Approx Rent</h3>
              <h1 className="text-primary text-2xl">{data?.approxRent}</h1>
            </div>
            <div className="flex flex-col">
              <h3>Looking for</h3>
              <h1 className="text-primary text-2xl">{data?.gender}</h1>
            </div>
            <div className="flex flex-col items-end">
              <h3>Listed On</h3>
              <h1 className="text-primary text-2xl">
                {data?.createdAt
                  ? new Date(data.createdAt).toLocaleDateString()
                  : "N/A"}
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3>Total Views</h3>
              <h1 className="text-primary text-2xl max-md:text-xl">
                {data?.views}
              </h1>
            </div>
            {/* <div className="flex flex-col">
              <h3>Today View</h3>
              <h1 className="text-primary text-2xl max-md:text-xl">199</h1>
            </div> */}
            <div className="flex flex-col items-end">
              <h3>Listed On</h3>
              <h1 className="text-primary text-2xl max-md:text-xl">
                {data?.createdAt
                  ? new Date(data.createdAt).toLocaleDateString()
                  : "N/A"}
              </h1>
            </div>
          </div>
        )}

        <Divider />
        <div className="flex w-full items-center justify-between ">
          {listing ? (
            data?.status ? (
              <button className="p-2 px-12 max-md:px-3 py-1 max-md:text-base w-fit rounded-lg text-green-500 border-2 border-green-500">
                Verified
              </button>
            ) : (
              <button className="p-2 px-12 max-md:px-3 py-1 max-md:text-base w-fit rounded-lg text-primary border-2 border-2 border-primary">
                Pending Verification
              </button>
            )
          ) : (
            <>
              {status === "Pending" ? (
                <button className="p-2 px-12 max-md:px-3 py-1 max-md:text-base w-fit rounded-lg text-yellow-500 border-2 border-yellow-500">
                  Pending
                </button>
              ) : status === "Published" ? (
                <button className="p-2 px-12 max-md:px-3 py-1 max-md:text-base w-fit rounded-lg text-green-500 border-2 border-green-500">
                  Published
                </button>
              ) : (
                <button className="p-2 px-12 max-md:px-3 py-1 max-md:text-base w-fit rounded-lg text-primary border-2 border-2 border-primary">
                  Rejected
                </button>
              )}
            </>
          )}
          {listing
            ? data?.status && (
                <NavLink
                  to={`/user/matches/list/${data?._id}`}
                  className="p-2 px-12 max-md:px-3 py-1 max-md:text-base w-fit rounded-lg text-primary flex gap-2 max-md:gap-1 text-nowrap items-center justify-center border-2 border-primary"
                >
                  Your Matches
                  <Icon icon="mdi:puzzle" style={{ color: "#bc2c3d" }} />
                </NavLink>
              )
            : status === "Published" && (
                <NavLink
                  to={`/user/matches/list/${data?._id}`}
                  className="p-2 px-12 max-md:px-3 py-1 max-md:text-base w-fit rounded-lg text-primary flex gap-2 max-md:gap-1 text-nowrap items-center justify-center border-2 border-primary"
                >
                  Your Matches
                  <Icon icon="mdi:puzzle" style={{ color: "#bc2c3d" }} />
                </NavLink>
              )}
        </div>
      </div>
      <Modal
        title="Details"
        open={openDetail}
        onOk={() => setopenDetail(false)}
        onCancel={() => setopenDetail(false)}
        footer={""}
        width={"80vw"}
        centered
      >
        <div className="w-[80vw] min-h-screen  translate-y-20 p-5 px-[10vw] pb-20">
          <UserDets data={pgDets?.user} />

          <h1 className="font-semibold text-3xl mt-8">{pgDets?.pgName}</h1>
          <h3>
            PG for <span className="text-primary">Boys & Girls</span> | For{" "}
            <span className="text-primary">Students & Professionals</span>
          </h3>
          <h3 className="text-base">
            <i className="ri-map-pin-line pr-2"></i>
            {pgDets?.location}
          </h3>
          <div className="flex flex-col gap-4 mt-6">
            <h1 className="font-semibold text-4xl">Basic Info</h1>
            <div className="grid grid-cols-4 gap-2">
              {pgDets?.rent?.single && (
                <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                  <h3>{pgDets?.rent?.single && "Single Sharing"}</h3>
                  <h1 className="font-semibold text-4xl">
                    ₹ {pgDets?.rent?.single}
                  </h1>
                </div>
              )}

              {pgDets?.rent?.double && (
                <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                  <h3>{pgDets?.rent?.double && "Double Sharing"}</h3>
                  <h1 className="font-semibold text-4xl">
                    ₹ {pgDets?.rent?.double}
                  </h1>
                </div>
              )}

              {pgDets?.rent?.triple && (
                <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                  <h3>{pgDets?.rent?.double && "Triple Sharing"}</h3>
                  <h1 className="font-semibold text-4xl">
                    ₹ {pgDets?.rent?.triple}
                  </h1>
                </div>
              )}

              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                <h3>Deposit</h3>
                <h1 className="font-semibold text-4xl flex items-center gap-3">
                  <img src="/deposit.svg" className="h-10" alt="" /> 1 Month
                </h1>
              </div>
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                <h3>Electricity</h3>
                <h1 className="font-semibold text-3xl flex items-center gap-3">
                  {" "}
                  {pgDets?.elecricityCharges !== 0
                    ? "₹" + " " + pgDets?.elecricityCharges
                    : "Included In Rent"}
                </h1>
              </div>
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                <h3>Notice</h3>
                <h1 className="font-semibold text-3xl flex items-center gap-3">
                  <img src="/white.svg" className="h-10" alt="" />{" "}
                  {pgDets?.noticePeriod}
                </h1>
              </div>
              <div className="w-full h-[15vh] gap-4 bg-primary text-white p-4 rounded-xl text-xl flex flex-col justify-center-center">
                <h3>Maintenance Charge</h3>
                <h1 className="font-semibold text-3xl flex items-center gap-3">
                  {pgDets?.elecricityCharges}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full mt-6 relative rounded-2xl overflow-hidden h-[50vh]">
            <CardSwiper type={"dets"} img={pgDets?.images} index={1} />
          </div>
          <Amenities heading={"Amenities"} data={pgDets?.amenities} />
          <DescriptionDets />
        </div>
      </Modal>
      <Modal
        title="Remove Listing"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            <Button
              onClick={handleDelete}
              type="danger"
              className="bg-primary text-white hover:bg-primary"
            >
              Confirm
            </Button>

            <Button onClick={handleCancel}>Cancle</Button>
          </>
        }
        centered
      >
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold">
            Are you sure you want to remove your listing ?
          </h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio color="error" />}
              label="My Requirement is fullfilled ."
            />
            <FormControlLabel
              value="male"
              control={<Radio color="error" />}
              label="No, my requirement is not fullfilled and i am still looking"
            />
          </RadioGroup>
        </div>
      </Modal>
    </>
  );
};

export default PGCard;
