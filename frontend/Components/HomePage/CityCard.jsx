import React from "react";
import { useDispatch } from "react-redux";
import { deleteCity } from "../../store/Action/Admin";

const CityCard = ({ data, cross }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteCity(id));
  };
  return (
    <div className="cityCard border-2 h-[35vh] w-full relative rounded-xl overflow-hidden">
      <img
        src={`${data?.cardImage?.url}`}
        className="h-full w-full object-cover"
        alt=""
      />
      <h1 className="uppercase  z-20 font-extrabold text-white text-[1.5rem] absolute left-1/2 bottom-10 -translate-x-1/2">
        {data?.name}
      </h1>
      <div className="overlay"></div>
      {cross && (
        <i
          onClick={() => handleDelete(data?._id)}
          className="ri-close-circle-fill absolute top-1 right-2 cursor-pointer text-lg text-primary"
        ></i>
      )}
    </div>
  );
};

export default CityCard;
