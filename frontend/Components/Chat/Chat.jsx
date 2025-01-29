import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "../../Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { allChats, deleteUserChat } from "../../store/Action/User";
import Loading from "../Loading";
import moment from "moment";
import { Dropdown, Space } from "antd";
import { clearDlt } from "../../store/Reducer/UserReducer";

const socket = io("http://localhost:5001/", {
  path: "/socket.io",
});

const Chat = ({ userId, otherUserId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const { message, loading, dlt } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dlt) {
      dispatch(allChats(userId, otherUserId));
      dispatch(clearDlt());
    }
  }, [dlt]);

  useEffect(() => {
    dispatch(allChats(userId, otherUserId));
  }, [userId, otherUserId, dispatch]);

  useEffect(() => {
    if (Array.isArray(message)) {
      setMessages(message);
    }
  }, [message]);

  useEffect(() => {
    socket.emit("joinRoom", userId);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("messageDeleted", (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageDeleted");
    };
  }, [userId]);

  const sendMessage = () => {
    if (messageContent.trim()) {
      const messageData = {
        senderId: userId,
        receiverId: otherUserId,
        message: messageContent,
      };

      socket.emit("sendMessage", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessageContent("");
      dispatch(allChats(userId, otherUserId));
    }
  };

  const deleteMessage = (messageId) => {
    console.log("hello");

    // socket.emit("deleteMessage", messageId);
    dispatch(deleteUserChat(messageId));
  };

  const items = [
    {
      label: (
        <p className="text-xs" onClick={() => deleteMessage(msg._id)}>
          Delete
        </p>
      ),
      key: "0",
    },
  ];

  const formatTimestamp = (timestamp) => {
    const messageDate = moment(timestamp);
    const today = moment().startOf("day");
    return messageDate.isSame(today, "day")
      ? messageDate.format("h:mm A")
      : messageDate.format("MMM D, YYYY h:mm A");
  };

  return (
    <div className="chat-container flex flex-col">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="chat-messages h-[50vh] w-full relative overflow-y-auto">
            {messages.map((msg, index) => {
              const items = [
                {
                  label: (
                    <p
                      className="text-xs"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      Delete
                    </p>
                  ),
                  key: "0",
                },
              ];

              return (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === userId ? "sent" : "received"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="timestamp text-[0.6rem] ml-auto">
                    {formatTimestamp(msg.createdAt)}
                    {msg.sender === userId && (
                      <Dropdown menu={{ items }} trigger={["click"]}>
                        <Space>
                          <i className="ri-arrow-down-s-line cursor-pointer"></i>
                        </Space>
                      </Dropdown>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="chat-input w-full">
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
