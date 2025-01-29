import { NavLink } from "react-router-dom";
import CityCard from "../../Components/HomePage/CityCard";

const Cities = ({ city }) => {
  return (
  <div className="flex flex-col w-full mt-10 ">
      <div className="w-full relative bg-gray-200 h-[50vh] max-md:h-[50vh]  overflow-hidden flex items-center justify-center">
    <h1 className="text-2xl max-md:text-xl  text-white relative z-20  text-center ">
      View rooms in <br /> <span className=" text-4xl  font-bold ">Popular Cities</span>
    </h1>
    <div className="overlayCity z-10 "></div>

    <img src="/homeBg.png" className="absolute w-full object-contain h-full" alt="" />
    </div>
    <div className=" w-full flex flex-col  justify-center p-10 px-4 md:px-[10rem] gap-20">



      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-full">
        {city?.map((i, index) => (
          <NavLink to={`/city/${i._id}/${i?.name}`}>
            <CityCard data={i} key={index} />
          </NavLink>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Cities;
