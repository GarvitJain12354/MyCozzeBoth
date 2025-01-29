import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import ProfileSidebar from "../Components/Profile/ProfileSidebar";
import { Divider } from "@mui/material";
import { Button, Modal } from "antd";

import Profile from "../Components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { isUser, userLogout } from "../store/Action/Auth";
import Loading from "../Components/Loading";
import MyPrefrence from "../Components/Profile/MyPrefrence";
import MyNotification from "../Components/Profile/MyNotification";
import MyTeam from "../Components/Profile/MyTeam";
import Refund from "../Components/Profile/Refund";
import Help from "../Components/Profile/Help";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, clearMessage } from "../store/Reducer/Auth";
import ProfileListing from "../Components/Listing/ProfileListing";
import ListingManagement from "../Components/Listing/ListingManagement";

const UserProfile = () => {
  const { user, loading, message, error, isAuthenticated } = useSelector(
    (state) => state.Auth
  );
  const sideBarData = [
    { title: "My Profile", icon: "mingcute:user-2-line" },
    { title: "My Preferences", icon: "gala:settings" },
    { title: "My Notifications", icon: "uiw:bell" },
    {
      title: "Manage Listings",
      icon: "gala:settings",
    },
    ...(!user?.flateOwner
      ? [{ title: "My Team", icon: "fluent:people-team-add-20-regular" }]
      : []),

    // { title: "Request refund", icon: "mdi:cash-refund" },
    { title: "Need Help", icon: "material-symbols:help-outline" },
    { title: "Delete account", icon: "line-md:account-delete" },
    { title: "Logout", icon: "material-symbols:logout" },
  ];
  const [selected, setselected] = useState("My Profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setselected("My Profile");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUser());
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    // if(!isAuthenticated && !user){
    //   navigate("/")
    // }
  }, [message, error, isAuthenticated, user, dispatch, loading]);
  useEffect(() => {
    if (selected === "Delete account") {
      setIsModalOpen(true);
    }
    if (selected === "Logout") {
      dispatch(userLogout());
      // navigate("/")
    }
  }, [selected, dispatch]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <NavBar
          isOpen={isOpen}
          mobile={true}
          setIsOpen={setIsOpen}
          dashboard={true}
        />
        <div className="flex w-full h-[89vh] overflow-hidden  translate-y-20">
          <ProfileSidebar
            sideBarData={sideBarData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selected={selected}
            setselected={setselected}
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full h-full p-6 relative overflow-y-auto overflow-x-hidden ">
              {selected === "My Profile" && <Profile user={user} />}
              {selected === "My Preferences" && <MyPrefrence user={user} />}
              {selected === "My Notifications" && (
                <MyNotification user={user} />
              )}
              {selected === "My Listings" && <ProfileListing user={user} />}
              {selected === "Manage Listings" && <ListingManagement />}
              {selected === "My Team" && <MyTeam user={user} />}
              {/* {selected === "Request refund" && <Refund user={user} />} */}
              {selected === "Need Help" && <Help user={user} />}
            </div>
          )}
        </div>
        {/* <Footer /> */}
        <Modal
          title=""
          centered
          open={isModalOpen}
          onCancel={handleCancel}
          footer={""}
        >
          <h1 className="text-4xl font-extrabold text-primary text-center">
            Are you sure?
          </h1>
          <h3 className="text-center p-4">
            If you delete the account the all your details will be removed
            including premium plans.
          </h3>
          <div className="flex items-center justify-center gap-2 ">
            <button
              onClick={handleCancel}
              className="w-1/2 p-2 rounded-lg bg-primary text-white"
            >
              No, take me back
            </button>
            <button className="w-1/2 p-2  bg-white text-primary border-2 border-primary rounded-lg">
              Yes, I’m sure!
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserProfile;
