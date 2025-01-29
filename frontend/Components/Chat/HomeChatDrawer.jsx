import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import Chat from "./Chat";
import ChatDets from "./ChatDets";
import { useDispatch, useSelector } from "react-redux";
import { getallUserChats } from "../../store/Action/User";
const HomeChatDrawer = ({ showDrawer, onClose, open, userId, otherUserId }) => {
  const dispatch = useDispatch();
  const { chatDets } = useSelector((state) => state.User);
  const [receiverId, setreceiverId] = useState("");

  useEffect(() => {
    dispatch(getallUserChats());
    if (!open) {
      setreceiverId("");
    }
  }, [open]);
//   console.log(chatDets, 345);

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer title="Chat here" className="overflow-hidden relative" onClose={onClose} open={open}>
        {receiverId === "" ? (
          <div className="flex flex-col ">
            {chatDets?.map((i, index) => (
              <ChatDets setreceiverId={setreceiverId} data={i} />
            ))}
            {/* <ChatDets/>
           <ChatDets/>
           <ChatDets/> */}
          </div>
        ) : (
          <div className="flex flex-col relative overflow-hidden h-full">
            <i
              className="ri-arrow-left-line cursor-pointer"
              onClick={() => setreceiverId("")}
            ></i>
            <Chat userId={userId} otherUserId={receiverId} />
          </div>
        )}
      </Drawer>
    </>
  );
};
export default HomeChatDrawer;
