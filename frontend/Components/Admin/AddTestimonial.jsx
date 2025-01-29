import React, { useEffect, useRef, useState } from "react";
import InputCustom from "../InputCustom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminError,
  clearAdminMessage,
  uploadTestimonialAdminSuccess,
} from "../../store/Reducer/Admin";
import { uploadTestimonials } from "../../store/Action/Admin";
import { toast } from "react-toastify";
import { getAllTestimonial } from "../../store/Action/Others";

const AddTestimonial = ({ setopenAdd }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { loading, message, error } = useSelector((state) => state.Admin);

  const fileInputRef = useRef();

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("designation", e.target.designation.value);
    formData.append("description", e.target.description.value);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    dispatch(uploadTestimonials(formData));
    setopenAdd(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-start flex-col">
      <InputCustom title="Name of the person" name="name" required={true} />
      <InputCustom
        title="Name of the designation"
        name="designation"
        required={true}
      />

      <input
        type="file"
        name="img"
        accept=".png, .jpg, .jpeg, .avif"
        ref={fileInputRef}
        onChange={uploadImage}
        className="hidden"
      />

      <div className="flex w-full  pl-2 flex-col gap-2 pr-1  mt-6">
        <label className="font-extrabold">
          Description <span className="text-primary">*</span>
        </label>
        <textarea
          name="description"
          defaultValue="I am looking for a roommate"
          className="p-2 border-[1px] h-48 border-primary outline-none rounded-lg"
        ></textarea>
      </div>

      <Button
        type="primary"
        className=" px-24 max-md:py-2 ml-2 max-md:ml-0  py-6 mt-6"
        onClick={() => fileInputRef.current.click()}
      >
        Add Image
      </Button>

      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="mt-4" />
      )}

      <button
        type="submit"
        className="bg-primary w-fit p-2  text-white text-lg max-md:text-sm rounded-md mt-5 ml-2 max-md:ml-0"
      >
        Submit <i className="ri-arrow-right-s-line"></i>
      </button>
    </form>
  );
};

export default AddTestimonial;
