import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the styles for react-quill
import ReactQuill from "react-quill";

const DescriptionOnwer = ({
  description,
  setDescription,
  isConfirmed,
  setIsConfirmed,
}) => {
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  return (
    <div className="  px-2  bg-white rounded-lg">
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description *
        </label>
        <div className="border-2 border-[#bc2c3d] rounded-md overflow-hidden">
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            className="w-full h-[14rem]"
            placeholder="Enter the description here..."
          />
        </div>
      </div>

      <div className="flex  justify-start items-center">
        <input
          id="confirmCheckbox"
          type="checkbox"
          checked={isConfirmed}
          onChange={handleCheckboxChange}
          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
        />

        <div>
        <label htmlFor="confirmCheckbox" className="text-gray-700   text-[15px] max-md:text-[10px]">
          I confirm that the information given in this form is true.
        </label>
        </div>

      </div>

    </div>
  );
};

export default DescriptionOnwer;
