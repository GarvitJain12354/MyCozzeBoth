import React, { useCallback, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { grey, pink } from "@mui/material/colors";
import generatePDF from "react-to-pdf";
import { toast } from "react-toastify";
import GeneratedAgreement from "../../Pages/Recipt/GenerateAgreement";
// import useRazorpay from "react-razorpay";

const AgreementPayment = ({ setdownload, target, formData, handleCancel }) => {
  const [withEStamp, setWithEStamp] = useState(true);
  const [amount, setamount] = useState(500);
  const handleDownload = () => {
    generatePDF(target, { filename: "agreement.pdf" });
  };

  // const handlePayment = useCallback(async() => {
  //   const order = await createOrder(params);

  //   const options: RazorpayOptions = {
  //     key: "YOUR_KEY_ID",
  //     amount: "3000",
  //     currency: "INR",
  //     name: "Acme Corp",
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     order_id: order.id,
  //     handler: (res) => {
  //       console.log(res);
  //     },
  //     prefill: {
  //       name: "Piyush Garg",
  //       email: "youremail@example.com",
  //       contact: "9999999999",
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzpay = new Razorpay(options);
  //   rzpay.open();
  // }, [Razorpay]);
  //   const handlePayment = () => {
  //  try {
  //   const options = {
  //     key: "rzp_test_OLYfxYkQUyObgt",
  //     amount: 50000, // Amount in paise
  //     currency: "INR",
  //     name: "Test Company",
  //     description: "Test Transaction",
  //     order_id: "order_9A33XWu170gUtm", // Replace with an actual order ID generated on the server
  //     handler: (response) => {
  //       console.log(response);
  //       alert("Payment Successful!");
  //     },
  //     prefill: {
  //       name: "John Doe",
  //       email: "john.doe@example.com",
  //       contact: "9999999999",
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //   };

  //   if (typeof Razorpay !== "undefined") {
  //     const razorpayInstance = new Razorpay(options);
  //     razorpayInstance.open();
  //   } else {
  //     console.error("Razorpay SDK not loaded properly.");
  //     alert("Something went wrong, please try again later.");
  //   }
  //  } catch (error) {
  //   console.log(error);

  //  }

  //   };

  return (
    <div className="flex w-[40%] max-md:w-full shrink-0 justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
        <h2 className="text-primary font-bold text-xl mb-4">
          Just one Step Away
        </h2>
        <p className="text-gray-600 mb-6">
          Select Rent Agreement Type to download your agreement
        </p>
        <div className="space-y-4 mb-4">
          <div
            onClick={() => {
              setWithEStamp(false);

              setamount(99);
            }}
            className={`border rounded-lg p-4 cursor-pointer text-start ${
              !withEStamp ? "border-primary" : "border-gray-300"
            }`}
          >
            <Checkbox
              checked={!withEStamp}
              onChange={() => {
                setWithEStamp(false);
                // setamount()
              }}
              sx={{
                color: grey[800],
                "&.Mui-checked": { color: pink[600] },
              }}
            />
            <label className="text-gray-800">Without E-Stamp</label>
            <p className="text-gray-500">Charges: ₹ 99</p>
          </div>
          <div
            onClick={() => {
              setWithEStamp(true);
              setamount(500);
            }}
            className={`border rounded-lg p-4 cursor-pointer ${
              withEStamp ? "border-primary" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <Checkbox
                  checked={withEStamp}
                  onChange={() => setWithEStamp(true)}
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": { color: pink[600] },
                  }}
                />
                <label className="text-gray-800">With E-Stamp</label>
                <p className="text-gray-500">Charges: ₹ 500</p>
              </div>
              <div className="bg-red-100 text-primary px-2 py-1 rounded-full text-xs">
                Recommended
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <Checkbox
            sx={{
              color: pink[800],
              "&.Mui-checked": { color: pink[600] },
            }}
          />
          <label className="text-gray-700">
            I accept MyCozee.in{" "}
            <a href="/terms" target="_blank" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>
        <GeneratedAgreement handleCancel={handleCancel} amount={amount} data={formData} />
        {/*
        <button
          onClick={handleDownload}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition"
        >
          Download now
        </button> */}
      </div>
    </div>
  );
};

export default AgreementPayment;
