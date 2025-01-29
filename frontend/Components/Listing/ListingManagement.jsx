import { Divider, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
// import PGCard from "./PGCard";
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
// import DropDown from "./DropDown.jsx";
import { IoIosArrowForward } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
// import DescriptionOnwer from "./DescriptionOwner.jsx";
import PGCard from "../Owner/PGCard.jsx";
import DropDown from "../Owner/DropDown.jsx";
import DescriptionOnwer from "../Owner/DescriptionOwner.jsx";
import { getUserListing } from "../../store/Action/User.js";
import {
  clearErrorUser,
  clearMessageUser,
} from "../../store/Reducer/UserReducer.js";
import { getAllPlans } from "../../store/Action/Others.js";
import ListRequirement from "../../Pages/ListRequirement.jsx";
import AddProperty from "./AddProperty.jsx";

const ListingManagement = () => {
  const { listing, message, error, loading } = useSelector(
    (state) => state.User
  );
  const { user } = useSelector((state) => state.Auth);
  const { plan } = useSelector((state) => state.Others);
  const dispatch = useDispatch();

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
    // setgender(detail?.gender);
    // setSecurityDeposit(detail?.securityDeposit);
    // setNoticePeriod(detail?.noticePeriod);
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
    dispatch(getUserListing());
    dispatch(getAllPlans());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getUserListing());

      dispatch(clearMessageUser());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorUser());
    }
  }, [message, error, loading, dispatch]);
  if (loading) {
    return <Loading />;
  }
  //   console.log(dets );

  return (
    <>
      <h1 className="text-2xl max-md:text-xl mb-2 font-semibold">
        Manage Listings
      </h1>
      <Divider className="md:w-[92%]" />

      <div className="w-full  py-5 pr-[6vw] max-md:pr-0 flex flex-col gap-4">
        {listing?.length > 0 && listing ? (
          listing?.map((i, index) => (
            <PGCard
              showModal={handleOpen}
              status={i.status}
              data={i}
              key={index}
              listing={true}
            />
          ))
        ) : (
          <div className="w-full h-[50vh] flex items-center flex-col justify-center">
            {user?.flateOwner && (
              <h1 className="text-3xl text-center w-[50%]">
                With thousands of tenants waiting, list your Flat to easily find
                renters in your area.
              </h1>
            )}

            <NavLink
              // type="submit"
              to={"/user/addlisting"}
              className="bg-primary w-fit py-3 px-8 text-white text-xl rounded-md mt-5 ml-5"
            >
              Add New Listing <i className="ri-arrow-right-s-line"></i>
            </NavLink>
          </div>
        )}

        {/* <PGCard status={"Published"} />
        <PGCard status={"Rejected"} /> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-full flex items-center justify-center"
      >
        <div className="w-[80%] mx-auto my-auto relative overflow-y-auto overflow-x-hidden px-32 py-20 bg-white h-[80vh]">
          <div
            className="flex justify-end cursor-pointer"
            onClick={handleClose}
          >
            <span>
              <RiCloseLargeFill size={30} />
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-center mb-4">
              Edit your Listing
            </h2>
            {/* <p className="text-center text-gray-500 mb-6">
              Thousands of tenants are waiting for PG
            </p> */}
          </div>
          <AddProperty closePop={setOpen} listing={dets} />
          <div></div>
        </div>
      </Modal>
      <div className="w-[92%] max-md:w-full ">
        {user?.flateOwner ? (
          <PremiumPosterDets data={plan} type={"Flat"} />
        ) : (
          <PremiumPosterDets data={plan} type={"Roommate"} />
        )}
      </div>
    </>
  );
};

export default ListingManagement;
