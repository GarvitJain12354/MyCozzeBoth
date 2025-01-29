const { io } = require("../app");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Chat = require("../models/chatModel");

exports.getChatHistory = async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const chatHistory = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });
    // console.log(chatHistory);

    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history", error });
  }
};

exports.getChatUser = async (req, res) => {
  try {
    const chatHistory = await Chat.find({
      $or: [{ sender: req.user.id }],
    })
      .sort({ createdAt: 1 })
      .populate({
        path: "receiver",
        select: "avatar firstname lastname",
      });
    // console.log(chatHistory);
    var receiver = [];
    chatHistory.map((i) => {
      if (receiver.indexOf(i.receiver) === -1) {
        receiver.push(i.receiver);
      }
    });
    // console.log(receiver);

    res.status(200).json({
      receiver,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history", error });
  }
};
exports.deleteChat = CatchAsyncErrors(async (req, res, next) => {
  const chat = await Chat.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Chat deleted Successfully",
  });
});
