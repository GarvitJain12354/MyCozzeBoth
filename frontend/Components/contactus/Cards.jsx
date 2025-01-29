import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ icon, title, description, linkText, linkUrl }) => {
  return (
    <div className="bg-white  p-6 rounded-lg w-full  border-b-4 border-2 shadow-lg ">
      <div className="w-14 h-14 p-3 flex justify-center items-center rounded-full bg-[#f4dbde] mb-4">
        <img src={icon} alt={title} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>

      {linkUrl ? (
        <a href={linkUrl} className="text-[#bc2c3d] mt-3 block">
          {linkText}
        </a>
      ) : (
        <span className="text-[#bc2c3d] mt-3 block">{linkText}</span>
      )}
    </div>
  );
};

export default Cards;
