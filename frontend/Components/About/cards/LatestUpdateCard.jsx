import React from 'react'
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const LatestUpdateCard = () => {
  return (
    <div>
        <div className="max-w-[25rem]  mx-auto bg-white rounded-lg border-2 overflow-hidden">
      {/* Image Section */}

      {/* Card Content */}
      <div className="p-6">
     <div className='overflow-hidden     w-full rounded'>
     <img
        src={"/latestupdate.png"}
        alt="Social Media Icons"
        className="w-full h-full   object-cover"
      />
     </div>

        {/* Title */}
        <h2 className="text-lg   py-4">
          Finding roommate? Not an easy task in Bangalore, Hyderabad, etc.
        </h2>

        {/* Description */}
        <p className=" text-[12px]  mb-4">
          Lorem ipsum dolor sit amet consectetur. Diam aenean adipiscing odio blandit risus pulvinar. Sit vitae porta sed tortor leo commodo. Sit sed adipiscing id varius at rhoncus ac massa purus.
        </p>

        {/* Button */}

            <button className='flex justify-center items-center  text-white bg-[#bc2c3d]  rounded-lg'>
                <span className='pl-3'>Read more</span>
          <Icon icon="iconamoon:arrow-right-2-thin" width={30} />

            </button>

      </div>
    </div>
    </div>
  )
}

export default LatestUpdateCard