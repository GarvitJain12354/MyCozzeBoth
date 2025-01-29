import React from 'react';

const Cards = ({ title, image }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-16 h-16 mb-4" />
      <h2 className="text-sm font-medium text-gray-800">{title}</h2>
    </div>
  );
};

export default Cards;
