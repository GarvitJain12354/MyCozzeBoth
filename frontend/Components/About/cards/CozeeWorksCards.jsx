import React from 'react';

const CozeeWorksCards = () => {
  return (
    <div className='h-full border-2  bg-white rounded-xl'>
      {/* Circle Number */}
      <div className="w-16 h-16 lg:w-20 lg:h-20 p-2 relative bottom-8  rounded-full bg-white font-bold text-lg lg:text-xl flex items-center justify-center mx-auto">
        <span className='border-2 border-[#bc2c3d] text-[#bc2c3d] flex justify-center items-center w-full h-full rounded-full'>1</span>
      </div>

      {/* Card Body */}
      <div className="bg-white  rounded-lg p-4 px-10 text-center max-w-[300px] mx-auto"
           >
        {/* Image/Icon */}
        <div className="flex justify-center  mb-4">
          <img
            src={"/works.png"}
            alt="Seamless search"
            className="w-16 h-16 lg:w-24 lg:h-24"
          />
        </div>

        {/* Title */}
        <h3 className="text-red-600 font-semibold text-lg lg:text-xl mb-2">Seamless search</h3>

        {/* Description */}
        <p className="text-gray-700 text-[15px] ">
          Mycozee prioritizes your safety and privacy by providing a secure environment for communication and interactions.
        </p>
      </div>
    </div>
  );
}

export default CozeeWorksCards;
