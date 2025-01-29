import React, { useState } from "react";
import Team from "./Team";
import { Divider } from "@mui/material";
import Request from "./Request/Request";

const MyTeam = () => {
  const [open, setopen] = useState(true);
  return (
    <>
      <div className="flex items-center gap-5">
        <h1
          className={`text-2xl max-md:text-xl shrink-0 mb-2 font-semibold cursor-pointer ${
            open ? "text-primary" : "text-black"
          } `}
          onClick={()=>setopen(true)}
        >
          My Team
        </h1>
        <h1
          className={`text-2xl max-md:text-xl mb-2 font-semibold cursor-pointer ${
            !open ? "text-primary" : "text-black"
          } `}
          onClick={() => setopen(false)}
        >
          Requests
        </h1>
      </div>
      <Divider className="w-[92%]" />
      {open ? <Team /> : <Request/>}
    </>
  );
};

export default MyTeam;
