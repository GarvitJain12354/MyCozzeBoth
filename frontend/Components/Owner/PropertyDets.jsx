import React, { useEffect, useState } from "react";
import InputCustom from "../InputCustom";
import CustomDropdown from "../Auth/CustomDropDown";
import { toast } from "react-toastify";
import { City, State } from "country-state-city";

const PropertyDets = ({ handleNext, activeStep, handleBack }) => {
  const [selectedState, setSelectedState] = useState("Mumbai");
  const [selectedCity, setSelectedCity] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [propertyData, setPropertyData] = useState({
    mobileNumber: "",
    fullAddress: "",
    fatherHusbandName: "",
    pinCode: "",
  });

  useEffect(() => {
    setState(State.getStatesOfCountry("IN"));
  }, []);

  useEffect(() => {
    if (selectedState) {
      const stateData = state.find((state) => state.name === selectedState);
      if (stateData) {
        const stateCode = stateData.isoCode;
        const citiesOfState = City.getCitiesOfState("IN", stateCode);
        setCity(citiesOfState);
        setSelectedCity(citiesOfState[0]?.name || "");
      }
    }
  }, [selectedState, state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFields = () => {
    let isValid = true;

    if (!propertyData.mobileNumber) {
      toast.error("Mobile Number is required");
      isValid = false;
    }
    if (!propertyData.fullAddress) {
      toast.error("Full Address is required");
      isValid = false;
    }
    if (!propertyData.fatherHusbandName) {
      toast.error("Father/Husband's Name is required");
      isValid = false;
    }
    if (!propertyData.pinCode) {
      toast.error("PIN Code is required");
      isValid = false;
    }

    return isValid;
  };

  const onSaveAndContinue = () => {
    if (validateFields()) {
      const dataToSave = {
        ...propertyData,
        state: selectedState,
        city: selectedCity,
      };
      handleNext(dataToSave); // Move to next step if valid
    }
  };

  return (
    <div className="w-[92%] px-5 max-md:w-full min-h-[70vh] py-5   flex items-center flex-col justify-center border-[1px] border-black rounded-2xl max-md:px-4">
      <h1 className="text-4xl font-semibold max-md:text-xl">Property Details</h1>
      <h4 className="max-md:text-xs  py-2">Fill in details of the property being rented</h4>

      <div className=" w-full gap-2 p-2">
        <label className="font-extrabold">
          State <span className="text-primary">*</span>
        </label>
        <CustomDropdown
          options={state}
          setSelectedOption={setSelectedState}
          selectedOption={selectedState}
          width={"100%"}
        />
      </div>

      <div className="flex  mt-6 flex-col w-full gap-2 p-2 ">
        <label className="font-extrabold">
          City <span className="text-primary">*</span>
        </label>
        <CustomDropdown
          options={city}
          setSelectedOption={setSelectedCity}
          selectedOption={selectedCity}
          width={"100%"}
        />
      </div>

      <InputCustom
        title={"Mobile Number"}
        required={true}
        placeholder={"8839893207"}
        type={"number"}
        name="mobileNumber"
        value={propertyData.mobileNumber}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Full Address"}
        required={true}
        placeholder={"Enter address here"}
        name="fullAddress"
        value={propertyData.fullAddress}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"Name of Father/Husband of Purchaser"}
        required={true}
        placeholder={"Enter father/husband name of purchaser"}
        name="fatherHusbandName"
        value={propertyData.fatherHusbandName}
        onChange={handleInputChange}
      />

      <InputCustom
        title={"PIN Code"}
        required={true}
        placeholder={"Enter your PIN Code"}
        name="pinCode"
        value={propertyData.pinCode}
        onChange={handleInputChange}
      />
      <div className="flex items-start w-fit justify-center mr-auto ml-4 gap-3 ">
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

export default PropertyDets;
