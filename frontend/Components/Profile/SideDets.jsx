import { Icon } from "@iconify-icon/react";
import React from "react";
import { NavLink } from "react-router-dom";

const SideDets = ({ selected, setselected, data, setIsOpen }) => {
  const handleClick = () => {
    setselected(data.title);
    setIsOpen(false); // Close sidebar on click
  };

  return (
 
    <div
      onClick={handleClick} // Handle click event
      className={`w-full flex relative items-center rounded-md justify-start pl-4 p-2 gap-2 text-lg cursor-pointer duration-200 ease-linear ${
        selected === data.title ? "bg-primary" : "bg-transparent"
      } ${selected === data.title ? "text-white" : "text-black"}`}
    >
      <Icon
        icon={data.icon}
        style={{ color: selected === data.title ? "white" : "black" }}
      />
      <h2>{data?.title}</h2>
      {selected === data.title && (
        <div className="line absolute right-[105%] h-full w-1.5 bg-primary rounded-r-md"></div>
      )}
    </div>
  );
};

export default SideDets;
