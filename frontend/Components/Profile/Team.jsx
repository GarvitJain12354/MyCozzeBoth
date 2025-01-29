import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamDetails } from "../../store/Action/User";

const Team = () => {
  const { team } = useSelector((state) => state.User);
  console.log(team);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeamDetails());
  }, []);
  return (
    <div className="w-full h-full flex items-center gap-5 justify-center flex-col p-4">
      <img
        src="/team.png"
        alt="Team"
        className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4" // Adjust image size responsively
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary text-center">
        Together, we achieve more
      </h1>
      <p className="w-full sm:w-3/4 md:w-1/2 font-light text-base sm:text-lg text-center">
        If you're unable to find a flat on your own, you can team up with other
        users to search for one together.
      </p>

      <button className="bg-primary w-fit py-2 sm:py-3 px-6 sm:px-8 text-white text-lg sm:text-xl rounded-md">
        Create Team Now
      </button>
      <h3 className="bg-[#D4D4D4] p-2 sm:p-3 font-light text-xs sm:text-sm text-center w-full sm:w-3/4 md:w-1/2">
        Over 50,000 people have found help by teaming up with others, making it
        easier and faster to meet their needs.
      </h3>
    </div>
  );
};

export default Team;
