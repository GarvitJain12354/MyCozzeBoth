import React, { useEffect, useState } from "react";
import Team from "./Team";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import Request from "./Request/Request";
import InputCustom from "../InputCustom";
import {
  createTeam,
  getTeamDetails,
  sendRequest,
} from "../../store/Action/User";
import { useDispatch, useSelector } from "react-redux";
import ChatWindowTeam from "./ChatWindowTeam";

const MyTeam = () => {
  const [open, setopen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [teamName, setteamName] = useState("");
  const [selectedTeam, setselectedTeam] = useState("");
  const { user } = useSelector((state) => state.Auth);
  const [openRequest, setopenRequest] = useState(false);
  const { team, loading } = useSelector((state) => state.User);
  const [memeberLength, setmemeberLength] = useState(0);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    dispatch(getTeamDetails());
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleClickRequestOpen = () => {
    setopenRequest(true);
  };

  const handleClickRequestClose = () => {
    setopenRequest(false);
  };
  const handleTeamSubmit = () => {
    const dets = {
      teamName: teamName,
    };

    dispatch(createTeam(dets));
  };
  const handleSendRequest = (id) => {
    const dets = {
      recipientId: id,
      teamId: selectedTeam._id,
    };
    dispatch(sendRequest(dets));
  };
  useEffect(() => {
    if (selectedTeam) {
      selectedTeam?.members?.map((i) => {
        i.accepted && setmemeberLength((prev) => prev + 1);
      });
    } else {
      setmemeberLength(0);
    }
  }, [selectedTeam]);

  return (
    <>
      <div className="flex items-center justify-between gap-5 w-[92%] max-md:w-full">
        {selectedTeam ? (
          <>
            <div className="flex items-center">
              <i
                className="ri-arrow-left-line text-2xl cursor-pointer"
                onClick={() => setselectedTeam("")}
              ></i>
              <div className="flex flex-col items-start">
                <h1
                  className={`text-2xl max-md:text-xl shrink-0 font-semibold cursor-pointer`}
                >
                  {selectedTeam?.teamName}
                </h1>
                <h5 className="text-sm ">{memeberLength} Members</h5>
              </div>
            </div>
            <button
              onClick={handleClickRequestOpen}
              className=" font-semibold  bg-primary p-2 px-5 rounded-xl gap-2 text-white mb-1"
            >
              <i className="ri-user-add-line"></i>
              Send Request
            </button>
          </>
        ) : (
          <>
            <h1
              className={`text-2xl max-md:text-xl shrink-0 mb-2 font-semibold cursor-pointer ${
                open ? "text-primary" : "text-black"
              } `}
              onClick={() => setopen(true)}
            >
              My Team
            </h1>
            <h1
              className={`text-2xl max-md:text-xl mb-2 font-semibold cursor-pointer ${
                !open ? "text-primary" : "text-black"
              } `}
              onClick={() => setopen(false)}
            >
              Requests
            </h1>
            <button
              onClick={handleClickOpen}
              className="ml-auto font-semibold mr-24 bg-primary p-2 px-5 rounded-xl text-white mb-1"
            >
              Create Team
            </button>
          </>
        )}
      </div>
      <Divider className="w-[92%]" />
      <div className="w-[92%]">
        {selectedTeam ? (
          <ChatWindowTeam userId={user?._id} teamId={selectedTeam?._id} />
        ) : open ? (
          <Team open={handleClickOpen} setselectedTeam={setselectedTeam} />
        ) : (
          <Request />
        )}
      </div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Create Your Team"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <input type="text" className="teamName"  /> */}
            <InputCustom
              title={"Team Name"}
              name={"teamName"}
              placeholder={"Team Name"}
              type={"text"}
              value={teamName}
              onChange={(e) => setteamName(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleTeamSubmit} autoFocus>
            Create Now
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRequest}
        onClose={handleClickRequestClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Send Requests"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex flex-col w-full h-full">
              {team?.map((i, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border-2"
                >
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={`${i?.user?.avatar.url}`}
                      className="h-10 w-10 rounded-full border-2 "
                      alt=""
                    />
                    <h1>
                      {i?.user?.firstname} {i?.user?.lastname}
                    </h1>
                  </div>
                  <button
                    onClick={() => handleSendRequest(i?.user._id)}
                    className="bg-primary p-2 px-3 rounded-xl text-white font-semibold "
                  >
                    Send Request
                  </button>
                </div>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyTeam;
