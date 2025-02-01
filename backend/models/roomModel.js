const { default: mongoose } = require("mongoose");

const roomModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PG name is required"],
    },
    gender: {
      type: String,
    },
    pgName: {
      type: String,
      required: [true, "PG name is required"],
    },
    location: {
      type: String,
      required: [true, "PG location is required"],
    },
    city: {
      type: String,
      // required: [true, "PG city is required"],
    },
    mobile: {
      type: Number,
      required: true,
    },
    occupancy: {
      type: String,
      // required:true
    },
    images: [
      {
        type: Object,
        default: {
          fileId: "",
          url: "",
        },
      },
    ],
    pinCode: {
      type: Number,
      minLength: [6, "Please Enter valid pincode"],
      maxLength: [6, "Please Enter valid pincode"],
    },
    rent: {
      type: Object,
    },
    elecricityCharges: {
      type: Number,
      default: 0,
    },
    securityDeposit: {
      period: Number,
      charges: Number,
    },
    noticePeriod: {
      type: String,
    },
    amenities: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Rejected", "Published"],
    },
    food: {
      type: String,
    },
    laundary: {
      type: String,
    },
    furnitured: {
      type: "String",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomModel);
module.exports = Room;
