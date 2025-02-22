import React, { useState } from "react";
import InputCustom from "../InputCustom";

const AgreementTerm = ({ handleNext, activeStep, handleBack }) => {
  const [agreementData, setAgreementData] = useState({
    monthlyRent: "",
    securityDeposit: "",
    lockInPeriod: "",
    noticePeriod: "",
    agreementValidity: "",
    agreementStartDate: "",
    createdBy: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgreementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSaveAndContinue = () => {
    handleNext(agreementData); // Pass form data to parent component and move to next step
  };

  return (
    <div className="w-[92%] max-md:w-full min-h-[70vh] py-10 flex items-center flex-col justify-center border-[1px] border-black rounded-2xl px-5 max-md:px-2">
      <h1 className="text-4xl max-md:text-start max-md:text-xl  ">Agreement Terms</h1>
      <h4 className="max-md:text-xs py-2">Fill in details Agreement Terms details</h4>

      <InputCustom
        title={"Monthly Rent"}
        required={true}
        placeholder={"Enter Monthly Rent"}
        name="monthlyRent"
        value={agreementData.monthlyRent}
        onChange={handleInputChange}
        type={"number"}
      />

      <InputCustom
        title={"Security Deposit"}
        required={true}
        type={"number"}
        placeholder={"Enter Security Deposit"}
        name="securityDeposit"
        value={agreementData.securityDeposit}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Lock In Period (No. of Months)"}
        required={true}
        placeholder={"Enter Lock In Period"}
        name="lockInPeriod"
        type={"number"}
        value={agreementData.lockInPeriod}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Notice Period (No. of Months)"}
        required={true}
        type={"number"}
        placeholder={"Enter Notice Period"}
        name="noticePeriod"
        value={agreementData.noticePeriod}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Agreement Validity (No. of Months)"}
        required={true}
        type={"number"}
        placeholder={"Enter Agreement Validity"}
        name="agreementValidity"
        value={agreementData.agreementValidity}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Agreement Start Date"}
        required={true}
        placeholder={"Enter Agreement Start Date"}
        type={"date"}
        name="agreementStartDate"
        value={agreementData.agreementStartDate}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Created By"}
        required={true}
        placeholder={"Enter Creator's Name"}
        name="createdBy"
        value={agreementData.createdBy}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Enter your Email Address"}
        required={true}
        placeholder={"You’ll receive a rent agreement copy on this email"}
        type={"email"}
        name="email"
        value={agreementData.email}
        onChange={handleInputChange}
      />
      <div className="flex items-start w-fit justify-center mr-auto ml-4 gap-3 ">
        {activeStep > 0 && (
          <button
            onClick={handleBack}
            className="p-2 max-md:p-2 bg-gray-300 mt-4 text-black rounded-xl mb-4"
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

export default AgreementTerm;
