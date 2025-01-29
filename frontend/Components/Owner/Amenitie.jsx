import { useState } from 'react';
// import wireless from "../../src/assets/wireless.png";

const Amenitie = ({data}) => {
  // State to track if the amenity is selected
  const [isSelected, setIsSelected] = useState(false);

  // Toggle the selected state on click
  const handleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      onClick={handleSelection}
      className={`flex flex-col shrink-0 gap-2 cursor-pointer p-2 rounded-xl items-center border-2 bg-[#f7f8f9] ${
        isSelected ? 'border-[#bc2c3d] bg-[#f7f8f9]' : ''
      }`}
    >
      <img
        src={`/${data.name}.png`}
        className="h-36 w-40 object-contain"
        alt="Wireless Amenity"
      />
      <h2 className="text-base">Wireless</h2>
    </div>
  );
};

export default Amenitie;
