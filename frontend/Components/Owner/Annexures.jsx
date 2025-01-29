import React, { useRef, useState } from "react";
import InputCustom from "../InputCustom";
import { Modal } from "antd";
import AgreementReady from "../AgreementReady/AgrementReady";
import AgreementPayment from "../AgreementReady/AgreementPayment";
import GeneratedAgreement from "../../Pages/Recipt/GenerateAgreement";

const Annexures = ({ formData, onSave, activeStep, handleBack }) => {
  // Accept formData and onSave as props
  const [items, setItems] = useState([{ itemName: "", quantity: "" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [download, setdownload] = useState(false);
  const targetRef = useRef();
  console.log(formData, 536);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Handle input change for each item
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  // Add another item
  const addItem = () => {
    setItems([...items, { itemName: "", quantity: "" }]);
  };

  // Generate agreement and log all data
  const onGenerateAgreement = () => {
    showModal();
    // console.log(formData);

    // const agreementData = {
    //   ...formData, // Include existing form data
    //   annexures: items, // Add items from annexures
    // };
    // console.log("Full Rent Agreement Data:", agreementData); // Log all data
    // onSave(agreementData); // Call the onSave function to handle further actions if needed
  };

  return (
    <div className="w-[92%] max-md:w-full px-5 max-md:px-2 min-h-[60vh] text-center flex items-center flex-col justify-center border-[1px] border-black rounded-2xl">
      <h1 className="text-4xl font-semibold max-md:text-2xl">Furniture Provided</h1>
      <h4 className="max-md:text-sm px-4">
        Enter the details of furniture / appliances provided to the tenant
      </h4>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex max-md:flex-col w-full items-center justify-center gap-0"
        >
          <InputCustom
            title={"Item Name"}
            required={true}
            placeholder={"e.g. Fans"}
            name="itemName"
            value={item.itemName}
            onChange={(e) => handleInputChange(index, e)}
          />
          <InputCustom
            title={"Quantity"}
            required={true}
            placeholder={"Enter quantity"}
            type={"number"}
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}

      <h3
        className="text-left w-full pl-6 text-primary text-sm cursor-pointer max-md:pl-2"
        onClick={addItem}
      >
        Add another item
      </h3>
      <div className="flex max-md:flex-col items-start w-fit justify-center mr-auto ml-4 gap-3 max-md:gap-0 ">
        {activeStep > 0 && (
          <button
            onClick={handleBack}
            className="p-2 max-md:p-2 bg-gray-300 mt-4 text-black rounded-xl mb-4"
          >
            <i className="ri-arrow-left-line"></i> Back
          </button>
        )}
        <button
          className="p-2 max-md:p-2 bg-primary mt-4 max-md:mt-0 mb-4 flex justify-center items-center  text-white rounded-xl "
          onClick={onGenerateAgreement}
        >
          Generate Rent Agreement
          <i className="ri-arrow-right-s-line "></i>
        </button>
      </div>

      <Modal
        title="Rent Agreement"
        open={isModalOpen}
        onCancel={handleCancel}
        centere
        width={"100vw"}
        className="flex flex-row items-center justify-center px-10 max-md:px-0"
        footer={""}
      >
        <div className="flex max-md:flex-col    gap-5 max-md:w-full items-start justify-center ">
        <AgreementPayment handleCancel={handleCancel} formData={formData} target={targetRef} />

        <AgreementReady
          formData={formData}
          target={targetRef}
          setdownload={setdownload}
        />
        </div>

      </Modal>
    </div>
  );
};

export default Annexures;
