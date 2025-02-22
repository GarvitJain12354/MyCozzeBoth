import React, { useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import InputCustom from "../Components/InputCustom";
import GeneratedReceipt from "./Recipt/GeneratedReceipt";
import { toast } from "react-toastify";

const RentRecipt = () => {
  // Handle form submission
  const [data, setdata] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(e.target.tenantMobile.value)) {
      toast.error("Invalid Phone number");
      return;
    }
    const panRegex = /^[1-9][0-9]{2}\s?[0-9]{3}$/;

    if (!panRegex.test(e.target.landlordPan.value)) {
      toast.error("Invalid PAN Card Number");
      return;
    }
    const fdata = {
      rentAmount: e.target.rentAmount.value,
      address: e.target.address.value,
      landlordName: e.target.landlordName.value,
      landlordPan: e.target.landlordPan.value,
      receiptStartDate: e.target.receiptStartDate.value,
      months: e.target.months.value,
      tenantName: e.target.tenantName.value,
      tenantMobile: e.target.tenantMobile.value,
      email: e.target.email.value,
    };

    setdata(fdata);
    // Use `data` as needed, e.g., send it to an API or process it further
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center py-[10rem] items-center min-h-[100vh]">
        <div className="px-5 m-1 rounded-xl text-center min-h-screen min-w-[80vw] border-2">
          <h1 className="text-4xl font-bold py-20">
            Generate Rent Receipts for Free
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              <InputCustom
                name="rentAmount"
                title="Monthly Rent Amount"
                placeholder="₹ 10000"
                type={"number"}
              />
              <InputCustom
                name="address"
                title="Property Address"
                placeholder="Full address here"
                type={"text"}
              />
              <InputCustom
                name="landlordName"
                title="Landlord Name"
                placeholder="e.g. John Doe"
                type={"text"}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              <InputCustom
                name="landlordPan"
                title="Landlord PAN (Optional)"
                placeholder="Enter landlord PAN"
                type={"number"}
              />
              <InputCustom
                name="receiptStartDate"
                title="Receipt Start Date"
                type="date"
              />
              <InputCustom
                name="months"
                title="No. of months"
                type={"number"}
                placeholder="Enter number of months"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              <InputCustom
                name="tenantName"
                title="Tenant Name"
                placeholder="Enter Tenant Name"
              />
              <InputCustom
                name="tenantMobile"
                title="Tenant Mobile"
                placeholder="Enter Tenant Mobile"
                type={"number"}
              />
              <InputCustom
                name="email"
                title="Email"
                placeholder="Enter Email Address"
                type={"email"}
              />
            </div>
            <div className="flex justify-end text-start">
              <p className="text-[#6f6d6d] text-[14px]">
                You will receive a copy of rent receipt on this email address.
              </p>
            </div>
            <div className="py-10 flex justify-center items-center w-full">
              <button
                type="submit"
                className="px-2 text-lg sm:text-xl bg-[#bc2c3d] flex justify-center items-center text-white py-3 rounded-xl"
              >
                Generate Rent Receipt
                <Icon icon="iconamoon:arrow-right-2-thin" width={35} />
              </button>
            </div>
          </form>
          {data && <GeneratedReceipt data={data} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RentRecipt;
