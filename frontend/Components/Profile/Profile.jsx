import { Box, Button, Divider, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InputCustom from "../InputCustom";
import OfferBanner from "../OfferBanner";
import { useDispatch, useSelector } from "react-redux";
import ReactCrop from "react-image-crop";
// import Image from "antd";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import {
  resetPassword,
  updateUserDets,
  uploadAvatar,
} from "../../store/Action/User";
import { toast } from "react-toastify";
import {
  clearErrorUser,
  clearMessageUser,
} from "../../store/Reducer/UserReducer";
import Loading from "../Loading";
import { isUser } from "../../store/Action/Auth";
import CustomDropdown from "../Auth/CustomDropDown";
import { Image } from "antd";

const Profile = ({ user }) => {
  const { message, loading, error } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.Others);
  const [selectedCity, setselectedCity] = useState(user?.city);
  const [openPassword, setopenPassword] = useState(false);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(isUser());
      dispatch(clearMessageUser());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrorUser());
    }
  }, [message, error, dispatch, loading]);

  const [gender, setgender] = useState(user?.gender);
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 77.20001220703125,
    y: 10.79998779296875,
    width: 150,
    height: 150,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState({
    aspect: 1,
    height: 150,
    unit: "px",
    width: 150,
    x: 77.20001220703125,
    y: 10.79998779296875,
  });
  const [state, setState] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const genderD = [
    {
      gender: "Male",
    },
    {
      gender: "Female",
    },
    {
      gender: "Others",
    },
  ];
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
    setCroppedImage(null);
    fileInputRef.current.value = null;
  };

  const openFileInput = () => {
    console.log("gellp");

    fileInputRef.current.click();
  };
  const createCroppedImage = async () => {
    if (completedCrop?.width && completedCrop?.height && imageRef.current) {
      console.log(completedCrop);

      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        imageRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          const croppedUrl = URL.createObjectURL(blob);
          resolve(croppedUrl);
        }, "image/jpeg");
      });
    }
  };
  const onSubmit = async () => {
    const croppedUrl = await createCroppedImage();

    setCroppedImage(croppedUrl);
    const response = await fetch(croppedUrl);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("avatar", blob, "avatar.jpg");
    dispatch(uploadAvatar(formData));
    setOpen(false);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const croppedUrl = await createCroppedImage();
      console.log(croppedUrl);

      setCroppedImage(croppedUrl);
    }
    setOpen(true);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const t = e.target;
    const dets = {
      firstname: t.firstname.value !== "" ? t.firstname.value : user?.firstname,
      lastname: t.lastname.value !== "" ? t.lastname.value : user?.lastname,
      contact: t.contact.value !== "" ? Number(t.contact.value) : user?.contact,
      gender: gender,
      city: selectedCity,
    };
    dispatch(updateUserDets(user?._id, dets));
  };
  const onSubmitChangePassword = (e) => {
    e.preventDefault();
    if (
      !e.target.oldpassword.value ||
      !e.target.newpassword.value ||
      !e.target.confirmpassword.value
    ) {
      return toast.error("Please fill all the values");
    }
    const formData = new FormData();
    formData.append("oldpassword", e.target.oldpassword.value);
    if (e.target.newpassword.value !== e.target.confirmpassword.value) {
      return toast.error("Please correct values new and confirm passwords .");
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(e.target.newpassword.value)) {
      return toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 6 characters long."
      );
    }
    formData.append("newpassword", e.target.newpassword.value);
    dispatch(resetPassword(formData));
  };
  return (
    <>
      <h1 className="text-2xl max-md:text-xl mb-2 font-semibold">
        Your Profile
      </h1>
      <Divider className="w-[92%] max-md:w-full" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <form
            className="w-[92%] max-md:w-full grid     lg:grid-cols-2"
            onSubmit={onSubmitForm}
          >
            <div className="h-36 ml-5 mt-6 w-32 relative overflow-hidden rounded-lg bg-gray-300">
              <Image
                src={`${user?.avatar?.url}`}
                className="h-full w-full object-cover rounded-full"
                alt=""
              />
              <i
                onClick={openFileInput}
                className="ri-edit-fill text-center text-xs cursor-pointer flex items-center justify-center h-6 w-6 absolute text-white bottom-0 right-0 bg-primary rounded-full"
              ></i>
            </div>
            <span></span>
            <InputCustom
              title="First Name"
              placeholder="Garvit"
              type="text"
              name="firstname"
              val={user?.firstname}
            />
            <InputCustom
              title="Last Name"
              placeholder="Jain"
              type="text"
              name="lastname"
              val={user?.lastname}
            />
            <div className="flex  w-full max-md:w-full mt-6 flex-col items-start gap-2 p-2 max-md:ml-0">
              <label className="font-extrabold">City</label>
              <CustomDropdown
                options={city}
                selectedOption={selectedCity}
                setSelectedOption={setselectedCity}
                width={"100%"}
              />
            </div>

            <InputCustom
              title="Contact Number"
              placeholder="8839893207"
              type="number"
              name="contact"
              val={user?.contact}
              disabled={true}
            />
            <div className="flex w-full justify-center items-start flex-col  p-2   max-md:ml-0">
              <label className="font-extrabold">Gender</label>
              <div className="flex  gap-2 max-md:flex-wrap">
                {genderD?.map((i, index) => (
                  <div
                    key={index}
                    onClick={() => setgender(i.gender)}
                    className={` py-2  relative top-3 px-5 text-lg border-[1px] border-primary ${
                      gender === i.gender
                        ? "text-white  bg-primary"
                        : "text-primary bg-white"
                    } rounded-md font-extralight  cursor-pointer`}
                  >
                    {i?.gender}
                  </div>
                ))}

                {/* <button className="p-4 px-10 bg-primary">Female</button>
            <button className="p-4 px-10 bg-primary">Others</button> */}
              </div>
            </div>
            <span></span>
            <button
              type="submit"
              className="bg-primary ml-2 w-fit py-2 px-8 text-white text-xl rounded-md mt-5 max-md:ml-1"
            >
              Save Changes <i className="ri-arrow-right-s-line"></i>
            </button>
            <span></span>

            {/* <h1 className="text-right w-fit flex items-center justify-center  text-primary cursor-pointer px-10 py-2 border-dashed border-2 border-primary rounded-2xl">
            Change Password
          </h1> */}
            {/* <div className="flex ml-3 mt-6 flex-col items-start w-full gap-2 p-2">
          <label className="font-extrabold">
            Upload Image or Select an Avatar{" "}
            <span className="text-primary">*</span>
          </label>
          <div className="relative w-full">
            {!croppedImage ? (
              <div
                onClick={openFileInput}
                className="flex flex-col items-center justify-center p-6 px-14 py-14 gap-2 text-lg font-semibold border-2 rounded-xl cursor-pointer bg-white"
              >
                <Icon icon="bi:camera" style={{ color: "Gray" }} />
                <h3 className="text-gray-300 font-extralight text-sm">
                  Click or Drop to upload profile image (Only jpg or png)
                </h3>

              </div>
            ) : (
              <div className="flex relative flex-col items-center w-32 h-32 justify-center rounded-full">
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="rounded-full h-full w-full object-cover"
                />
                <i
                  onClick={() => setCroppedImage(null)}
                  className="ri-close-circle-fill absolute top-1 right-2 cursor-pointer text-lg text-primary"
                ></i>
              </div>
            )}
          </div>
        </div> */}
            <input
              type="file"
              name="img"
              accept=".png, .jpg, .jpeg .avif"
              ref={fileInputRef}
              onChange={uploadImage}
              className="hidden"
            />
          </form>
          <div className="flex flex-col ">
            <h1
              onClick={() => setopenPassword(!openPassword)}
              className="ml-3 pb-2 max-md:ml-0 mt-4 cursor-pointer translate-y-3 font-semibold text-xl"
            >
              Change Password
            </h1>
            <form
              onSubmit={onSubmitChangePassword}
              className={`w-full flex flex-col transition-all ease-linear duration-500 ${
                !openPassword ? "h-0 opacity-0" : "min-h-20 opacity-100"
              }  relative overflow-hidden`}
            >
              <InputCustom
                title={"Old Password"}
                name={"oldpassword"}
                placeholder={"Old Password"}
                type={"password"}
              />

              <InputCustom
                title={"New Password"}
                name={"newpassword"}
                placeholder={"New Password"}
                type={"password"}
              />

              <InputCustom
                title={"Confirm Password"}
                name={"confirmpassword"}
                placeholder={"Confirm Password"}
                type={"password"}
              />
              <button
                type="submit"
                className="bg-primary ml-5 max-md:ml-0 w-fit py-3 px-8 text-white text-xl rounded-md mt-5"
              >
                Save Changes <i className="ri-arrow-right-s-line"></i>
              </button>
            </form>
          </div>
        </>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="flex flex-col bg-white p-6 md:p-8 items-center justify-center gap-2">
            <ReactCrop
              src={selectedImage}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              circularCrop
            >
              <img
                ref={imageRef}
                src={selectedImage}
                className="h-48 w-64 object-contain"
                alt="Crop"
              />
            </ReactCrop>
            <div className="flex items-center gap-2">
              <button
                className="bg-green-500 text-white max-md:px-2  py-1 md:px-4 md:py-2 rounded-xl text-sm"
                onClick={onSubmit}
              >
                Submit
              </button>
              <button
                onClick={handleClose}
                className="bg-primary text-white max-md:px-2  py-1 md:px-4 md:py-2 rounded-xl text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Divider className="h-20 w-[90%] ml-5" />
      <OfferBanner user={user} />
    </>
  );
};

export default Profile;
