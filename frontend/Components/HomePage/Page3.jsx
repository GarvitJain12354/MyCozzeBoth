import React from "react";

const Page3 = () => {
  return (
    <div className="w-full min-h-screen px-20 pb-20">
      <h1 className="red text-4xl">Benefits</h1>
      <h3 className="lightF text-2xl mt-4">Legal | Fast | Secure</h3>
      <div className="flex w-[100%] py-5 mx-auto items-center justify-between">
        <div className="flex items-center p-5  gap-2 justify-center">
          <img src="/shield.png" alt="" />
          <h1 className="text-2xl lightF">
            Stay compliant with local regulations
          </h1>
        </div>
        <div className="flex items-center p-5 gap-2 justify-center">
          <img src="/light.png" alt="" />
          <h1 className="text-2xl lightF">Complete your contract in minutes</h1>
        </div>
        <div className="flex items-center p-5 gap-2 justify-center">
          <img src="/lock.png" alt="" />
          <h1 className="text-2xl lightF">Your Information is safe with us</h1>
        </div>
      </div>
      <h1 className="red text-4xl mt-[8vh]">Premium Properties</h1>
      <h3 className="lightF text-2xl mt-4">Have a look at our collection</h3>
      <div className="flex items-center justify-center w-[100%] mx-auto gap-4">
        <img src="/p1.png" className="w-1/2 object-contain" alt="" />
        <div className="w-1/2 grid grid-cols-2 gap-3 p-8">
          <img src="/p2.png" className="w-full h-full" alt="" />
          <img src="/p3.png" className="w-full h-full" alt="" />
          <img src="/p4.png" className="w-full h-full" alt="" />
          <img src="/p5.png" className="w-full h-full" alt="" />
        </div>
      </div>
      <button className="p-4 bgRed px-20 rounded-full text-white text-xl">Browse More</button>
    </div>
  );
};

export default Page3;
