import { Box, Button, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomDropdown from "./CustomDropDown";
import { City, State } from "country-state-city";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Prefrences from "./Prefrences";
import { useDispatch } from "react-redux";
import { userRegister } from "../../store/Action/Auth";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const RegisterForm = () => {
  const [gender, setGender] = useState("Male");
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
  const [prefrence, setprefrence] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [selectedPrefrence, setselectedPrefrence] = useState([]);
  const [email, setemail] = useState("");
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
    setCroppedImage(null);
    fileInputRef.current.value = null;
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const value = {
      name: "Select your city",
    };
    setState([value, ...State.getStatesOfCountry("IN")]);
  }, []);

  const lookingForOptions = [
    { name: "Looking for a Flat / Flatmate / PG" },
    { name: "List my PG (PG Owner)" },
    { name: "List my Flat (Flat Owner)" },
  ];
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
  const [selectedOption, setSelectedOption] = useState(
    "Looking for a Flat / Flatmate / PG"
  );
  const [selectedState, setselectedState] = useState("Select your city");
  const [copy, setcopy] = useState("");
  const onSubmit = async () => {
    const croppedUrl = await createCroppedImage();

    setCroppedImage(croppedUrl);

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
  const dispatch = useDispatch();
  const [defaultAvtar, setdefaultAvtar] = useState("");
  const onSubmitForm = async (e) => {
    const formData = new FormData();
    if (firstname.length < 3) {
      return toast.error("First name should be of minimum 3 characters");
    }
    if (firstname === "") {
      return toast.error("First Name is required");
    }
    if (lastname === "") {
      return toast.error("Last Name is required");
    }
    if (email === "") {
      return toast.error("Email address is required");
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (password === "") {
      return toast.error("Password is required");
    } else if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 6 characters long."
      );
    }
    if (selectedState === "Select your city") {
      return toast.error("City is required");
    }
    if (
      (!croppedImage || croppedImage === null || croppedImage === "") &&
      !defaultAvtar
    ) {
      return toast.error("Please select an avatar to upload");
    }
    const num = Number(localStorage.getItem("number"));
    if (num === "" || num === undefined || num === null) {
      return toast.error("Please verify your number it is not verified");
    }
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("city", selectedState);
    formData.append("gender", gender);
    formData.append("contact", Number(num));
    formData.append("prefrence", JSON.stringify(selectedPrefrence));
    if (selectedOption === "Looking for a Flat / Flatmate / PG") {
      formData.append("role", "flatemate");
    } else if (selectedOption === "List my Flat (Flat Owner)") {
      formData.append("role", "flatemate");
      formData.append("flateOwner", true);
    } else if (selectedOption === "List my PG (PG Owner)") {
      formData.append("role", "owner");
    }

    // Append the image blob
    if (croppedImage) {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      formData.append("avatar", blob, "avatar.jpg");
    }
    // formData.append("avatar", blob, "avatar.jpg");
    if (defaultAvtar) {
      formData.append("image", defaultAvtar);
    }
    dispatch(userRegister(formData));
    localStorage.removeItem("number");
  };
  const obj = [
    {
      url: "https://ik.imagekit.io/ylomjf0fi/avt3.jpg?updatedAt=1738060985166",
    },
    {
      url: "https://ik.imagekit.io/ylomjf0fi/avt4.jpg?updatedAt=1738060984988",
    },
    {
      url: "https://ik.imagekit.io/ylomjf0fi/avatar1.jpg?updatedAt=1738060984428",
    },
    {
      url: "https://ik.imagekit.io/ylomjf0fi/avt2.jpg?updatedAt=1738060984494",
    },
  ];
  return (
    <div className="flex justify-center items-center">
      <div className="   py-10 min-w-[80vw] px-3    ">
        <div className="flex flex-col items-center w-full  h-full justify-center gap-4">
          <NavLink to="/" className="text-2xl sm:text-3xl">
            My <span className="text-primary">Cozee</span>
          </NavLink>
          {prefrence ? (
            <Prefrences
              setopen={setprefrence}
              submit={onSubmitForm}
              setprefrence={setprefrence}
              selectedPrefrence={selectedPrefrence}
              setselectedPrefrence={setselectedPrefrence}
            />
          ) : (
            <div className=" py-8 px-6  flex flex-col md:flex-wrap w-full rounded-md items-center bg-[#aebcc33b]">
              <h1 className="text-2xl  font-semibold text-center">
                One Step Closer to Stress-Free Living!
              </h1>
              <h3 className="mt-3 text-base sm:text-lg text-center">
                Fill out the form and let us help you find the ideal home!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
                  <label className="font-extrabold">
                    First Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Garvit"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    className="w-full p-2 rounded-xl border-2"
                  />
                </div>
                <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
                  <label className="font-extrabold">
                    Last Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Jain"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    className="w-full p-2 rounded-xl border-2"
                  />
                </div>
              </div>
              <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
                <label className="font-extrabold">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="xyz@gmail.com"
                  className="w-full p-2 rounded-xl border-2"
                />
              </div>
              <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
                <label className="font-extrabold">
                  Password <span className="text-primary">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="*********"
                  className="w-full p-2 rounded-xl border-2"
                />
              </div>
              <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
                <label className="font-extrabold">
                  Gender <span className="text-primary">*</span>
                </label>
                <div className="w-full  grid grid-cols-3 gap-2">
                  {["Male", "Female", "Others"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setGender(option)}
                      className={`py-2  w-full text-base border-[1px] border-primary ${
                        gender === option
                          ? "text-white bg-primary"
                          : "text-primary bg-white"
                      } rounded-md font-extralight`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
                <label className="font-extrabold">
                  What are you looking for?{" "}
                  <span className="text-primary">*</span>
                </label>
                <div className="relative w-full ">
                  <CustomDropdown
                    options={lookingForOptions}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    width={"100%"}
                  />
                </div>
              </div>
              <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
                <label className="font-extrabold">
                  Select the city where you’re searching{" "}
                  <span className="text-primary">*</span>
                </label>
                <div className="relative w-full">
                  <CustomDropdown
                    options={state}
                    selectedOption={selectedState}
                    setSelectedOption={setselectedState}
                    width={"100%"}
                  />
                </div>
              </div>
              <div className="flex mt-6 flex-col items-start w-full  gap-2 p-2">
                <label className="font-extrabold">
                  Upload Image or Select an Avatar{" "}
                  <span className="text-primary">*</span>
                </label>
                <div className="relative w-full h-full">
                  {!croppedImage ? (
                    <div
                      onClick={openFileInput}
                      className="flex flex-col min-h-[25vh]  items-center justify-center p-4 sm:p-6 gap-2 text-lg font-semibold border-2 rounded-xl cursor-pointer bg-white "
                    >
                      <Icon icon="bi:camera" style={{ color: "Gray" }} />
                      <h3 className="text-gray-300 font-extralight text-sm text-center">
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
                  ) : (
                    <div className="flex relative flex-col items-center w-24 h-24  justify-center rounded-full">
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
                {croppedImage ? (
                  ""
                ) : (
                  <div className="grid grid-cols-4 place-content-center gap-4">
                    {obj?.map((i, index) => (
                      <img
                        onClick={() => setdefaultAvtar(i.url)}
                        className={`h-32 w-28 object-cover rounded-xl ${
                          i.url === defaultAvtar && "border-primary"
                        }   border-2`}
                        src={i.url}
                        alt=""
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setprefrence(true)}
                className="bg-primary mt-5 text-white px-12 md:px-20 rounded-lg py-2"
              >
                Proceed
                <i className="ri-arrow-right-wide-line"></i>
              </button>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
