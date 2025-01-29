import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../store/Action/Others";

const FooterDropDown = ({ open }) => {
  const [state, setstate] = useState([]);
  const [selected, setselected] = useState();
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.Others);
  useEffect(() => {
    setstate(State.getStatesOfCountry("IN"));
    setselected(state[0]?.name);
    dispatch(getAllCity());
    if (city?.length > 0) {
      setselected(city[0]?.name);
    }
  }, []);

  const locations = [
    "Rooms in Andheri East Mumbai",
    "Rooms in Andheri East Mumbai",
    "Rooms in Andheri East Mumbai",
    "Rooms in Andheri East Mumbai in hr",
    "Rooms in Andheri East",
    "Rooms in Andheri East Mumbai in hr",
    "Rooms in Andheri East",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Andheri East Mumbai in hr",
    "Rooms in Andheri East",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Andheri East Mumbai in hr",
    "Rooms in Andheri East",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Andheri East Mumbai in hr",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Andheri East Mumbai in hr",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Andheri East Mumbai in hr",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
    "Rooms in Navi Mumbai",
  ];
  return (
    <div
      className={`w-full mt-5 p-5 flex flex-col transition-all  px-0  ease-linear duration-500  ${
        open ? "max-h-[400px] opacity-100 max-md:min-h-fit" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="flex shrink-0 gap-4  flex-nowrap  overflow-x-auto footerS">
        {city?.map((i, index) => (
          <h1
            key={index}
            className={`shrink-0 relative cursor-pointer text-gray-500 text-nowrap capitalize ${
              selected === i?.name && "text-primary"
            }`}
            onClick={() => setselected(i?.name)}
          >
            {i?.name}

            <div
              className={`h-[1px] w-full rounded-full absolute ease-linear duration-200 -bottom-0 left-0 ${
                selected === i?.name ? "bg-primary" : "bg-transparent"
              } `}
            ></div>
          </h1>
        ))}
      </div>
      <div className="grid gap-4 max-md:gap-2 py-5 grid-cols-4 pb-40 max-md:grid-cols-2 max-md:pb-10  max-md:h-fit">
        {locations?.map((loc, index) => (
          <h1 key={index} className="text-xs cursor-pointer font-extralight ">
            {loc}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default FooterDropDown;
