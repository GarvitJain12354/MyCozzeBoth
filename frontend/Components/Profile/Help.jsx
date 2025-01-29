import { Divider } from "@mui/material";
import React, { useState } from "react";
import InputCustom from "../InputCustom";
import CustomDropdown from "../Auth/CustomDropDown";

const Help = () => {
  const [message, setMessage] = useState("");
  const options = [
    {
      name: "Issue in listing",
    },
    {
      name: "Profile Update",
    },
    {
      name: "Refund Issue",
    },
    {
      name: "Others",
    },
  ];
  const [issue, setIssue] = useState(options[0].name);

  const handleWhatsAppLink = () => {
    const encodedIssue = encodeURIComponent(issue);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/919798008998?text=Issue:%20${encodedIssue}%20%0A%20Message:%20${encodedMessage}`;
  };
  // const [issue, setissue] = useState("")

  return (
    <>
      <h1 className="text-2xl max-md:text-xl mb-2 font-semibold">Help & Support</h1>
      <Divider className="w-[92%] max-md:w-full" />
      <div className="w-[92%] max-md:w-full">
        <div className="flex mt-6 flex-col items-start w-full gap-2 p-2">
          <label className="font-extrabold">
            Select the problem you're facing
            <span className="text-primary">*</span>
          </label>
          <div className="relative w-full ">
            <CustomDropdown
              options={options}
              selectedOption={issue}
              setSelectedOption={setIssue}
              width={"100%"}
            />
          </div>
        </div>
        {/* <InputCustom
          title={"Select the problem you're facing"}
          name={"issue"}
          placeholder={"Select Your issue"}
          required={true}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        /> */}
      </div>

      <div className="flex  mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
        <label className="font-extrabold">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          name="text"
          placeholder="Describe Your issue in detail"
          className="border-2 h-36 w-[92%] max-md:w-full max-md:h-36 p-2 rounded-xl outline-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <a
        href={handleWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary w-fit flex py-2 max-md:py-2 px-8 text-white text-xl rounded-md mt-5 ml-5 max-md:ml-3"
      >
        Submit <i className="ri-arrow-right-s-line"></i>
      </a>
    </>
  );
};

export default Help;
