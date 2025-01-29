import { Divider } from "@mui/material";
import React, { useState } from "react";
import Property from "./Property";
import Tenant from "./Tenant";

const ProfileListing = ({ user }) => {
  const [open, setopen] = useState(true);

  return (
    <>
      <div className="flex items-center gap-5">
        <h1
          className={`text-2xl shrink-0 mb-2 font-semibold cursor-pointer ${
            open ? "text-primary" : "text-black"
          } `}
          onClick={() => setopen(true)}
        >
          Property with flatemate
        </h1>
        <h1
          className={`text-2xl mb-2 font-semibold cursor-pointer ${
            !open ? "text-primary" : "text-black"
          } `}
          onClick={() => setopen(false)}
        >
          Tenant For your property
        </h1>
      </div>
      <Divider className="w-[92%]" />
      {open ? <Property /> : <Tenant/>}
    </>
  );
};

export default ProfileListing;
