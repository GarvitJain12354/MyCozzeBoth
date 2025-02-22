import React, { useState } from "react";
import InputCustom from "../InputCustom";
import { toast } from "react-toastify";

const Property = ({ handleNext, activeStep, handleBack }) => {
  const [propertyData, setPropertyData] = useState({
    ownerName: "",
    ownerMobileNumber: "",
    ownerAddress: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    })); // Clear error for the field as the user types
  };

  const validateFields = () => {
    const newErrors = {};
    const { ownerName, ownerMobileNumber, ownerAddress } = propertyData;

    // Validate owner name
    if (!ownerName.trim()) {
      newErrors.ownerName = "Full Name is required";
      toast.error("Full Name is required");
    } else if (!/^[a-zA-Z\s]+$/.test(ownerName)) {
      newErrors.ownerName = "Full Name should contain only letters and spaces";
      toast.error("Full Name should contain only letters and spaces");
    }

    if (ownerMobileNumber) {
      const phoneRegex = /^[6-9]\d{9}$/;

      if (!phoneRegex.test(ownerMobileNumber)) {
        newErrors.ownerMobileNumber = "Invalid Mobile Number";
        toast.error("Invalid Mobile Number");
        
      }
    }
    // Validate mobile number
    if (!ownerMobileNumber) {
      
      newErrors.ownerMobileNumber = "Mobile Number is required";
      toast.error("Mobile Number is required");
    } else if (!/^\d{10}$/.test(ownerMobileNumber)) {
      newErrors.ownerMobileNumber = "Mobile Number must be 10 digits";
      toast.error("Mobile Number must be 10 digits");
    }

    // Validate address
    if (!ownerAddress.trim()) {
      newErrors.ownerAddress = "Full Address is required";
      toast.error("Full Address is required");
    } else if (ownerAddress.trim().length < 10) {
      newErrors.ownerAddress = "Address must be at least 10 characters long";
      toast.error("Address must be at least 10 characters long");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSaveAndContinue = () => {
    if (validateFields()) {
      handleNext(propertyData); // Pass the current data to parent if valid
    }
  };

  return (
    <div className="w-[92%] max-md:w-full min-h-[70vh] py-2 flex items-center flex-col justify-center border-[1px] border-black rounded-2xl px-5 max-md:px-2">
      <h1 className="text-4xl max-md:text-xl px-2">Who owns the property?</h1>
      <h4 className="max-md:text-xs px-2">Fill in details of the owner/lessor/landlord</h4>
      <InputCustom
        title={"Full Name"}
        required={true}
        placeholder={"Garvit Jain"}
        value={propertyData.ownerName}
        name="ownerName"
        onChange={handleInputChange}
        error={errors.ownerName}
      />
      <InputCustom
        title={"Mobile Number"}
        required={true}
        placeholder={"8839893207"}
        type="number"
        value={propertyData.ownerMobileNumber}
        name="ownerMobileNumber"
        onChange={handleInputChange}
        
        error={errors.ownerMobileNumber}
      />
      <InputCustom
        title={"Full Address"}
        required={true}
        placeholder={"Enter address here"}
        value={propertyData.ownerAddress}
        name="ownerAddress"
        onChange={handleInputChange}
        error={errors.ownerAddress}
      />
      <div className="flex items-start w-fit justify-center mr-auto ml-4 gap-3">
        {activeStep > 0 && (
          <button
            onClick={handleBack}
            className="p-4 max-md:py-2 bg-gray-300 mt-4 text-black rounded-xl mb-4"
          >
            <i className="ri-arrow-left-line"></i>
            Back
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

export default Property;
