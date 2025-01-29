const { default: mongoose } = require("mongoose");

const paymentModel = mongoose.Schema({
  payment_id: String,
  order_id: String,
  amount: Number,
  razorpay_signature: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Payment = mongoose.model("Payment", paymentModel);
module.exports = Payment;
