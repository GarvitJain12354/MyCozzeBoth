import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../store/Action/Others";
import ChipDropdown from "./Auth/ChipDropdown";
import axios from "axios";

const FilterChip = ({ search, location, owner, type, settype, selectedC }) => {
  const { city } = useSelector((state) => state.Others);
  const [selectedS, setselectedS] = useState("Select a city");
  const [price, setprice] = useState("Upto 5k");
  const [selectedGender, setselectedGender] = useState("Any");
  const [cityOption, setcityOption] = useState([
    {
      name: "Select a city",
    },
  ]);
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const dropdownRef = useRef(null);
  const [name, setName] = useState(location);

  const [data, setData] = useState([]);

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
  async function getAccessToken() {
    try {
      const response = await axios.post(
        "https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          scope: "openid",
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return response.data.access_token;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  }
  async function fetchAutocomplete(searchText) {
    setName(searchText);
    if (searchText.trim() === "") {
      setData([]);
      // setShowDropdown(false);
      return;
    }

    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        `https://api.olamaps.io/places/v1/autocomplete`,
        {
          params: { input: searchText },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const places = response.data.predictions.map((prediction) =>
        prediction.terms.map((term) => term.value).join(", ")
      );
      setData(places);
      setShowDropdown(true);
    } catch (error) {
      console.error(
        "Error fetching autocomplete results:",
        error.response?.data || error.message
      );
    }
  }
  console.log(data, 753);

  return (
    <div className="min-w-[40%] bg-white max-md:w-full z-20 flex flex-col md:flex-row flex-wrap items-center gap-5 justify-center px-4 py-2 rounded-full border-2 shadow-xl">
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
        <div className="relative w-[30vw] flex  items-center justify-center max-md:w-full">
          <input
            type="text"
            placeholder="Enter the location"
            className="w-full border-b-2 border-primary outline-none overflow-x-auto"
            value={name}
            onChange={(e) => fetchAutocomplete(e.target.value)}
          />
          {showDropdown && data?.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full mt-1 w-full bg-white shadow-lg border rounded-lg max-h-[30vh] overflow-y-auto z-30"
            >
              {data.length > 0 ? (
                data?.map((place, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setName(place);
                      setShowDropdown(false);
                    }}
                  >
                    {place}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
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
        onClick={() => search(type, name, price, selectedGender)}
        className="bg-primary text-white px-8 py-2 rounded-full text-sm font-normal w-full md:w-auto"
      >
        Search
      </button>
    </div>
  );
};

export default FilterChip;
