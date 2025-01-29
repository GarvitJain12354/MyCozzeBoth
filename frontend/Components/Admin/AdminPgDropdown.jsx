import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatusListing, updateStatusPg } from "../../store/Action/Admin";

const AdminPgDropdown = ({ options, data, id, border }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(data);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const selectOption = (option) => {
    // setSelectedOption(option);
    const dets = {
      status: option,
    };
    dispatch(updateStatusPg(id, dets));
    setIsOpen(false);
  };
useEffect(() => {

}, [selectOption])

  return (
    <div className="relative w-full">
      {data === "Pending" && (
        <div
          className={`w-full p-2 pl-2 flex items-center justify-between  text-base ${
            !border && "border-2"
          }  border-yellow-300 bg-yellow-200  rounded-lg cursor-pointer`}
          onClick={toggleDropdown}
        >
          {selectedOption}
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
        </div>
      )}
         {data === "Published" && (
        <div
          className={`w-full p-2 pl-2 flex items-center justify-between  text-base ${
            !border && "border-2"
          }  border-green-300 bg-green-300  rounded-lg cursor-pointer`}
          onClick={toggleDropdown}
        >
          {selectedOption}
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
        </div>
      )}
           {data === "Rejected" && (
        <div
          className={`w-full p-2 pl-2 flex items-center justify-between  text-base ${
            !border && "border-2"
          }  border-red-300 bg-red-300  rounded-lg cursor-pointer`}
          onClick={toggleDropdown}
        >
          {selectedOption}
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
        </div>
      )}

      {isOpen && (
        <ul className="w-[98%] absolute rounded-b-2xl left-1/2 -translate-x-1/2 mx-auto border-2 border-gray-300 bg-white rounded-none z-10 max-h-52 overflow-hidden overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 px-4 hover:bg-gray-200 cursor-pointer text-sm"
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

export default AdminPgDropdown;
