const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    banner: {
      type: Object,
      default: {
        fileId: "",
        url: "",
      },
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
