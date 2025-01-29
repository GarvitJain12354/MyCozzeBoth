import React from "react";
import PrefrenceCard from "../PrefrenceCard";

const Amenities = ({heading,data}) => {
  return (
    <div className="w-full flex flex-col gap-2 mt-6">
      <h1 className="font-semibold text-2xl max-md:text-xl">{heading}</h1>
      <div className="flex flex-wrap gap-4">
        {
          data?.map((i,index)=>(
            <PrefrenceCard data={i} key={index} />

          ))
        }
        {/* <PrefrenceCard data={{ prefrence: "Sporty" }} /> */}
      </div>
    </div>
  );
};

export default Amenities;
