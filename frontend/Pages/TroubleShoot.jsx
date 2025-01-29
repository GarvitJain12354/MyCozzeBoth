import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import CustomDropdown from "../Components/Auth/CustomDropDown";
import InputCustom from "../Components/InputCustom";

const TroubleShoot = () => {
  const option = [
    {
      name: "Chrome",
    },
    {
      name: "Brave",
    },
    {
      name: "Microsoft Edge",
    },
  ];
  const [selectedState, setselectedState] = useState("Chrome");
  return (
    <>
      <div className="w-full rounded-lg flex flex-col items-center justify-center gap-4">
        <h1 className=" text-3xl font-bold">Give us Feedback</h1>
        <p>
          If you are unable to login/register or having trouble to do that.{" "}
          <br />
          Please trll us the problem you are facing.
        </p>
        <CustomDropdown
          selectedOption={selectedState}
          setSelectedOption={setselectedState}
          options={option}
          width={"100%"}
        />
        <input
          placeholder={"Enter your phone number"}
          type="number"
          className="w-full p-2 rounded-xl border-2 outline-primary max-md:w-full"
        />
        <textarea
          name=""
          
          className="w-full min-h-40 border-2 p-2 rounded-xl outline-primary "
          placeholder="Tell us the problem here"
        />
        <button
          type="submit"
          className="bg-primary ml-2 w-fit py-2 px-8 text-white text-xl rounded-md mt-5 max-md:ml-1"
        >
          Submit<i className="ri-arrow-right-s-line"></i>
        </button>
        {/* <select name="" id="">
            <option value="">Chrome</option>
            <option value="">Brave</option>
            <option value="">Microsoft edge</option>
        </select> */}
      </div>
    </>
  );
};

export default TroubleShoot;
