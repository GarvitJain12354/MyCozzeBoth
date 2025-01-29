const { default: mongoose } = require("mongoose");

const TestimonialModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    default: {
      fileId: "",
      url: "",
    },
  },
});

const Testimonial = mongoose.model("Testimonial", TestimonialModel);
module.exports = Testimonial;
