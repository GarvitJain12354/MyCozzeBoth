import React, { useRef, useState } from "react";
import InputCustom from "../InputCustom";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useDispatch } from "react-redux";
import { uploadCity } from "../../store/Action/Admin";

const CityAddAdmin = ({ setopenAdd }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedBg, setselectedBg] = useState(null);
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
  const uploadImageBackground = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setselectedBg(URL.createObjectURL(file));
      //   setCroppedImage(croppedUrl);
    }
  };
  const dispatch = useDispatch();
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.city.value);

    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append("card", blob, "avatar.jpg");

        const response2 = await fetch(selectedBg);
        const blob2 = await response2.blob();
        formData.append("bg", blob2, "background.jpg");
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
    dispatch(uploadCity(formData));
    setopenAdd(false);
  };
  return (
    <form onSubmit={submitForm} className="w-full flex flex-col">
      <InputCustom title={"Name of City"} name={"city"} placeholder={"Delhi"} />
      <div className="flex  mt-6 flex-col items-start w-full gap-2 p-2">
        <label className="font-extrabold">
          Upload Card Image for city <span className="text-primary">*</span>
        </label>
        <div className="relative w-full">
          <div className="w-full ">
            <div className=" w-full relative rounded-xl overflow-hidden">
              {selectedImage ? (
                <>
                  <img
                    src={`${selectedImage}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                  <i
                    onClick={() => setSelectedImage(null)}
                    className="ri-close-circle-fill absolute top-1 right-2 cursor-pointer text-lg text-primary"
                  ></i>
                </>
              ) : (
                <div
                  onClick={openFileInput}
                  className="flex flex-col w-full items-center justify-center p-6 px-14 py-14 gap-2 text-lg font-semibold border-2 rounded-xl cursor-pointer bg-white"
                >
                  <Icon icon="bi:camera" style={{ color: "Gray" }} />
                  <h3 className="text-gray-300 font-extralight text-sm">
                    Click or Drop to upload profile image (Only jpg or png)
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

              {/* <div className="overlay"></div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex  mt-6 flex-col items-start w-full gap-2 p-2">
        <label className="font-extrabold">
          Upload City Background Image for city{" "}
          <span className="text-primary">*</span>
        </label>
        <div className="relative w-full">
          <div className="w-full">
            <div className=" w-full relative rounded-xl overflow-hidden">
              {selectedBg ? (
                <>
                  <img
                    src={`${selectedBg}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                  <i
                    onClick={() => setselectedBg(null)}
                    className="ri-close-circle-fill absolute top-1 right-2 cursor-pointer text-lg text-primary"
                  ></i>
                </>
              ) : (
                <div
                  onClick={openFileInput2}
                  className="flex w-full min-h-[50vh] flex-col items-center justify-center p-6 px-14 py-14 gap-2 text-lg font-semibold border-2 rounded-xl cursor-pointer bg-white"
                >
                  <Icon icon="bi:camera" style={{ color: "Gray" }} />
                  <h3 className="text-gray-300 font-extralight text-sm">
                    Click or Drop to upload profile image (Only jpg or png)
                  </h3>
                  <input
                    type="file"
                    name="img"
                    accept=".png, .jpg, .jpeg .avif"
                    ref={fileInputRef2}
                    onChange={uploadImageBackground}
                    className="hidden"
                  />
                </div>
              )}

              {/* <div className="overlay"></div> */}
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary w-fit py-2 max-md:px-2  max-md:text-sm px-8 text-white text-xl rounded-md mt-5 ml-2"
      >
        Submit <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
};

export default CityAddAdmin;
