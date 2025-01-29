import React, { useEffect } from "react";
import CityCard from "./CityCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../../store/Action/Others";
import { NavLink } from "react-router-dom";
import Loading from "../Loading";

const Page3F = () => {
  const dispatch = useDispatch();
  const { city, loading } = useSelector((state) => state.Others);
  useEffect(() => {
    dispatch(getAllCity());
  }, []);

  return (
    <div className="min-h-screen items-center relative w-full flex flex-col gap-10 md:gap-20 justify-start py-10 md:py-20">
      <h1 className="text-2xl md:text-4xl text-center">
        {" "}
        <span className="text-xl">View rooms in</span> <br />{" "}
        <span className="font-bold">Popular Cities</span>
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-[5vw] md:px-[10vw] w-full">
          {city?.slice(0,12)?.map((i, index) => (
            <NavLink to={`/city/${i._id}/${i?.name}`}>
              <CityCard data={i} key={index} />
            </NavLink>
          ))}
        </div>
      )}
      <NavLink to="/viewcities">
        <button className="bg-primary text-sm sm:text-base md:text-xl left-1/2 bottom-5 md:bottom-10 flex items-center justify-center gap-2 -translate-x-1/2 text-white px-6 sm:px-8 md:px-10 font-normal py-2 rounded-full absolute">
          View All Cities
          <i className="ri-arrow-right-wide-line"></i>
        </button>
      </NavLink>
    </div>
  );
};

export default Page3F;
