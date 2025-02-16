import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTeam,
  getAdminTeam,
  getTeamDetails,
} from "../../store/Action/User";

const TeamCard = ({ data, setselectedTeam }) => {
  const [memebers, setmemebers] = useState(0);
  useEffect(() => {
    if (data?.members) {
      const acceptedMembers = data.members.reduce(
        (count, member) => (member.accepted ? count + 1 : count),
        0
      );
      setmemebers(acceptedMembers);
    } else {
      setmemebers(0);
    }
  }, [data]);
  console.log("====================================");
  console.log(memebers);
  console.log("====================================");
  return (
    <button
      onClick={() => setselectedTeam(data)}
      className="flex flex-col w-full items-start justify-center border-b-2 pb-2 hover:rounded-xl hover:bg-gray-200 p-2 transition-all ease-linear cursor-pointer"
    >
      <h1 className="font-semibold text-3xl">{data?.teamName}</h1>
      <h5 className="text-sm ">{memebers} Members</h5>
    </button>
  );
};

const Team = ({ open, setselectedTeam }) => {
  const { team, teamDets, loading } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeamDetails());
    dispatch(getAdminTeam());
  }, []);

  return (
    <div className="w-full h-full flex items-center gap-5 justify-center flex-col p-4">
      {/* <img
        src="/team.png"
        alt="Team"
        className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4" // Adjust image size responsively
      /> */}
      {/* <div className="flex flex-col w-full h-full">
        {team?.map((i, index) => (
          <div className="flex items-center justify-between p-2 border-2">
            <div className="flex items-center justify-center gap-2">
              <img
                src={`${i?.user?.avatar.url}`}
                className="h-10 w-10 rounded-full border-2 "
                alt=""
              />
              <h1>
                {i?.user?.firstname} {i?.user?.lastname}
              </h1>
            </div>
            <button className="bg-primary p-2 px-3 rounded-xl text-white font-semibold ">
              Send Request
            </button>
          </div>
        ))}
      </div> */}

      <div className="flex flex-col w-full mt-2">
        {teamDets?.map((i, index) => (
          <TeamCard data={i} key={index} setselectedTeam={setselectedTeam} />
        ))}
      </div>

      {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary text-center">
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
      </h3> */}
    </div>
  );
};

export default Team;
