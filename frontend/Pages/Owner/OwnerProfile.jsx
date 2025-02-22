import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
// import ProfileSidebar from "../Components/Profile/ProfileSidebar";
import { Divider } from "@mui/material";
import { Button, Modal } from "antd";

import Profile from "../../Components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
// import { isUser, userLogout } from "../store/Action/Auth";
import Loading from "../../Components/Loading";
// import MyPrefrence from "../Components/Profile/MyPrefrence";
import MyNotification from "../../Components/Profile/MyNotification";
import MyTeam from "../../Components/Profile/MyTeam";
import Refund from "../../Components/Profile/Refund";
import Help from "../../Components/Profile/Help";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, clearMessage } from "../../store/Reducer/Auth";
import ProfileListing from "../../Components/Listing/ProfileListing";
import ProfileSidebar from "../../Components/Profile/ProfileSidebar";
import { deleteAccount, isUser, userLogout } from "../../store/Action/Auth";
import PGManagement from "../../Components/Owner/PGManagement";
import PremiumPosterDets from "../../Components/Premium/PremiumPosterDets";
import Premium from "../../Components/Owner/Premium";
import RentAgreement from "../../Components/Owner/RentAgreement";

const OwnerProfile = () => {
  const { user, loading, message, error, isAuthenticated } = useSelector(
    (state) => state.Auth
  );
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
  const sideBarData = [
    {
      title: "My Profile",
      icon: "mingcute:user-2-line",
    },
    {
      title: "PG Management",
      icon: "gala:settings",
    },
    {
      title: "My Notifications",
      icon: "uiw:bell",
    },
    {
      title: "Be a Premium",
      icon: "mdi:tag-outline",
    },
    {
      title: "Rent agreement",
      icon: "streamline:hand-held-tablet-writing",
    },
    {
      title: "Need Help",
      icon: "material-symbols:help-outline",
    },
    {
      title: "Delete account",
      icon: "line-md:account-delete",
    },
    {
      title: "Logout",
      icon: "material-symbols:logout",
    },
  ];
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
  const handleDelete = () => {
    dispatch(deleteAccount());
    
    setIsModalOpen(false);
    navigate("/");
  };
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <NavBar dashboard={true} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex w-full h-[89vh] overflow-hidden  translate-y-20">
          <ProfileSidebar
            sideBarData={sideBarData}
            selected={selected}
            setselected={setselected}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full h-full p-6 relative overflow-y-auto overflow-x-hidden">
              {selected === "My Profile" && <Profile user={user} />}
              {selected === "PG Management" && <PGManagement user={user} />}
              {selected === "My Notifications" && (
                <MyNotification user={user} />
              )}
              {selected === "Be a Premium" && <Premium user={user} />}
              {selected === "Rent agreement" && <RentAgreement user={user} />}
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
            <button
              onClick={handleDelete}
              className="w-1/2 p-2  bg-white text-primary border-2 border-primary rounded-lg"
            >
              Yes, I’m sure!
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default OwnerProfile;
