const { default: mongoose } = require("mongoose");

const tenantModel = mongoose.Schema({
  location: {
    type: String,
    required: [true, "Location is required"],
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

  highlights: {
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
  isPg: {
    type: Boolean,
    default: true,
  },
  isTeam: {
    type: Boolean,
    default: true,
  },
  public: {
    type: Boolean,
    default: false,
  },
});

const Tenant = mongoose.model("Tenant", tenantModel);
module.exports = Tenant;
