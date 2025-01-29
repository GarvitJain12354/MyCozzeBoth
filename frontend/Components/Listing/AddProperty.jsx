import React, { useEffect, useRef, useState } from "react";
import InputCustom from "../InputCustom";
import {
  Box,
  colors,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { NavLink, useNavigate } from "react-router-dom";
import { Image, Modal, Button, Tooltip } from "antd";
import {
  deleteListingProperty,
  getUserListing,
  updateListingProperty,
  uploadListingProperty,
} from "../../store/Action/User";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorUser,
  clearMessageUser,
} from "../../store/Reducer/UserReducer";
import Loading from "../Loading";
import PrefrenceCard from "../PrefrenceCard";
import { getAllCity } from "../../store/Action/Others";
import CustomDropdown from "../Auth/CustomDropDown";
import axios from "axios";
import LocationSelector from "./Suggest";

const AddProperty = ({ settype, user, listing, closePop }) => {
  const { message, loading, error } = useSelector((state) => state.User);
  const [gender, setGender] = useState(listing?.gender || "Male");
  const [selectedPrefrence, setselectedPrefrence] = useState([]);

  const [ocuSelected, setOcuSelected] = useState(
    listing?.occupancy || "Single"
  );
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(listing?.images || []); // Existing images from listing
  const [removedImages, setRemovedImages] = useState([]); // Images to be removed from listing
  const [selectedHigh, setSelectedHigh] = useState([]);
  const fileInputRef = useRef(null);
  const [privateN, setprivateN] = useState(listing?.public || false);
  const [selectedCity, setselectedCity] = useState(listing?.city);
  console.log(selectedCity, 896);

  const openFileInput = () => {
    fileInputRef.current.click();
  };
  const { city } = useSelector((state) => state.Others);
  // useEffect(() => {
  //   dispatch(getUserListing());
  // }, []);
  useEffect(() => {
    setSelectedHigh(listing?.highlights || []);
    setExistingImages(listing?.images || []);
    setselectedPrefrence(listing?.amenities || []);
    dispatch(getAllCity());
    if (listing) {
      setselectedCity(listing?.city);
    } else {
      setselectedCity("Select a city");
    }
  }, [listing]);
  console.log(selectedPrefrence, 963, ":dsf");

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
  const amenityData = [
    {
      prefrence: "TV",
    },
    {
      prefrence: "Broadband",
    },
    {
      prefrence: "CCTV",
    },
    {
      prefrence: "Parking",
    },
    {
      prefrence: "Air Condition",
    },
    {
      prefrence: "Refrigerator",
    },
    {
      prefrence: "Laundry",
    },
    {
      prefrence: "Battery",
    },
  ];
  const removeImage = (image, fromExisting = false) => {
    if (fromExisting) {
      setExistingImages((prevImages) =>
        prevImages.filter((img) => img.url !== image.url)
      );
      setRemovedImages((prev) => [...prev, image]); // Add to removed images
    } else {
      setSelectedImages((prevImages) =>
        prevImages.filter((img) => img !== image)
      );
    }
  };

  const genderD = [
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Others" },
  ];

  const occupancy = [{ occu: "Single" }, { occu: "Shared" }, { occu: "Any" }];
  const highlight = [
    "Balcony",
    "Market nearby",
    "Close to Metro",
    "Attached Washroom",
    "Public transport",
    "Gated society",
    "No restrictions",
    "Newly built",
    "House Keeping",
    "Seperate washrooms",
    "Park nearby",
    "Gym nearby",
  ];
  const navigate = useNavigate();
  const handleHightlight = (i) => {
    if (selectedHigh?.indexOf(i) === -1) {
      setSelectedHigh([i, ...selectedHigh]);
    } else {
      const filter = selectedHigh?.filter((j) => j !== i);
      setSelectedHigh(filter);
    }
  };
  const dispatch = useDispatch();
  const submitDets = (e) => {
    e.preventDefault();
    console.log("Hello");

    const formData = new FormData();

    // Adding location, rent, gender, occupancy, highlights, and public flag
    formData.append("location", e.target.location.value);
    formData.append("city", selectedCity);
    formData.append("approxRent", e.target.rent.value);
    formData.append("gender", gender);
    formData.append("occupancy", ocuSelected);
    formData.append("highlights", JSON.stringify(selectedHigh));
    formData.append("public", privateN);
    formData.append("amenities", JSON.stringify(selectedPrefrence));
    formData.append("description", e.target.description.value);

    // Append each selected image file to the formData
    const files = Array.from(fileInputRef.current.files);

    for (let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i]);
    }

    // Check if there are at least 5 images

    // Check if the listing exists
    if (listing && listing !== "") {
      // Update existing listing
      if (existingImages.length + selectedImages.length < 5) {
        return toast.error("Please upload at least 5 images");
      }
      formData.append("oldImage", JSON.stringify(existingImages));
      dispatch(updateListingProperty(listing?._id, formData));
      setSelectedImages([]);
      closePop(false);
    } else {
      if (selectedImages.length < 5) {
        return toast.error("Please upload at least 5 images");
      }
      // Create new listing
      dispatch(uploadListingProperty(formData));
      // dispatch(getUserListing());
      // navigate("/");
    }
  };
  const fetchNearbyPlaces = async (city, lat, lng) => {
    const apiKey = "30ef0b29005743f0a941ef522552ae6e";
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          city
        )}&key=${apiKey}&proximity=${lat},${lng}&radius=10000`
      );

      const suggestions = response.data.results.map(
        (result) => result.formatted
      );
      console.log("Nearby suggestions:", suggestions);
      return suggestions;
    } catch (error) {
      console.error("Error fetching location data:", error);
      return [];
    }
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  // Example usage for Bhopal with a 10 km radius

  // const navigate= useNavigate()
  useEffect(() => {
    if (message === "Listing added succesfully") {
      toast.success(message);
      dispatch(clearMessageUser());
      navigate("/user/successfully");
    } else if (message) {
      toast.success(message);
      dispatch(getUserListing());
      dispatch(clearMessageUser());
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorUser());
    }
    fetchNearbyPlaces("Bhopal", 23.2599, 77.4126);
  }, [message, error, loading, dispatch]);
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
    dispatch(deleteListingProperty(listing?._id));
    // dispatch(getUserListing());
    setIsModalOpen(false);
  };
  const deleteTenant = (id) => {};
  if (loading) {
    return <Loading />;
  }
  return (
    <form
      onSubmit={submitDets}
      className="w-full min-h-screen flex items-center flex-col pb-10 px-[10vh] max-md:px-[3vh]"
    >
      {!listing && (
        <>
          <h1 className="text-4xl font-semibold mt-10 max-md:text-base text-center">
            Share Your Requirements and Get Connected!
          </h1>
          <p className="w-1/2 mt-2 text-xl text-center max-md:w-full max-md:text-base">
            Post what you're looking for, and let potential tenants or roommates
            reach out to you directly.
          </p>
        </>
      )}

      {/* <LocationSelector/> */}
      <div className="w-full grid grid-cols-2 items-center mt-8 place-content-center place-items-center max-md:grid-cols-1">
        <div className="flex w-full items-start h-full justify-center max-md:flex-wrap">
          <div className="flex ml-0 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0 ">
            <label className="font-extrabold">
              Select City <span className="text-primary">*</span>
            </label>
            <CustomDropdown
              selectedOption={selectedCity}
              setSelectedOption={setselectedCity}
              options={city}
              width={"100%"}
            />
          </div>

          <div className="flex ml-0 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
            <label className="font-extrabold">
              Add your address <span className="text-primary">*</span>
            </label>
            <input
              type={"text"}
              placeholder={"Add location"}
              className="w-full p-2 rounded-xl border-2 outline-primary max-md:w-full"
              name={"location"}
              defaultValue={listing?.location}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 p-2 items-start h-full justify-center">
          <label className="font-extrabold mt-4">
            Looking for <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2 w-full">
            {genderD.map((i, index) => (
              <div
                key={index}
                onClick={() => setGender(i.gender)}
                className={`py-2 px-10 text-lg flex items-center justify-center text-center border-[1px] w-full border-primary ${
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
        {/* <InputCustom
          title={"Approx. rent"}
          required={true}
          type={"number"}
          name={"rent"}
          placeholder={``}
          val={listing?.approxRent}
        /> */}
        <div className="flex ml-0 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
          <label className="font-extrabold">
            Approx. rent <span className="text-primary">*</span>
          </label>
          <input
            type={"number"}
            placeholder={"₹ 5000"}
            className="w-full p-2 rounded-xl border-2 outline-primary max-md:w-full"
            name={"rent"}
            required={true}
            defaultValue={listing?.approxRent}
          />
        </div>
        <div className="flex w-full flex-col gap-2 p-2 h-full items-start justify-center">
          <label className="font-extrabold mt-4">Occupancy</label>
          <div className="grid grid-cols-3 gap-2 w-full">
            {occupancy.map((i, index) => (
              <div
                key={index}
                onClick={() => setOcuSelected(i.occu)}
                className={`py-2 px-10 text-lg text-center flex items-center justify-center border-[1px] w-full border-primary ${
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

      {/* Image Upload Section */}
      {/* Image Upload Section */}
      <div className="flex ml-3 mt-6 flex-col items-start w-full gap-2 rounded-xl p-4">
        <label className="font-extrabold">
          Upload Room/PG Images (At least 5 ){" "}
          <span className="text-primary">*</span>
        </label>
        <div className="relative w-full">
          <div
            onClick={openFileInput}
            className="flex flex-col items-center justify-center p-6 px-14 max-md:px-4 max-md:py-4 py-14 gap-2 text-lg font-semibold border-[1px] rounded-xl cursor-pointer bg-white border-primary"
          >
            <Icon icon="bi:camera" style={{ color: "Red", fontSize: "30px" }} />
            <h3 className="text-gray-300 font-extralight text-base text-center leading-loose">
              Click Camera icon or drag and drop your images here to upload.
              <br />
              (JPG, PNG, JPEG).
              <br />
              Max size: 25 MB
            </h3>
            <input
              type="file"
              name="img"
              accept=".png, .jpg, .jpeg .avif"
              ref={fileInputRef}
              multiple
              hidden
              onChange={uploadImages}
            />
          </div>
        </div>
      </div>

      {/* Display Images */}
      <div className="flex gap-4 ml-3 mt-6 flex-wrap w-full">
        {/* Existing Images */}
        {existingImages.length > 0 && (
          <>
            {existingImages.map((image, index) => (
              <div key={index} className="relative ml-3">
                <Image
                  src={image.url}
                  alt="Room"
                  width={100}
                  className="border-2 rounded-xl"
                  height={100}
                />
                <Icon
                  onClick={() => removeImage(image, true)} // 'true' indicates this is an existing image
                  icon="ep:close-bold"
                  style={{ color: "white" }}
                  className="absolute text-xs h-5 flex items-center justify-center w-5 top-0 right-0 cursor-pointer bg-primary rounded-full"
                  width={10}
                  height={10}
                />
              </div>
            ))}
          </>
        )}
        {/* New Uploaded Images */}
        {selectedImages.length > 0 && (
          <>
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt="Room"
                  width={80}
                  height={100}
                  className="object-contain"
                />
                <Icon
                  onClick={() => removeImage(image)} // No 'true', means new uploaded image
                  icon="mdi:trash-can-outline"
                  className="absolute top-0 right-0 cursor-pointer text-red-500"
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex w-full flex-col gap-3 p-2 mt-6">
        <label className="font-extrabold">
          Choose highlights for your property*
        </label>
        <div className="flex gap-2 flex-wrap items-center justify-start">
          {highlight.map((i, index) => (
            <div
              key={index}
              onClick={() => handleHightlight(i)}
              className={`py-2 px-10 max-md:px-3 text-lg border-[1px] border-primary ${
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
      <div className="flex w-full flex-col gap-2 p-2 mt-6 max-md:flex-wrap">
        <label className="font-extrabold">
          Do you want to make your mobile no. public ?{" "}
          <Tooltip placement="topLeft" title={"If your phone is private, others can only contact you through chats ."}>
          <i className="ri-information-2-fill text-primary"></i>
          </Tooltip>
          <span className="text-primary">*</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          <div
            onClick={() => setprivateN(true)}
            className={`py-2 px-10 max-md:w-full flex items-center justify-center text-lg border-[1px] border-primary ${
              privateN ? "text-white bg-primary" : "text-primary bg-white"
            } rounded-md font-extralight cursor-pointer`}
          >
            Yes, Make it public
          </div>
          <div
            onClick={() => setprivateN(false)}
            className={`py-2 px-10 max-md:w-full flex items-center justify-center text-lg border-[1px] border-primary ${
              !privateN ? "text-white bg-primary" : "text-primary bg-white"
            } rounded-md font-extralight cursor-pointer`}
          >
            Keep it private
          </div>
        </div>
      </div>
      <div className="px-4 mt-6">
        <h1 className="mb-4 font-bold">
          Amenities <span className="text-[#bc2c3d]">*</span>
        </h1>
        <div className="flex flex-wrap gap-4 max-md:gap-2">
          {amenityData.map((amenity) => (
            <div key={amenity.id}>
              <PrefrenceCard
                setselectedPrefrence={setselectedPrefrence}
                selectedPrefrence={selectedPrefrence}
                data={amenity}
                isInitiallySelected={
                  !!selectedPrefrence.find(
                    (pref) => pref.prefrence === amenity.prefrence
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 p-2 mt-6">
        <label className="font-extrabold">Description *</label>
        <textarea
          name="description"
          id=""
          defaultValue={listing?.description ? listing?.description : "I am looking for a roommate"}
          className="p-2 border-[1px] h-48 border-primary outline-none rounded-lg "
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-primary mt-5 text-white px-8 rounded-full py-2"
      >
        Submit <i className="ri-arrow-right-s-line"></i>
      </button>

      <h4 className="mt-5">
        Have a room and need a tenant ?{" "}
        <button
          onClick={() => settype("tenant")}
          className="border-b-[1px] border-black"
          to={"/"}
        >
          Add Requirement
        </button>
      </h4>
      {listing && listing?.length > 0 && (
        <h4
          onClick={showModal}
          className="mt-2 gap-2 font-semibold text-primary cursor-pointer"
        >
          Delete Listing
          <i className="ri-delete-bin-7-fill"></i>
        </h4>
      )}

      <Modal
        title="Remove Listing"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            <Button
              onClick={handleDelete}
              type="danger"
              className="bg-primary text-white hover:bg-primary"
            >
              Confirm
            </Button>

            <Button onClick={handleCancel}>Cancle</Button>
          </>
        }
        centered
      >
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold">
            Are you sure you want to remove your listing ?
          </h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio color="error" />}
              label="My Requirement is fullfilled ."
            />
            <FormControlLabel
              value="male"
              control={<Radio color="error" />}
              label="No, my requirement is not fullfilled and i am still looking"
            />
          </RadioGroup>
        </div>
      </Modal>
    </form>
  );
};

export default AddProperty;
