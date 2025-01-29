const { default: mongoose, Types } = require("mongoose");

const planModel = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    manager: {
      type: Boolean,
      default: false,
    },
    description: [],
    type: {
      type: String,
      enum: ["Roommate", "PG", "Flat"],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planModel);
module.exports = Plan;
