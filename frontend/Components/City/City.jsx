import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import FilterChip from "../FilterChip";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getCityById, getFilterData } from "../../store/Action/Others";
import { Skeleton } from "@mui/material";
import Loading from "../Loading";
import PlaceSearch from "./PlaceSearch";

const City = () => {
  const data = [
    {
      image: [
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
      ],
    },
    {
      image: [
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
      ],
    },
    {
      image: [
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
      ],
    },
    {
      image: [
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
        { img: "/room.png" },
      ],
    },
    {
      image: [],
    },
    {
      image: [],
    },
  ];
  const { cityId, loading,filterData } = useSelector((state) => state.Others);
  const { name, id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCityById(id));
  }, []);
  const [val, setval] = useSearchParams();
  val.get("type");

  console.log(cityId);
  const [filterType, setfilterType] = useState("Roommate");
  const [loadingImage, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };
  useEffect(() => {
  dispatch(getFilterData("Roommate",name,"",""))
  }, [])

  return (
    <>
      <>
        {loading && <Loading />}

        <div className="w-full h-[76vh] max-md:min-h-[100vh] text-white gap-6 relative flex flex-col items-center justify-center max-md:gap-2 max-md:px-10">
          <div className="overlayCity z-10 "></div>
          {loadingImage && (
            <Skeleton className="h-full absolute bg-black z-50 top-0 left-0 w-full" />
          )}
          <img
            src={`${cityId?.backgroundImage?.url}`}
            onLoad={handleImageLoad} // Trigger when image loads
            className="absolute left-0 top-0 w-full h-full object-fill object-center"
            alt=""
          />
          {/* <PlacesSearch/> */}
          <h1 className="relative z-10 text-6xl font-extrabold capitalize max-md:text-3xl">
            {name}
          </h1>
          <h3 className="relative z-10 text-2xl font-medium max-md:text-xl max-md:text-center">
            Find you next roommate
          </h3>
          <FilterChip
            type={filterType}
            selectedC={name}
            settype={setfilterType}
          />
        </div>
        <div className="w-full min-h-screen flex items-start justify-center pb-20 flex-wrap gap-7 px-[10vw] py-10">
          {/* <PlaceSearch/> */}
          {filterData?.map((i, index) => (
            <Card listing={true} data={i} index={index} />
          ))}{" "}
        </div>
      </>
    </>
  );
};

export default City;
