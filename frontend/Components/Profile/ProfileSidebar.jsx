import { Icon } from "@iconify-icon/react";
import React from "react";
import SideDets from "./SideDets";



const ProfileSidebar = ({
  selected,
  setselected,
  setIsOpen,
  isOpen,
  sideBarData,
}) => {
  return (
    <div>
      <div
        className={`fixed inset-y-0 left-0 w-[18rem] h-full bg-[#F9FAFB] px-4 py-16 z-40 transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative lg:w-[18rem]`}
      >
        <div className="flex flex-col gap-2">
          {sideBarData?.map((i, index) => (
            <SideDets
              setselected={setselected}
              selected={selected}
              data={i}
              key={index}
              setIsOpen={setIsOpen} // Pass setIsOpen to SideDets
            />
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ProfileSidebar;
