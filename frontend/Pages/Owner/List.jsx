import { useEffect, useRef, useState } from "react";
import InputList from "../../Components/InputList";
import Footer from "../../Components/Footer";
// import Amenitie from "../../Components/Owner/Amenitie";
// import cameraplus from "../../src/assets/cameraplus.png";
import { RiCloseLargeFill } from "react-icons/ri";
import DropDown from "../../Components/Owner/DropDown";
import { IoIosArrowForward } from "react-icons/io";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Image } from "antd";
import PrefrenceCard from "../../Components/PrefrenceCard";
import { useDispatch, useSelector } from "react-redux";
import { addPg } from "../../store/Action/Owner";
// import useSelection from "antd/es/table/hooks/useSelection";
import { toast } from "react-toastify";
import { clearErrorOwner, clearMessageOwner } from "../../store/Reducer/Owner";
import Loading from "../../Components/Loading";
import NavBar from "../../Components/NavBar";
import DescriptionOnwer from "../../Components/Owner/DescriptionOwner";
import CustomDropdown from "../../Components/Auth/CustomDropDown";
import { getAllCity } from "../../store/Action/Others";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [selectedPG, setSelectedPG] = useState("Male");
  const { message, error, loading } = useSelector((state) => state.Owner);
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
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // Existing images from listing
  const [removedImages, setRemovedImages] = useState([]); // Images to be removed from listing
  const [selectedHigh, setSelectedHigh] = useState([]);
  const fileInputRef = useRef(null);
  const { city } = useSelector((state) => state.Others);
  const [privateN, setprivateN] = useState(false);
  const [selectedFood, setselectedFood] = useState("");
  const openFileInput = () => {
    fileInputRef.current.click();
  };
  const [selectedPrefrence, setselectedPrefrence] = useState([]);
  const [gender, setgender] = useState("Male");
  const [laundary, setLaundary] = useState("Yes");
  const uploadImages = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...images]);
    setOpen(true);
  };
  const furnished = [
    {
      name: "Fully Furnished",
    },
    {
      name: "Semi Furnished",
    },
    {
      name: "Not Furnished",
    },
  ];
  const foodOptions = [
    {
      name: "1 Time",
    },
    {
      name: "2 Times",
    },
    {
      name: "3 Times",
    },
    {
      name: "Not Included",
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
  const [securityDeposit, setSecurityDeposit] = useState("1 month");
  const [noticePeriod, setNoticePeriod] = useState("15 days");
  const [description, setDescription] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedCity, setselectedCity] = useState("Select a city");
  const [selectedFurniture, setselectedFurniture] =
    useState("Select an option");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("pgName", e.target.pgName.value);
    formData.append("location", name);
    // formData.append("city", selectedCity);
    formData.append("mobile", e.target.mobile.value);
    formData.append("occupancy", e.target.single.value);
    formData.append("furnitured", selectedFurniture);
    formData.append("laundary", laundary);
    formData.append("food", selectedFood);
    formData.append(
      "rent",
      JSON.stringify({
        single: e.target.single.value,
        double: e.target.double.value,
        triple: e.target.triple.value,
      })
    );
    formData.append(
      "elecricityCharges",
      Number(e.target.elecricityCharges.value)
    );
    formData.append("securityDeposit", securityDeposit);
    formData.append("noticePeriod", noticePeriod);
    formData.append("amenities", JSON.stringify(selectedPrefrence));
    formData.append("description", description);
    formData.append("gender", gender);
    const files = Array.from(fileInputRef.current.files);
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i]);
    }
    dispatch(addPg(formData));
    setSecurityDeposit("");
    setNoticePeriod("");
    setDescription("");
    setgender("Male");
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (message === "PG details added succesfully") {
      toast.success(message);
      dispatch(clearMessageOwner());
      navigate("/owner/successfully");
    } else if (message) {
      toast.success(message);
      dispatch(clearMessageOwner());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorOwner());
    }
  }, [message, error, loading]);
  console.log(loading, 458);
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  const [name, setName] = useState("");
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
    if (name === "") {
      setData([]);
      setShowDropdown(false);
    }
  }, [name]);
  return (
    <div>
      <NavBar close={true} />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full px-32 py-20 max-md:px-3">
          {/* <div className="flex justify-end">
      <span>
        <RiCloseLargeFill size={30} />
      </span>
    </div> */}
          <div>
            <h2 className="text-3xl font-semibold text-center mb-4">
              List your PG
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Thousands of tenants are waiting for PG
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="">
              {/* Input Fields for basic information */}
              <div className="flex w-full justify-center items-center max-md:flex-wrap">
                <div className="w-full">
                  <InputList
                    name="name"
                    title="Your Name "
                    placeholder="Enter your name"
                    required={true}
                  />
                </div>
                <div className="w-full">
                  <InputList
                    name="mobile"
                    title="Mobile Number"
                    placeholder="Enter your mobile number"
                    required={true}
                  />
                </div>
                <div className="w-full">
                  <InputList
                    name="pgName"
                    title="PG Name"
                    placeholder="Enter PG name"
                    required={true}
                  />
                </div>
              </div>

              {/* PG Gender Selection */}
              <div className="flex w-full pl-2 justify-center items-center max-md:flex-wrap">
                <div className="mt-9 max-md:w-full px-2">
                  <label className="font-bold">
                    PG for <span className="text-[#bc2c3d]">*</span>
                  </label>
                  <div className="flex max-md:grid grid-cols-3 gap-2 max-md:w-full">
                    {["Male", "Female", "Both"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setgender(type)}
                        className={`py-2 border-2 px-20 max-md:px-4 max-md:w-full rounded-lg ${
                          gender === type
                            ? "bg-[#bc2c3d] text-white border-none"
                            : "bg-white text-black border-[#bc2c3d]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex w-full items-center md:pl-3  h-full justify-center">
                  <div className="w-full  max-md:px-0">
                    <div className="flex relative ml-0 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
                      <label className="font-extrabold">
                        Add your address <span className="text-primary">*</span>
                      </label>
                      <input
                        type={"text"}
                        placeholder={"Add location"}
                        className="w-full p-2 rounded-xl border-2 border-primary outline-primary max-md:w-full"
                        name={"location"}
                        value={name}
                        onChange={(e) => fetchAutocomplete(e.target.value)}
                        // defaultValue={listing?.location}
                      />
                      {showDropdown && data.length > 0 && (
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
                            <div className="p-2 text-gray-500">
                              No results found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full pl-2 justify-center items-center max-md:flex-wrap">
                <div className="flex w-full items-center md:pl-3  h-full justify-center">
                  <div className="w-full mt-6">
                    <label className="font-bold ">Food Type *</label>
                    <select
                      value={selectedFood}
                      onChange={(e) => setselectedFood(e.target.value)}
                      className="w-full border-2 border-[#bc2c3d] outline-none py-2 rounded-xl mt-2"
                    >
                      {foodOptions?.map((i, index) => (
                        <option value={i.name}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex w-full items-center md:pl-3  h-full justify-center">
                  <div className="w-full mt-6">
                    <label className="font-bold ">Furnishing Type *</label>
                    <select
                      value={selectedFurniture}
                      onChange={(e) => setselectedFurniture(e.target.value)}
                      className="w-full border-2 border-[#bc2c3d] outline-none py-2 rounded-xl mt-2"
                    >
                      {furnished?.map((i, index) => (
                        <option value={i.name}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Additional Input Fields */}
              <div className="flex w-full max-md:flex-wrap justify-center items-center">
                <div className="w-full">
                  <InputList
                    name="single"
                    title="Occupancy"
                    placeholder="Single Rent (e.g ₹ 5000 )"
                  />
                </div>
                <div className="w-full mt-6">
                  <InputList
                    placeholder="Double Rent (e.g ₹ 5000 )"
                    name={"double"}
                  />
                </div>
                <div className="w-full mt-6">
                  <InputList
                    placeholder="Triple Rent (e.g ₹ 5000 )"
                    name={"triple"}
                  />
                </div>
              </div>
              <div className="flex w-full max-md:flex-wrap mt-5  justify-center items-center">
                <div className="w-full">
                  {/* <InputList  /> */}

                  <DropDown
                    securityDeposit={securityDeposit}
                    setSecurityDeposit={setSecurityDeposit}
                    noticePeriod={noticePeriod}
                    setNoticePeriod={setNoticePeriod}
                  ></DropDown>
                </div>

                <div className="flex w-full flex-col justify-center items-center">
                  <div className="w-full">
                    {/* <InputList  /> */}

                    <div className="w-full">
                      <InputList
                        name="maintenanceCharges"
                        title="Maintenance Charges (If Any)"
                        placeholder=" ₹ 5000"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <InputList
                      name="elecricityCharges"
                      title="Electricity charges"
                      placeholder=" ₹ 5000"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-9 max-md:w-full px-2 gap-2 flex flex-col">
                <label className="font-bold">Laundary Included</label>
                <div className="flex max-md:grid grid-cols-3 gap-2 max-md:w-full">
                  {["Yes", "No"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setLaundary(type)}
                      className={`py-2 border-2 px-20 max-md:px-4 max-md:w-full rounded-lg ${
                        laundary === type
                          ? "bg-[#bc2c3d] text-white border-none"
                          : "bg-white text-black border-[#bc2c3d]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex  mt-6 flex-col items-start w-full gap-2 rounded-xl p-4">
                <label className="font-extrabold">
                  Upload Room/PG Images <span className="text-primary">*</span>
                </label>
                <div className="relative w-full">
                  <div
                    onClick={openFileInput}
                    className="flex flex-col items-center justify-center p-6 px-14 py-14 gap-2 text-lg font-semibold border-[1px] rounded-xl cursor-pointer bg-white border-primary"
                  >
                    <Icon
                      icon="bi:camera"
                      style={{ color: "Red", fontSize: "30px" }}
                    />
                    <h3 className="text-gray-300 font-extralight text-base text-center leading-loose">
                      Click Camera icon or drag and drop your images here to
                      upload.
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
              <div className="flex gap-4 ml-3 mt-6 flex-wrap w-full">
                {/* New Uploaded Images */}
                {selectedImages.length > 0 && (
                  <>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image}
                          alt="Room"
                          width={200}
                          height={150}
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
              {/* Amenities Section */}
              <div className="px-4">
                <h1 className="mb-4 font-bold">
                  Amenities <span className="text-[#bc2c3d]">*</span>
                </h1>
                <div className="flex flex-wrap gap-4">
                  {amenityData.map((amenity) => (
                    <div key={amenity.id}>
                      <PrefrenceCard
                        setselectedPrefrence={setselectedPrefrence}
                        selectedPrefrence={selectedPrefrence}
                        data={amenity}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Section */}
              <div className="mt-10">
                <DescriptionOnwer
                  setDescription={setDescription}
                  description={description}
                  isConfirmed={isConfirmed}
                  setIsConfirmed={setIsConfirmed}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center items-center w-full">
                <button
                  type="submit"
                  className="w-[12rem] text-xl bg-[#bc2c3d] flex justify-center items-center gap-2 text-white py-3 rounded-xl "
                >
                  Submit{" "}
                  <span>
                    <IoIosArrowForward />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default List;
