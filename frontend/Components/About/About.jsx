import React, { useEffect } from "react";
import CozeeWorksCards from "./cards/CozeeWorksCards";
import ProfileCard from "./cards/ProfileCard";
import LatestUpdateCard from "./cards/LatestUpdateCard";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./AboutSwiper.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

import Testimonial from "./cards/Testimonials";
import Explore from "./cards/Explore";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { getAllTestimonial } from "../../store/Action/Others";
import { useDispatch, useSelector } from "react-redux";

const About = () => {
  const { testimonial } = useSelector((state) => state.Others);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTestimonial());
  }, []);
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <NavBar />
      <div className="min-h-screen  w-full relative overflow-hidden">
        {/* Main Content */}
        <div className="flex flex-col mt-10 lg:flex-row h-auto lg:h-screen w-full max-md:flex-col-reverse max-md:mt-20">
          {/* Left Section */}
          <div className=" flex justify-center px-3  py-6  ">
            <div className="flex justify-center flex-col pl-[9.3vw] ">
              <h1 className="text-2xl sm:text-2xl lg:text-3xl text-[#BC2C3D] font-bold py-4">
                Finding a Home, Finding a Friend
              </h1>
              <p className="py-4 text-base sm:text-lg lg:text-xl leading-relaxed">
                In today's fast-paced world, moving to a new city for work,
                studies, or personal reasons often means leaving behind familiar
                comforts and social circles. The search for a suitable roommate
                can be a daunting task, filled with uncertainty and potential
                mismatches.
              </p>
              <p className="py-4 text-base sm:text-lg lg:text-xl leading-relaxed">
                At Mycozee, we understand the importance of finding a living
                space that feels like home and a roommate who becomes more than
                just a housemate. Our mission is to revolutionize the
                roommate-finding experience by connecting individuals with
                like-minded people who share similar interests, budgets, and
                lifestyles.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex justify-center  lg:min-w-[50vw]">
            <div className="flex justify-center items-center h-auto lg:h-full py-6 lg:py-0">
              <img
                src={"/about.png"}
                alt="about"
                className="w-[60vw] sm:w-[40vw] lg:w-[30vw] max-h-[300px] lg:max-h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Cozee Works Section */}
        <div className=" min-h-screen flex justify-center items-center flex-col text-center  lg:px-0 py-12 lg:py-0">
          <div className="customBg md:min-h-[50vh] max-md:h-[40vh] flex flex-col justify-center items-center max-md:justify-start w-full bg-slate-500 py-8 lg:py-16">
            <h2 className="text-2xl  max-md:text-sm mb-2 lg:mb-4 text-white">
              Find Your Next Destination in Simple Steps
            </h2>
            <div className=" mt-3 mb-3 w-10 h-1 bg-white rounded"></div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              How MY COZEE Works
            </h1>
          </div>

          <div className="grid grid-cols-4 max-md:flex max-md:flex-wrap  gap-10 justify-center relative bottom-20">
            <CozeeWorksCards />
            <CozeeWorksCards />
            <CozeeWorksCards />
            <CozeeWorksCards />
          </div>
        </div>
        <div className="flex flex-col py-20 max-md:py-5 justify-center items-center text-center">
          <p className="max-md:hidden">The Team Behind MyCozee</p>
          <div className="customBg max-md:hidden mt-3 mb-3 w-10 h-1 bg-black rounded"></div>
          <h1 className="text-4xl font-semibold">
            <span className="max-md:text-xl max-md:font-light">Meet Our</span>{" "}
            <br className="md:hidden" /> Founders
          </h1>
          <div className="customBg md:hidden mt-3 mb-3 w-10 h-1 bg-black rounded"></div>

          <p className="md:hidden mt-2"> The Team Behind MyCozee</p>
        </div>
        <div className="flex max-md:flex-wrap px-[9vw] gap-5">
          <ProfileCard
            src={"/profile1.png"}
            name="Kunnal Goswami"
          ></ProfileCard>
          <ProfileCard
            src={"/niket.jpeg"}
            name="Niket Raghuvanshi"
          ></ProfileCard>
          <ProfileCard src={"/profile3.png"} name="Rohit Sejwal"></ProfileCard>
        </div>
        <div className="flex flex-col py-20 justify-center items-center text-center">
          <h1 className="text-4xl font-semibold text-[#BC2C3D]">
            Latest Updates
          </h1>
          <div className="bg-white mt-3 mb-3 w-24 h-1  rounded"></div>
        </div>
        <div className="flex flex-wrap  px-10  justify-center items-center gap-10">
          <LatestUpdateCard></LatestUpdateCard>
          <LatestUpdateCard></LatestUpdateCard>
          <LatestUpdateCard></LatestUpdateCard>
          <LatestUpdateCard></LatestUpdateCard>
          <LatestUpdateCard></LatestUpdateCard>
          <LatestUpdateCard></LatestUpdateCard>
        </div>

        <div className="flex flex-col py-20 justify-center items-center text-center max-md:py-10">
          <p className="max-md:hidden">Testimonials</p>
          <div className="customBg max-md:hidden mt-3 mb-3 w-10 h-1  rounded"></div>

          <h1 className="text-4xl max-md:text-3xl">What our Clients Say</h1>
          <p className="md:hidden">Testimonials</p>
          <div className="customBg md:hidden mt-3 mb-3 w-10 h-1  rounded"></div>
        </div>
        <div className="w-full h-[50vh] max-md:hidden px-[15vh]">
          <Swiper
            pagination={{
              clickable: true,
            }}
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
            loop={true}
          >
            {
              testimonial?.map((i,index)=>(

            <SwiperSlide >
              <Testimonial data={i} key={index} />
            </SwiperSlide>
              ))
            }
            {/* <SwiperSlide>
              <Testimonial />
            </SwiperSlide>
            <SwiperSlide>
              <Testimonial />
            </SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
          </Swiper>
        </div>
        <div className="w-full h-[50vh] md:hidden">
          <Swiper
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
            loop={true}
          >
            <SwiperSlide>
              <Testimonial />
            </SwiperSlide>
            <SwiperSlide>
              <Testimonial />
            </SwiperSlide>
            <SwiperSlide>
              <Testimonial />
            </SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
        <div>
          <Explore></Explore>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
