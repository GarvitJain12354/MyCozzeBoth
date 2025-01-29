import React, { useState, useEffect } from "react";

const PrefrenceCard = ({ selectedPrefrence, setselectedPrefrence, data, isInitiallySelected }) => {
  const [selected, setselected] = useState(isInitiallySelected); // Initialize with `isInitiallySelected`

  const handleClick = () => {
    if (!selected) {
      setselectedPrefrence([...selectedPrefrence, data]); // Add preference if not selected
    } else {
      const filtered = selectedPrefrence.filter(
        (i) => i.prefrence !== data.prefrence
      );
      setselectedPrefrence(filtered); // Remove preference if selected
    }
    setselected(!selected); // Toggle selected state
  };

  useEffect(() => {
    setselected(isInitiallySelected);
  }, [isInitiallySelected]);

  return (
    <div
      className={`flex flex-col shrink-0 gap-2 cursor-pointer p-2 rounded-xl items-center border-2 ${
        selected ? "border-primary" : ""
      } bg-[#E0E0E0]`}
      onClick={handleClick}
    >
      <img
        src={`/${data?.prefrence}.png`}
        className="h-36 w-40 object-contain max-md:w-28 max-md:h-28"
        alt=""
      />
      <h2 className="text-base">{data?.prefrence}</h2>
    </div>
  );
};

export default PrefrenceCard;
