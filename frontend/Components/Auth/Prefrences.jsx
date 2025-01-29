import React, { useState } from "react";
import { PrefrenceData } from "../../src/db/PrefrenceData";
import PrefrenceCard from "../PrefrenceCard";

const Prefrences = ({ submit, setprefrence, setopen,selectedPrefrence,setselectedPrefrence }) => {
 

  return (
    <div className="px-20 py-14 flex flex-col relative w-full rounded-xl items-center bg-[#aebcc33b]">
      <h1 className="text-3xl font-semibold">Select your preferences</h1>
      <h3 className="mt-3 text-lg">
        It’ll help you to find a better room/ roommate or PGs
      </h3>
      <i
        onClick={() => setopen(false)}
        className="ri-arrow-left-line absolute left-10 top-10 text-2xl cursor-pointer"
      ></i>
      <div className="w-full flex flex-wrap gap-4 p-10 items-center justify-center">
        {PrefrenceData?.map((i, index) => (
          <PrefrenceCard
            selectedPrefrence={selectedPrefrence}
            isInitiallySelected={
              !!selectedPrefrence.find((pref) => pref.prefrence === i.prefrence)
            }
            setselectedPrefrence={setselectedPrefrence}
            data={i}
          />
        ))}
      </div>
      <button
        onClick={submit}
        className="bg-primary text-white px-20 rounded-lg py-2"
      >
        Procced
        <i className="ri-arrow-right-wide-line"></i>
      </button>
    </div>
  );
};

export default Prefrences;
