import React, { useState } from "react";

const ChipDropdown = ({
  options,
  setSelectedOption,
  selectedOption,
  border,
  isOpen,
  toggleDropdown,
}) => {
  const selectOption = (option) => {
    setSelectedOption(option);
    toggleDropdown(); // Close the dropdown after selection
  };

  return (
    <div className="relative w-full">
      <div
        className={`min-w-full   flex items-center text-lg justify-between max-md:pl-0 ${
          !border && "border-2"
        } border-gray-300 bg-white rounded-lg cursor-pointer`}
        onClick={toggleDropdown}
      >
        {selectedOption}
        {options && (
          <svg
            className={`w-5 h-5 text-primary transition-all duration-200 ease-linear ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>

      {isOpen && (
        <ul className="min-w-28 max-md:w-full bg-white absolute rounded-b-2xl left-1/2 -translate-x-1/2 mx-auto border-2 border-gray-300 rounded-none z-10 max-h-52 overflow-hidden overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 px-4 hover:bg-gray-200 cursor-pointer text-sm flex"
              onClick={() => selectOption(option.name)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipDropdown;
