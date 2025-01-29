import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../store/Action/Others";
import ChipDropdown from "./Auth/ChipDropdown";

const FilterChip = ({ search, owner, type, settype, selectedC }) => {
  const { city } = useSelector((state) => state.Others);
  const [selectedS, setselectedS] = useState("Select a city");
  const [price, setprice] = useState("Upto 5k");
  const [selectedGender, setselectedGender] = useState("Any");
  const [cityOption, setcityOption] = useState([
    {
      name: "Select a city",
    },
  ]);
  const [openDropdown, setOpenDropdown] = useState(null); // Track the currently open dropdown
  const gender = [
    {
      name: "Any",
    },
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ];
  const option = [{ name: "Roommate" }, { name: "PG" }, { name: "Flat" }];
  const priceOption = [
    

    { name: "Upto 5k" },
    { name: "10k - 15k" },
    { name: "15k - 20k" },
    { name: "20k - 30k" },
    { name: "30k - 40k" },
    { name: "40k+" },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCity());
    if (selectedC) {
      setselectedS(selectedC);
    }
  }, [selectedC]);

  return (
    <div className="min-w-[40%] bg-white max-md:w-full z-20 flex flex-col md:flex-row flex-wrap items-center gap-5 justify-center px-4 py-2 rounded-xl border-2 shadow-xl">
      <div className="flex flex-col px-2 text-lg pr-6 gap-1 border-r-2 border-gray-300 max-md:w-full max-md:border-none">
        <h5 className="text-sm text-black">Looking for</h5>
        <h1 className="text-primary text-2xl font-semibold">
          {owner ? (
            <ChipDropdown
              // options={option}
              border={true}
              selectedOption={"Tenant"}
            />
          ) : (
            <ChipDropdown
              options={option}
              border={true}
              setSelectedOption={settype}
              selectedOption={type}
              isOpen={openDropdown === "type"}
              toggleDropdown={() =>
                setOpenDropdown(openDropdown === "type" ? null : "type")
              }
            />
          )}
        </h1>
      </div>

      <div className="flex flex-col px-2 text-lg pr-6 border-r-2 border-gray-300 max-md:w-full max-md:border-none">
        <h5 className="text-sm text-black">Location</h5>
        <h1 className="text-primary text-lg font-semibold">
          {owner ? (
            <ChipDropdown border={true} selectedOption={selectedS} />
          ) : (
            <ChipDropdown
              options={city}
              border={true}
              setSelectedOption={setselectedS}
              selectedOption={selectedS}
              isOpen={openDropdown === "location"}
              toggleDropdown={() =>
                setOpenDropdown(openDropdown === "location" ? null : "location")
              }
            />
          )}
        </h1>
      </div>

      <div className="flex flex-col px-2 text-lg pr-6 border-r-2 border-gray-300 max-md:w-full max-md:border-none">
        <h5 className="text-sm text-black">Budget</h5>
        <h1 className="text-primary text-lg font-semibold">
          <ChipDropdown
            options={priceOption}
            border={true}
            setSelectedOption={setprice}
            selectedOption={price}
            isOpen={openDropdown === "budget"}
            toggleDropdown={() =>
              setOpenDropdown(openDropdown === "budget" ? null : "budget")
            }
          />
        </h1>
      </div>

      <div className="flex flex-col px-2 text-lg pr-6 max-md:w-full max-md:border-none">
        <h5 className="text-sm text-black">Gender</h5>
        <h1 className="text-primary text-lg font-semibold">
          <ChipDropdown
            options={gender}
            border={true}
            setSelectedOption={setselectedGender}
            selectedOption={selectedGender}
            isOpen={openDropdown === "gender"}
            toggleDropdown={() =>
              setOpenDropdown(openDropdown === "gender" ? null : "gender")
            }
          />
        </h1>
      </div>
      <button
        onClick={() => search(type, selectedS, price, selectedGender)}
        className="bg-primary text-white px-8 py-2 rounded-full text-sm font-normal w-full md:w-auto"
      >
        Search
      </button>
    </div>
  );
};

export default FilterChip;
