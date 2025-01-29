import { Divider, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PGCard from "./PGCard";
import PremiumPosterDets from "../Premium/PremiumPosterDets";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerPg } from "../../store/Action/Owner";
import { toast } from "react-toastify";
import { clearErrorOwner, clearMessageOwner } from "../../store/Reducer/Owner";
import Loading from "../Loading";
import { NavLink } from "react-router-dom";
// import Description from "./Description";
import PrefrenceCard from "../PrefrenceCard";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import InputList from "../InputList";
import DropDown from "./DropDown.jsx";
import { IoIosArrowForward } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import DescriptionOnwer from "./DescriptionOwner.jsx";
import { getAllPlans } from "../../store/Action/Others.js";

const PGManagement = () => {
  const { pg, message, error, loading } = useSelector((state) => state.Owner);
  const dispatch = useDispatch();
  const { plan } = useSelector((state) => state.Others);
  const [selectedPG, setSelectedPG] = useState("Male");
  // const { message, error, loading } = useSelector((state) => state.Owner);
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
  const [dets, setdets] = useState("");
  const fileInputRef = useRef(null);
  const [privateN, setprivateN] = useState(false);
  const openFileInput = () => {
    fileInputRef.current.click();
  };
  const [selectedPrefrence, setselectedPrefrence] = useState([]);
  const [gender, setgender] = useState("Male");
  const uploadImages = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...images]);
    setOpen(true);
  };
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = (detail) => {
    setOpen(true);
    setdets(detail);
    setgender(detail?.gender);
    setSecurityDeposit(detail?.securityDeposit);
    setNoticePeriod(detail?.noticePeriod);
  };
  const handleClose = () => setOpen(false);
  // const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("pgName", e.target.pgName.value);
    formData.append("location", e.target.location.value);
    formData.append("mobile", e.target.mobile.value);
    formData.append("occupancy", e.target.single.value);
    formData.append(
      "rent",
      JSON.stringify({
        single: e.target.single.value,
        double: e.target.double.value,
        triple: e.target.triple.value,
      })
    );
    formData.append("elecricityCharges", e.target.elecricityCharges.value);
    formData.append("securityDeposit", securityDeposit);
    formData.append("noticePeriod", noticePeriod);
    formData.append("amenities", JSON.stringify(selectedPrefrence));
    formData.append("description", description);
    formData.append("gender", gender);
    const files = Array.from(fileInputRef.current.files);

    for (let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i]);
    }
    dispatch(addPg(formData));
    setSecurityDeposit("");
    setNoticePeriod("");
    setDescription("");
    setgender("Male");
  };
  useEffect(() => {
    dispatch(getOwnerPg());
    dispatch(getAllPlans());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getOwnerPg());

      dispatch(clearMessageOwner());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorOwner());
    }
  }, [message, error, loading, dispatch]);
  if (loading) {
    return <Loading />;
  }
  console.log(dets);

  return (
    <>
      <h1 className="text-2xl mb-2 font-semibold">Manage PG</h1>
      <Divider className="md:w-[92%]" />

      <div className="w-full py-5 pr-[6vw] max-md:pr-0 flex flex-col gap-4">
        {pg?.length > 0 && pg ? (
          pg?.map((i, index) => (
            <PGCard
              showModal={handleOpen}
              status={i.status}
              data={i}
              key={index}
              id={i?._id}
            />
          ))
        ) : (
          <div className="w-full h-[50vh] flex items-center flex-col justify-center">
            <h1 className="text-3xl text-center w-[50%]">
              With thousands of tenants waiting, list your PG to easily find
              renters in your area.
            </h1>
            <NavLink
              // type="submit"
              to={"/owner/list"}
              className="bg-primary w-fit py-3 px-8 text-white text-xl rounded-md mt-5 ml-5"
            >
              Add Your PG <i className="ri-arrow-right-s-line"></i>
            </NavLink>
          </div>
        )}

        {/* <PGCard status={"Published"} />
        <PGCard status={"Rejected"} /> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className="w-full  flex items-center justify-center"
      >
        <div className="w-[90%] px-20 max-md:px-5   mx-auto my-auto relative overflow-y-auto overflow-x-hidden  py-10  bg-white h-[80vh]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-semibold ">Edit your PG</h2>
              {/* <p className="text-center text-gray-500 mb-6">
              Thousands of tenants are waiting for PG
            </p> */}
            </div>
            <div className=" cursor-pointer" onClick={handleClose}>
              <span>
                <RiCloseLargeFill size={30} />
              </span>
            </div>
          </div>

          <div>
            <form className="">
              {/* Input Fields for basic information */}
              <div className="flex max-md:flex-wrap max-md:w-fit bg-white   justify-center items-center">
                <div className="w-full">
                  <InputList
                    name="name"
                    title="Your Name "
                    placeholder="Enter your name"
                    required={true}
                    val={dets?.name}
                  />
                </div>
                <div className="w-full">
                  <InputList
                    name="mobile"
                    title="Mobile Number"
                    placeholder="Enter your mobile number"
                    required={true}
                    val={dets?.mobile}
                  />
                </div>
                <div className="w-full">
                  <InputList
                    name="pgName"
                    title="PG Name"
                    placeholder="Enter PG name"
                    required={true}
                    val={dets?.pgName}
                  />
                </div>
              </div>

              {/* PG Gender Selection */}
              <div className="flex max-md:flex-wrap w-full md:pl-2  justify-center items-center">
                <div className="mt-9">
                  <label className="font-bold">
                    PG for <span className="text-[#bc2c3d]">*</span>
                  </label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Both"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setgender(type)}
                        className={`py-2 border-2 max-md:px-5 px-20 rounded-lg ${
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
                <div className="w-full">
                  <InputList
                    name="location"
                    title="Add Your Location *"
                    placeholder="Enter location"
                    val={dets?.location}
                  />
                </div>
              </div>

              {/* Additional Input Fields */}
              <div className="flex w-full max-md:flex-wrap justify-center items-center">
                <div className="w-full">
                  <InputList
                    name="single"
                    title="Occupancy"
                    placeholder="Single Rent (e.g ₹ 5000 )"
                    val={dets?.rent?.single}
                  />
                </div>
                <div className="w-full mt-6 max-md:mt-0">
                  <InputList
                    placeholder="Double Rent (e.g ₹ 5000 )"
                    name={"double"}
                    val={dets?.rent?.double}
                  />
                </div>
                <div className="w-full mt-6 max-md:mt-0">
                  <InputList
                    placeholder="Triple Rent (e.g ₹ 5000 )"
                    name={"triple"}
                    val={dets?.rent?.triple}
                  />
                </div>
              </div>
              <div className="flex w-full max-md:flex-wrap justify-center items-center">
                <div className="w-full">
                  {/* <InputList  /> */}

                  <DropDown
                    securityDeposit={securityDeposit}
                    setSecurityDeposit={setSecurityDeposit}
                    noticePeriod={noticePeriod}
                    setNoticePeriod={setNoticePeriod}
                    maintain={dets?.mn}
                    electricity={dets?.elecricityCharges}
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
              <div className="flex  mt-6 flex-col items-start w-full gap-2 rounded-xl px-2">
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
              <div className="px-2">
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
                  className="w-[12rem] max-md:w-[8rem] text-xl max-md:text-sm bg-[#bc2c3d] flex justify-center items-center gap-2 text-white py-3 max-md:py-2 rounded-xl "
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
      </Modal>
      <PremiumPosterDets data={plan} type={"PG"} />
    </>
  );
};

export default PGManagement;
