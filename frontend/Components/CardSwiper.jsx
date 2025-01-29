import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./CardSwiper.module.css";
import { Navigation } from "swiper/modules";
import { Image } from "antd";
const cardsdetails = [
  {
    img: "/wc.png",
    heading: " Cough & Cold?",
  },
  {
    img: "/bell.png",
    heading: "Period Problems",
  },
  {
    img: "/check.png",
    heading: "Eye Problem?",
  },
  {
    img: "/eyes.png",
    heading: "Skin Problems?",
  },
  {
    img: "/eyes.png",
    heading: "Skin Problems?",
  },
];
const CustomNavigationButtons = ({ index }) => {
  return (
    <div>
      <button
        className={`prev-button${
          index + 1
        }  cardbtn rounded-r-2xl text-lg h-10 w-8  bg-black text-white absolute top-1/2 left-0 -translate-y-1/2 z-20 `}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button
        className={`next-button${
          index + 1
        } cardbtn-r rounded-l-2xl text-lg h-10 w-8  bg-black text-white absolute top-1/2 right-0 -translate-y-1/2 z-20 `}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

const CardSwiper = ({ img, index, type }) => {
  console.log(img);
  
  return (
    <>
      <div className="h-full w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            prevEl: `.prev-button${index + 1}`, // Selector for the previous button
            nextEl: `.next-button${index + 1}`, // Selector for the next button
          }}
          modules={[Navigation]}
          className="mySwiper2"
        >
          {img?.map((dets, index) => (
            <SwiperSlide
              key={index}
              className="w-full h-full rounded-t-xl shrink-0 flex flex-col"
            >
              {type === "dets" ? (
                <Image
                  src={`${dets?.url}`}
                  style={{objectFit:"contain"}}
                  // height={"10%"}
                  // width={"80%"}
                  className="h-full w-[50%] mx-auto object-contain"
                  alt=""
                />
            
              ) : (
                <img
                  src={`${dets.url}`}
                  className="h-full w-full object-cover"
                  alt=""
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <CustomNavigationButtons index={index} />
      </div>
    </>
  );
};

export default CardSwiper;
