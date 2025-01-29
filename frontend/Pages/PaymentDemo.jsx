import { useDispatch, useSelector } from "react-redux";
import axios from "../Axios/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { paymentSuccessfull } from "../store/Action/User";

const RazorpayPayment = ({ amount, text, onComplete, classn }) => {
  //   const [amount, setAmount] = useState("");
  const { user } = useSelector((state) => state.Auth);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const dispatch = useDispatch();
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // Fetch order details from the server
      const { data } = await axios.post("/user/create-order", {
        amount: amount * 100,
        currency: "INR",
      });
      const { id, amount: orderAmount } = data; // Destructure response from server

      const options = {
        key: "rzp_test_OLYfxYkQUyObgt", // Replace with your Razorpay key_id
        amount: orderAmount, // Amount in paise
        currency: "INR",
        name: "My Cozee",
        description: "Test Transaction",
        image: "/Logo.png",
        order_id: id, // Pass the order ID created on the server
        handler: async (response) => {
          console.log(response);

          try {
            const dets = {
              payment_id: response?.razorpay_payment_id,
              order_id: response?.razorpay_order_id,
              razorpay_signature: response?.razorpay_signature,
            };
            // console.log("Hello handler request");

            // // const d = await axios.post("/user/save-payment", dets);
            // console.log("Hello handler called");
            dispatch(paymentSuccessfull(dets));
            onComplete(response.razorpay_payment_id);

            // console.log(d);
          } catch (error) {
            console.log(error, "handler");
          }
        },
        prefill: {
          name: user?.firsname,
          email: user?.email,
          contact: user?.contact,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#BC2C3D",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating Razorpay order. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={displayRazorpay}
        className={`${
          classn
            ? classn
            : "bg-primary border-2 p-2 px-10 rounded-md text-white font-semibold"
        } `}
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};

export default RazorpayPayment;
