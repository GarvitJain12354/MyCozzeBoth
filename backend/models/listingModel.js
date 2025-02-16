const { default: mongoose, Mongoose } = require("mongoose");

const listingModel = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    city: {
      type: String,
    },
    gender: {
      type: String,
    },
    approxRent: {
      type: Number,
    },
    occupancy: {
      type: String,
    },
    images: [
      {
        type: Object,
        default: {
          fileId: "",
          url: "",
        },
        required: true,
      },
    ],
    highlights: {
      type: Array,
      default: [],
    },
    amenities: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    public: {
      type: Boolean,
      default: false,
    },
    views:{
      type:Number,
      default:0
    },
    status: {
      type: Boolean,
      default: false,
    },
    report: [
      {
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
    isFlat:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);
const Listing = mongoose.model("Listing", listingModel);
module.exports = Listing;
