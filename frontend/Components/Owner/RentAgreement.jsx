import { Divider } from "@mui/material";
import React, { useState } from "react";
import Stepper from "./Stepper"; // Assuming Stepper is your horizontal linear stepper component
import Property from "./Property";
import TenantDets from "./TenantDets";
import PropertyDets from "./PropertyDets";
import AgreementTerm from "./AgreementTerm";
import Annexures from "./Annexures";

const RentAgreement = ({ page }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    ownerDetails: {},
    tenantDetails: {},
    propertyDetails: {},
    agreementTerms: {},
    annexures: {},
  });

  const steps = [
    "Owner Details",
    "Tenant Details",
    "Property Details",
    "Agreement terms",
    "Annexures",
  ];

  const handleNext = (data) => {
    if (activeStep === 0) {
      setFormData((prev) => ({ ...prev, ownerDetails: data }));
    } else if (activeStep === 1) {
      setFormData((prev) => ({ ...prev, tenantDetails: data }));
    } else if (activeStep === 2) {
      setFormData((prev) => ({ ...prev, propertyDetails: data }));
    } else if (activeStep === 3) {
      setFormData((prev) => ({ ...prev, agreementTerms: data }));
    } else if (activeStep === 4) {
      setFormData((prev) => ({ ...prev, annexures: data }));
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSaveAgreement = (agreementData) => {
    console.log("Final Rent Agreement Data:", agreementData); // Log final agreement data
  };

  return (
    <>
      <h1
        className={`text-2xl max-md:text-xl mb-2 font-semibold ${
          page && "text-center text-3xl"
        }`}
      >
        Rent Agreement
      </h1>
      <Divider className={`w-[92%] max-md:w-full ${page && "w-full"}`} />
      <>
        <Stepper activeStep={activeStep} steps={steps} />

        {activeStep === 0 && (
          <Property
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
        {activeStep === 1 && (
          <TenantDets
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
        {activeStep === 2 && (
          <PropertyDets
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
        {activeStep === 3 && (
          <AgreementTerm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}
        {activeStep === 4 && (
          <Annexures
            activeStep={activeStep}
            handleBack={handleBack}
            formData={formData}
            onSave={handleSaveAgreement}
          />
        )}
      </>
    </>
  );
};

export default RentAgreement;
