const { default: mongoose } = require("mongoose");

const NotificationModel = mongoose.Schema(
  { title: {
    type: String,
    required: [true, "Notification description is required"],
  },
    description: {
      type: String,
      required: [true, "Notification description is required"],
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", NotificationModel);
module.exports = Notification;
