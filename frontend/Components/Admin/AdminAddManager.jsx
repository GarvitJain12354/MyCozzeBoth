import React, { useState } from "react";
import InputCustom from "../InputCustom";
import { useDispatch, useSelector } from "react-redux";
import { registerManagers, registerSalesPerson } from "../../store/Action/Admin";
import Loading from "../Loading";

const AdminAddManager = () => {
  const [gender, setgender] = useState("Male");
  const { loading, message, error } = useSelector((state) => state.Admin);
  const user = {};
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
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const t = e.target;
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", t.firstname.value);
    formData.append("lastname", t.lastname.value);
    formData.append("email", t.email.value);
    formData.append("contact", t.contact.value);
    formData.append("gender", gender);
    formData.append("role", "manager");
    dispatch(registerManagers(formData));
  };

  return loading ? (
    <Loading />
  ) : (
      <form
      onSubmit={handleSubmit}
      className="w-full flex  flex-col items-start  justify-center gap-2  "
    >
      <h1>Add Managers</h1>
      <InputCustom
        title="First Name"
        placeholder="Garvit"
        type="text"
        name="firstname"
      />
      <InputCustom
        title="Last Name"
        placeholder="Jain"
        type="text"
        name="lastname"
      />
      <InputCustom
        title="Contact Number"
        placeholder="8839893207"
        type="number"
        name="contact"
      />
      <InputCustom
        title="Email Address"
        placeholder="demo@gmail.com"
        type="email"
        name="email"
      />
      <div className="flex w-full flex-col gap-2 p-2">
        <label className="font-extrabold">Gender</label>
        <div className="flex max-md:flex-wrap  gap-2">
          {genderD?.map((i, index) => (
            <div
              key={index}
              onClick={() => setgender(i.gender)}
              className={`py-2  px-10 text-lg border-[1px] border-primary ${
                gender === i.gender
                  ? "text-white  bg-primary"
                  : "text-primary bg-white"
              } rounded-md font-extralight cursor-pointer`}
            >
              {i?.gender}
            </div>
          ))}

          {/* <button className="p-4 px-10 bg-primary">Female</button>
            <button className="p-4 px-10 bg-primary">Others</button> */}
        </div>
      </div>
      <button
        type="submit"
        className="bgRed px-10 py-2  mt-5 w-fit rounded-xl text-white text-xl"
      >
        Create Managers <i className="ri-arrow-right-wide-line"></i>
      </button>
    </form>

  );
};

export default AdminAddManager;
