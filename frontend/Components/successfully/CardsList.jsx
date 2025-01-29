import React from 'react';
import Cards from './Cards';

import agree from "../../src/assets/agree.png";
import property from "../../src/assets/property.png";
import receipt from "../../src/assets/receipt.png";

const CardList = () => {
  const cardData = [
    // Assuming 'property' image is used for Verification
    { title: 'Agreements', image: agree },
    { title: 'Rent Receipts', image: receipt },
    { title: 'Best Properties', image: property },
  ];

  return (
    <div className="text-center w-full flex flex-col justify-center items-center py-10 ">
      <h1 className="text-4xl py-3">We provide solutions</h1>
      <p className="text-sm mb-10">that perfectly fit your needs.</p>

      {/* Grid with responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6  justify-center items-center">
        {cardData.map((card, index) => (
          <Cards key={index} title={card.title} image={card.image} />
        ))}
      </div>

      {/* Button */}
      <button className="mt-10 px-16 py-3 bg-[#bc2c3d] text-white rounded-full hover:bg-red-600">
        See your matches
      </button>
    </div>
  );
};

export default CardList;
