import React, { useEffect, useRef } from "react";
import FilterChip from "../FilterChip";
import Typed from "typed.js";

const Page1 = ({ type, settype, search, user }) => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed("#text", {
      strings: ["Roommate", "Flats", "PGs"],
      typeSpeed: 60,
      loop: true,
      backSpeed: 50,
      backDelay: 1000,
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="h-screen w-full flex flex-col items-center gap-5 justify-center relative">
      <h1 className="text-4xl md:text-5xl  max-md:h-32   text-center relative z-20">
        <span>The</span> <br className="md:hidden" /> best way to find{" "}
        <br className="md:hidden" />
        <span
          id="text"
          ref={el}
          className="text-primary font-extrabold relative z-20"
        ></span>
      </h1>
      <h3 className="w-[90%] md:w-[70%] lg:w-[60%] text-center text-sm md:text-base relative z-20">
        MyCozee connects you to millions of people looking for roommates and
        posting rooms, PGs you can't find anywhere else. Stop stressing and let
        us help you find the right fit.
      </h3>
      <div className="w-full px-8 flex justify-center items-center">
        {user?.role === "owner" ? (
          <FilterChip search={search} type={type} owner={true} settype={settype} selectedC={user?.city} />
        ) : (
          <FilterChip search={search} type={type} settype={settype} />
        )}
      </div>
      {/* Show img1 on medium and larger screens */}
      <img
        src="/homeBg.png"
        className="img1 w-full h-[30%] md:h-[55%] object-cover absolute bottom-0 left-0 hidden md:block"
        alt="Background"
      />

      {/* Show img2 on small screens only */}
      <img
        src="/homePage.png"
        className="img2 w-full h-[30%] md:h-[50%] object-cover absolute bottom-0 left-0 block md:hidden"
        alt="Background"
      />
    </div>
  );
};

export default Page1;
