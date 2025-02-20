import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { allGroupChats } from "../../store/Action/User";
import { clearDlt } from "../../store/Reducer/UserReducer";
import moment from "moment";
import Loading from "../Loading";

const socket = io("https://api.mycozee.in/", { path: "/socket.io" });

const ChatWindowTeam = ({ userId, teamId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null); // Reference to scroll to bottom

  const { messageGrp, loading, dlt } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (dlt) {
      dispatch(allGroupChats(teamId));
      dispatch(clearDlt());
    }
  }, [dlt, dispatch, teamId]);

  useEffect(() => {
    dispatch(allGroupChats(teamId));
  }, [teamId, dispatch]);

  useEffect(() => {
    if (Array.isArray(messageGrp)) {
      setMessages(messageGrp);
    }
  }, [messageGrp]);

  useEffect(() => {
    socket.emit("joinTeam", teamId);

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages.some(
          (msg) => msg._id === newMessage._id
        );
        return isDuplicate ? prevMessages : [...prevMessages, newMessage];
      });
    };

    socket.on("receiveTeamMessage", handleNewMessage);

    socket.on("messageDeleted", (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    });

    return () => {
      socket.off("receiveTeamMessage", handleNewMessage);
      socket.off("messageDeleted");
    };
  }, [teamId]);

  const sendMessage = () => {
    if (messageContent.trim()) {
      const messageData = {
        senderId: userId,
        teamId,
        message: messageContent,
        createdAt: new Date().toISOString(),
      };

      // Emit to server (let the server send back the saved message)
      socket.emit("sendTeamMessage", messageData);

      setMessageContent("");
    }
  };

  const deleteMessage = (messageId) => {
    socket.emit("deleteMessage", { messageId, teamId });
  };

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format("MMM D, YYYY h:mm A");
  };

  return (
    <div className="chat-container flex flex-col">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            ref={messagesEndRef}
            className="chat-messages h-[50vh] w-full relative overflow-y-auto"
          >
            {messages?.map((msg, index) => {
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

export default ChatWindowTeam;
