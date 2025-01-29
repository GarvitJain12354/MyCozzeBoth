import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReportListing from "../Listing/ReportListing";
import { useDispatch } from "react-redux";
import { reportListing } from "../../store/Action/User";
import ChatDrawer from "../Chat/ChatDrawer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
const DescriptionDets = ({ user, data, list, showDrawer,onClose, openDrawer,loading }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleReport = (msg) => {
    const dets = {
      message: msg,
    };
    dispatch(reportListing(list._id, dets));
    handleClose();
  };
  return (
    <>
      <div className="w-full flex flex-col gap-2 mt-6">
        <h1 className="font-semibold text-4xl">Description</h1>
        {!user?.currentPlan ? (
          <div className="flex flex-wrap gap-4">
            <p className="text-lg blur-sm pointer-events-none select-none">
              Get ready to kick off the Christmas season in Mumbai with SOUND OF
              CHRISTMAS - your favourite LIVE Christmas concert! <br />
              City Youth Movement invBring your family and friends and sing
              along your favourite Christmas carols on the 2nd of December, 6:30
              PM onwards at the Balgandharva Rang Mandir, Bandra West. Book your
              tickets now! ites you to the 4th edition of our annual Christmas
              festivities - by the youth and for the youth! Feat. your favourite
              worship leaders, carols, quizzes and some exciting surprises!
            </p>
            <h1 className="flex items-center justify-center gap-2 font-semibold">
              <i className="ri-error-warning-line text-red-500"></i>
              You must be premium user in order to view description
            </h1>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            <p className="text-lg ">{data}</p>
            {/* <h1 className="flex items-center justify-center gap-2 font-semibold">
              <i className="ri-error-warning-line text-red-500"></i>
              You must be premium user in order to view description
            </h1> */}
          </div>
        )}

        <div className="flex items-center gap-2 mt-3">
          <h3 className="font-extralight font-[gilroy]">
            Found wrong Information?{" "}
          </h3>
          <h1
            onClick={handleOpen}
            className="rounded-md px-2 p-1 bg-[#6f6f6f28] cursor-pointer"
          >
            Report Listing
          </h1>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} className="border-none">
        <Box sx={style}>
          <ReportListing
            handleReport={handleReport}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      {list?.user?._id !== "" && !loading && (
        <>
          <ChatDrawer
            showDrawer={showDrawer}
            open={openDrawer}
            onClose={onClose}
            userId={user?._id}
            otherUserId={list?.user?._id}
          />
          {/* <Chat /> */}
        </>
      )}
    </>
  );
};

export default DescriptionDets;
