import React, { useEffect, useRef, useState } from "react";
import InputCustom from "../InputCustom";
import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Button, Modal, Tooltip } from "antd";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { NavLink, useNavigate } from "react-router-dom";
import { Image } from "antd";
import {
  deleteListingProperty,
  deleteListingTenant,
  getUserTenant,
  updateTenantListing,
  uploadListingProperty,
  uploadRequirement,
} from "../../store/Action/User";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorUser,
  clearMessageUser,
} from "../../store/Reducer/UserReducer";
import Loading from "../Loading";
import CustomDropdown from "../Auth/CustomDropDown";
import { getAllCity } from "../../store/Action/Others";
import TeamUpPopUp from "./TeamUpPopUp";
import axios from "axios";

const AddTenant = ({ settype }) => {
  const { message, loading, error, tenant } = useSelector(
    (state) => state.User
  );
  const [gender, setGender] = useState("Male");
  const [ocuSelected, setOcuSelected] = useState("Single");
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedHigh, setSelectedHigh] = useState([]);
  const fileInputRef = useRef(null);
  const [privateN, setprivateN] = useState(false);
  const [pg, setpg] = useState(true);
  const [team, setteam] = useState(tenant?.isTeam);
  const [selectedCity, setselectedCity] = useState("Select a city");
  const { city } = useSelector((state) => state.Others);
  const [teamOpen, setteamOpen] = useState(false);
  const handleTeamOpen = () => setteamOpen(true);
  const handleTeamClose = () => setteamOpen(false);

  const openFileInput = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (tenant) {
      setSelectedHigh(tenant?.highlights);
      setGender(tenant?.gender);
      setOcuSelected(tenant?.occupancy);
      setpg(tenant?.isPg);
      setprivateN(tenant?.public);
      setteam(tenant?.isTeam);
    }
    dispatch(getAllCity());
    if (tenant) {
      setselectedCity(tenant?.city);
    } else {
      setselectedCity("Select a city");
    }
  }, [tenant]);

  // Handle multiple image uploads
  const uploadImages = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...images]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeImage = (image) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img) => img !== image)
    );
  };

  const genderD = [
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Others" },
  ];

  const occupancy = [{ occu: "Single" }, { occu: "Shared" }, { occu: "Any" }];

  const highlight = [
    "Working full time",
    "College student",
    "Age < 25",
    "Age > 25",
    "Working night shifts",
    "Have pets",
    "Vegan",
    "Will shift immediately",
    "Have 2 wheeler",
    "Have 4 wheeler",
    "Need no furnishing",
  ];

  const handleHightlight = (i) => {
    if (selectedHigh?.indexOf(i) === -1) {
      setSelectedHigh([i, ...selectedHigh]);
    } else {
      const filter = selectedHigh?.filter((j) => j !== i);
      setSelectedHigh(filter);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserTenant());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteListingTenant(tenant?._id));
    dispatch(getUserTenant());
    setIsModalOpen(false);
  };
  const submitDets = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const location = e.target.location.value.trim();
    const approxRent = e.target.rent.value.trim();

    // Validate required fields
    if (
      !location ||
      !approxRent ||
      !gender ||
      !ocuSelected ||
      selectedHigh.length === 0
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }
    // formData.append("city", selectedCity);

    formData.append("location", name);
    formData.append("approxRent", e.target.rent.value);
    formData.append("gender", gender);
    formData.append("occupancy", ocuSelected);
    formData.append("highlights", JSON.stringify(selectedHigh));
    formData.append("public", privateN);
    formData.append("isPg", pg);
    formData.append("isTeam", team);
    formData.append("description", e.target.description.value);
    // Adding location, rent, gender, occupancy, highlights, and public flag
    if (!tenant) {
      dispatch(uploadRequirement(formData));
      dispatch(getUserTenant());
      setGender("Male");
      setOcuSelected("Single");
      setSelectedHigh([]);
      setprivateN(false);
      setpg(true);
      setteam(true);
    } else {
      dispatch(updateTenantListing(tenant?._id, formData));
      // dispatch(getUserTenant())
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (message === "Tenant Requirements added succesfully") {
      toast.success(message);
      dispatch(clearMessageUser());
      navigate("/successfully");
    } else if (message) {
      toast.success(message);
      dispatch(clearMessageUser());
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorUser());
    }
  }, [message, error]);
  const el = useRef(null);
  const [name, setName] = useState(tenant?.location);
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const dropdownRef = useRef(null);
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
    console.log(searchText);

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
      console.log(response);

      const places = response.data.predictions.map((prediction) =>
        prediction.terms.map((term) => term.value).join(", ")
      );

      setData(places);
      setShowDropdown(true);
      console.log(places, 456);
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
    if (name === "") {
      setData([]);
      setShowDropdown(false);
    }
  }, [name]);

  if (loading) {
    return <Loading />;
  }
  return (
    <form
      onSubmit={submitDets}
      className="w-full min-h-screen md:px-[10vh] flex items-center flex-col gap-1 max-md:px-[3vh]"
    >
      <h1 className="text-4xl text-center font-semibold mt-5 max-md:text-lg max-md:text-center w-full">
        Share Your Requirements and Get Connected!
      </h1>
      <p className="w-1/2 mt-2 text-xl text-center max-md:text-sm max-md:w-full ">
        Post what you're looking for, and let potential tenants or roommates
        reach out to you directly.
      </p>

      <div className="w-full grid grid-cols-2 items-center mt-8 max-md:grid-cols-1">
        <div className="flex w-full items-start h-full justify-center max-md:flex-wrap">
          {/* <div className="flex ml-0 max-md:mt-2 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
            <label className="font-extrabold">
              Select City <span className="text-primary">*</span>
            </label>
            <CustomDropdown
              selectedOption={selectedCity}
              setSelectedOption={setselectedCity}
              options={city}
              width={"100%"}
            />
          </div> */}

          <div className="flex relative ml-0 max-md:mt-2 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
            <label className="font-extrabold">
              Add your address <span className="text-primary">*</span>
            </label>
            <input
              type={"text"}
              placeholder={"Add location"}
              className="w-full p-2 rounded-xl border-2 outline-primary max-md:w-full"
              name={"location"}
              value={name}
              onChange={(e) => fetchAutocomplete(e.target.value)}
              defaultValue={tenant?.location}
            />
            {/* Dropdown List (Wrapped with div for position control) */}
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute top-[90%] mt-1 w-full bg-white shadow-lg border rounded-lg max-h-[30vh] overflow-y-auto z-30"
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
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 p-2">
          <label className="font-extrabold mt-4">
            Looking for <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-3  gap-2">
            {genderD.map((i, index) => (
              <div
                key={index}
                onClick={() => setGender(i.gender)}
                className={`py-2 px-10 text-lg w-full flex items-center justify-center text-center border-[1px] border-primary ${
                  gender === i.gender
                    ? "text-white bg-primary"
                    : "text-primary bg-white"
                } rounded-md font-extralight cursor-pointer`}
              >
                {i.gender}
              </div>
            ))}
          </div>
        </div>
        <div className="flex ml-0 max-md:mt-2 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
          <label className="font-extrabold">
            Approx. rent <span className="text-primary">*</span>
          </label>
          <input
            type={"number"}
            placeholder={"₹ 5000"}
            className="w-full p-2 rounded-xl border-2 outline-primary max-md:w-full"
            name={"rent"}
            required={true}
            defaultValue={tenant?.approxRent}
          />
        </div>
        <div className="flex w-full flex-col gap-2 p-2">
          <label className="font-extrabold mt-4">Occupancy</label>
          <div className="grid grid-cols-3 gap-2">
            {occupancy.map((i, index) => (
              <div
                key={index}
                onClick={() => setOcuSelected(i.occu)}
                className={`py-2 px-10 w-full text-lg flex items-center justify-center text-center border-[1px] border-primary ${
                  ocuSelected === i.occu
                    ? "text-white bg-primary"
                    : "text-primary bg-white"
                } rounded-md font-extralight cursor-pointer`}
              >
                {i.occu}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 p-2">
        <label className="font-extrabold">
          Choose highlights for your property*
        </label>
        <div className="flex gap-2 flex-wrap items-center justify-start">
          {highlight.map((i, index) => (
            <div
              key={index}
              onClick={() => handleHightlight(i)}
              className={`py-2 px-6 text-lg border-[1px] border-primary ${
                selectedHigh?.indexOf(i) !== -1
                  ? "text-white bg-primary"
                  : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full max-md:flex-wrap">
        <div className="flex w-full flex-col gap-2  mt-4">
          <label className="font-extrabold">
            Are you Interested in PG too?{" "}
            {/* <i className="ri-information-2-fill"></i> */}
          </label>
          <div className="flex gap-2">
            <div
              onClick={() => setpg(true)}
              className={`py-2 px-6  text-lg border-[1px] border-primary ${
                pg ? "text-white bg-primary" : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              Yes
            </div>
            <div
              onClick={() => setpg(false)}
              className={`py-2 px-6  text-lg border-[1px] border-primary ${
                !pg ? "text-white bg-primary" : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              No, Not interested
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2  mt-4">
          <label className="font-extrabold">
            Are you Interested in making{" "}
            <span className="text-primary">Teams?</span>{" "}
            <i className="ri-information-2-fill" onClick={handleTeamOpen}>
              {" "}
            </i>
          </label>
          <div className="flex gap-2">
            <div
              onClick={() => setteam(true)}
              className={`py-2 px-4  text-lg border-[1px] border-primary ${
                team ? "text-white bg-primary" : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              Yes
            </div>
            <div
              onClick={() => setteam(false)}
              className={`py-2 px-4  text-lg border-[1px] border-primary ${
                !team ? "text-white bg-primary" : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              No
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2  mt-4 ">
          <label className="font-extrabold">
            Do you want to make your mobile no. public ?{" "}
            <span className="text-primary">*</span>
          </label>
          <div className="flex gap-2">
            <div
              onClick={() => setprivateN(true)}
              className={`py-2 px-4 text-lg border-[1px] border-primary ${
                privateN ? "text-white bg-primary" : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              Yes, Make it public
            </div>
            <div
              onClick={() => setprivateN(false)}
              className={`py-2 px-4 text-lg border-[1px] border-primary ${
                !privateN ? "text-white bg-primary" : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              Keep it private
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 p-2 mt-4">
        <label className="font-extrabold">Description *</label>
        <textarea
          name="description"
          id=""
          defaultValue={
            tenant?.description
              ? tenant?.description
              : "I am looking for a roommate"
          }
          className="p-2 border-[1px] h-48 border-primary outline-none rounded-lg "
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-primary  text-white px-8 rounded-full py-2"
      >
        Submit <i className="ri-arrow-right-s-line"></i>
      </button>

      <h4 className=" text-center">
        Have a room and need a tenant ?{" "}
        <button
          onClick={() => settype("property")}
          className="border-b-[1px] border-black"
          to={"/"}
        >
          Add Room
        </button>
      </h4>
      {tenant && (
        <h4
          onClick={showModal}
          className=" gap-2 font-semibold text-primary cursor-pointer"
        >
          Delete Listing
          <i className="ri-delete-bin-7-fill"></i>
        </h4>
      )}
      <TeamUpPopUp open={teamOpen} handleClose={handleTeamClose} />
      <Modal
        title="Delete Listing"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            <button
              onClick={handleDelete}
              className="bg-primary px-4 py-2 rounded-lg mr-4 text-white"
            >
              Yes
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border-2 rounded-lg"
            >
              No
            </button>
          </>
        }
        centered
      >
        <div className="flex flex-col font-normal">
          <h4 className="text-lg font-normal">
            Are you sure you want to remove your listing?
          </h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="fulfilled"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="fulfilled"
              control={<Radio color="error" />}
              label="My requirement is fulfilled."
            />
            <FormControlLabel
              value="not-fulfilled"
              control={<Radio color="error" />}
              label="No, my requirement is not fulfilled and I am still looking."
            />
          </RadioGroup>
        </div>
      </Modal>
    </form>
  );
};

export default AddTenant;
