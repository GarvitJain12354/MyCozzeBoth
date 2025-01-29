import React from 'react'
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const Explore = () => {
  return (
    <div>
        <div>
        <div className="flex max-md:flex-col-reverse  mt-10  w-full relative overflow-hidden">
            {/* right Section */}
            <img src={"/findhome.png"} alt="about" className="max-md:w-[100vw] sm:w-[40vw] lg:w-[46vw] max-h-[300px] lg:max-h-full object-cover" />

  {/* Left Section */}
  <div className="bg-white w-[50vw] max-md:w-full flex justify-center items-center">
    <div className="flex justify-center  flex-col px-4 lg:px-12">
      <h1 className="text-5xl max-md:text-xl max-md:text-center max-md:font-semibold  text-[#BC2C3D] font-bold py-4">
      Find  your <br />
      dream home today
      </h1>
      <div className=' flex justify-start max-md:justify-center items-center py-4  '>
       <div className=' flex justify-center items-center h-[2px]  bg-[#d2cfcf]'>
          <button className='bg-[#bc2c3d] text-white py-2 max-md:py-1 px-10 max-md:text-sm max-md:px-3 flex justify-center items-center rounded-2xl'>Explore <Icon icon="iconamoon:arrow-right-2-thin" width={25} /></button>
        </div>
       </div>


    </div>
  </div>

  {/* Right Section */}

</div>

        </div>
    </div>
  )
}

export default Explore