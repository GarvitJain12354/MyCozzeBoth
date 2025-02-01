import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLocationSearch } from "../../store/Action/User";

const Page1 = ({ type, settype, search, user }) => {
  const el = useRef(null);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const dropdownRef = useRef(null);

  useEffect(() => {
    const typed = new Typed("#text", {
      strings: ["Roommate", "Flats", "PGs"],
      typeSpeed: 60,
      loop: true,
      backSpeed: 50,
      backDelay: 1000,
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const clientId = "b9e290e7-f181-4ac6-aa6f-b2060d85c369";
  const clientSecret = "livnPf1BP8oJM99urlqXjltKqnjLi0E7";

  async function getAccessToken() {
    try {
      const response = await axios.post(
        "https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          scope: "openid",
          client_id: clientId,
          client_secret: clientSecret,
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
      setShowDropdown(false);
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

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
useEffect(() => {
if(name === ""){
  setData([])
  setShowDropdown(false);

}
}, [name])
const dispatch = useDispatch()
const handleClick = ()=>{
  dispatch(getLocationSearch(name))
}

  return (
    <div className="h-screen w-full flex flex-col items-center gap-5 justify-center relative">
      <h1 className="text-4xl md:text-5xl text-center relative z-20">
        <span>The</span> <br className="md:hidden" /> best way to find{" "}
        <br className="md:hidden" />
        <span
          id="text"
          ref={el}
          className="text-primary font-extrabold relative z-20"
        ></span>
      </h1>
      <h3 className="w-[90%] md:w-[70%] lg:w-[60%] text-center text-sm md:text-base relative z-20">
        MyCozee connects you to millions of people looking for roommates and
        posting rooms, PGs you can't find anywhere else. Stop stressing and let
        us help you find the right fit.
      </h3>

      <div className="w-[40%] max-md:w-full z-20 flex flex-col items-center gap-3 relative">
        {/* Input Field */}
        <div className="flex w-full items-center justify-center ">
        <input
          type="text"
          placeholder="Enter the location"
          className="w-full p-2 rounded-xl border-2 border-primary rounded-r-none outline-primary"
          value={name}
          onChange={(e) => fetchAutocomplete(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="bg-primary w-fit h-full text-white p-2 rounded-xl rounded-l-none border-3 px-8"
        >
          Search
        </button>
        </div>
      
        {/* Dropdown List (Wrapped with div for position control) */}
        {showDropdown && data.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full mt-1 w-full bg-white shadow-lg border rounded-lg max-h-[30vh] overflow-y-auto z-30"
          >
            {data.length > 0 ? (
              data.map((place, index) => (
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

        {/* Search Button */}
      </div>

      {/* Background Images */}
      <img
        src="/homeBg.png"
        className="img1 w-full h-[30%] md:h-[55%] object-cover absolute bottom-0 left-0 hidden md:block"
        alt="Background"
      />
      <img
        src="/homePage.png"
        className="img2 w-full h-[30%] md:h-[50%] object-cover absolute bottom-0 left-0 block md:hidden"
        alt="Background"
      />
    </div>
  );
};

export default Page1;
