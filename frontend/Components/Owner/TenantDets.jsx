import React, { useState } from "react";
import InputCustom from "../InputCustom";
import { toast } from "react-toastify";

const TenantDets = ({ handleNext, activeStep, handleBack }) => {
  const [tenantData, setTenantData] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    })); // Clear the error for the field as the user types
  };

  const validateFields = () => {
    const newErrors = {};
    if (!tenantData.fullName) {
      newErrors.fullName = "Full Name is required";
      toast.error("Full Name is required");
    }
    if (!tenantData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required";
      toast.error("Mobile Number is required");
    }
    if (tenantData.mobileNumber) {
      const phoneRegex = /^[6-9]\d{9}$/;

      if (!phoneRegex.test(tenantData.mobileNumber)) {
        newErrors.mobileNumber = "Invalid Mobile Number";
        toast.error("Invalid Mobile Number");
      }
    }
    if (!tenantData.address) {
      newErrors.address = "Full Address is required";
      toast.error("Full Address is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSaveAndContinue = () => {
    if (validateFields()) {
      handleNext(tenantData); // Proceed to the next step if valid
    }
  };

  return (
    <div className="w-[92%] max-md:w-full h-[70vh] flex items-center flex-col justify-center border-[1px] border-black rounded-2xl max-md:px-2 px-5">
      <h1 className="text-4xl max-md:text-start max-md:text-xl">
        Who is renting the property?
      </h1>
      <h4 className="max-md:text-xs max-md:text-start">
        Fill in details of the tenant/lessor/renter
      </h4>

      <InputCustom
        title={"Full Name"}
        required={true}
        placeholder={"Garvit Jain"}
        value={tenantData.fullName}
        name="fullName"
        onChange={handleInputChange}
        error={errors.fullName}
      />

      <InputCustom
        title={"Mobile Number"}
        required={true}
        placeholder={"8839893207"}
        type="number"
        value={tenantData.mobileNumber}
        name="mobileNumber"
        onChange={handleInputChange}
        error={errors.mobileNumber}
      />

      <InputCustom
        title={"Full Address"}
        required={true}
        placeholder={"Enter address here"}
        value={tenantData.address}
        name="address"
        onChange={handleInputChange}
        error={errors.address}
      />

      <div className="flex items-start w-fit justify-center mr-auto ml-4 gap-3">
        {activeStep > 0 && (
          <button
            onClick={handleBack}
            className="p-2 max-md:p-2 bg-gray-300 mt-4 text-black rounded-xl mb-4"
          >
            <i className="ri-arrow-left-line"></i> Back
          </button>
        )}
        <button
          className="p-2 max-md:p-2 bg-primary mt-4 text-white rounded-xl"
          onClick={onSaveAndContinue}
        >
          Save & Continue
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
};

export default TenantDets;
