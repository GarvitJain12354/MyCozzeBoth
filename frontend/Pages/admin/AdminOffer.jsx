import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOffer,
  getAllPlansAdmin,
  getAllSalesPerson,
  getAllUser,
  updateOfferImage,
  updateOffertext,
  updatePlan,
  updateStatusListing,
  updateStatusSalesPerson,
} from "../../store/Action/Admin";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import { Button, Switch } from "antd";
import AdminSalesPerson from "../../Components/Admin/AdminSalesPerson";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";
import Loading from "../../Components/Loading";
import AdminAddPlans from "../../Components/Admin/AdminAddPlans";
import { getAllPlans } from "../../store/Action/Others";
import InputCustom from "../../Components/InputCustom";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const AdminOffer = () => {
  const dispatch = useDispatch();
  const { sales, totalPages, message, error, loading, plan } = useSelector(
    (state) => state.Admin
  ); // Adjust according to your state structure
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, settext] = useState("");

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const fileInputRef2 = useRef(null);
  const openFileInput2 = () => {
    fileInputRef2.current.click();
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      //   setCroppedImage(croppedUrl);
    }
  };
  // const { plan } = useSelector((state) => state.Others);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearAdminMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [message, error, loading, dispatch]);
  // useEffect(() => {
  // dispatch(createOffer())
  // }, [])
  const handleSubmitText = () => {
    if (text.trim() === "") {
      toast.error("Please Enter some text");
      return;
    }
    const dets = {
      text: text,
    };
    dispatch(updateOffertext(dets));
  };
  const handleSubmitImage = async () => {
    const formData = new FormData();
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append("image", blob, "banner.jpg");
        dispatch(updateOfferImage(formData));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Offers"} isOpen={isOpen}></AdminSidebar>

        {loading ? (
          <Loading />
        ) : (
          <div className="w-full flex flex-col items-start p-10 gap-5 relative overflow-y-auto">
            <div className="w-full flex items-center justify-between ">
              <div className="py-5">
                <h1 className="text-3xl max-md:text-xl">Offers</h1>
              </div>
              {/* <button
                type="primary"
                onClick={() => setaddSales(!addSales)}
                className="flex items-center bg-primary justify-center max-md:px-2 max-md:text-sm px-5 py-1 rounded-lg text-white"
              >
                {!addSales ? (
                  <>
                    Add Sales Person
                    <i className="ri-add-line"></i>
                  </>
                ) : (
                  "Close"
                )}
              </button> */}
            </div>
            <InputCustom
              title={"Homepage Offer Text"}
              value={text}
              onChange={(e) => settext(e.target.value)}
            />
            <button
              onClick={handleSubmitText}
              className="flex items-center bg-primary justify-center max-md:px-2 max-md:text-sm px-5 py-1 rounded-lg text-white"
            >
              Add Text
            </button>
            {selectedImage ? (
              <div className="flex flex-col w-1/2 flex-col relative">
                <img
                  className="w-full h-1/2 border-2 object-contain rounded-xl"
                  src={selectedImage}
                  alt=""
                />
                <Icon
                  onClick={() => setSelectedImage("")}
                  icon="mdi:cross-circle"
                  width="24"
                  height="24"
                  className="absolute -top-2 -right-2 cursor-pointer"
                />
                <button onClick={handleSubmitImage} className="flex items-center bg-primary justify-center max-md:px-2 max-md:text-sm px-5 py-1 rounded-lg text-white">
                  Add Banner Image
                </button>
              </div>
            ) : (
              <div
                onClick={openFileInput}
                className="flex flex-col w-full items-center justify-center p-6 px-14 py-14 gap-2 text-lg font-semibold border-2 rounded-xl cursor-pointer bg-white"
              >
                <Icon icon="bi:camera" style={{ color: "Gray" }} />
                <h3 className="text-gray-300 font-extralight text-sm">
                  Click or Drop to upload Offer Banner image (Only jpg or png)
                </h3>
                <input
                  type="file"
                  name="img"
                  accept=".png, .jpg, .jpeg .avif"
                  ref={fileInputRef}
                  onChange={uploadImage}
                  className="hidden"
                />
              </div>
            )}
            {/* Pagination controls */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOffer;
