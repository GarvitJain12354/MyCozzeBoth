const { default: mongoose } = require("mongoose");

const cityModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cardImage: {
    fileId:String,
    url: String,
  },
  backgroundImage: {
    fileId:String,
    url:String,
  },
});

const City = mongoose.model("City", cityModel);
module.exports = City