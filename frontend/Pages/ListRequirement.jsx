import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import AddProperty from "../Components/Listing/AddProperty";
import AddTenant from "../Components/Listing/AddTenant";
import { useSelector } from "react-redux";

const ListRequirement = ({typeS}) => {
  const [type, settype] = useState(typeS);
  const { user } = useSelector((state) => state.User);
  return (
    <>
      <NavBar close={true} />
      <div className="min-h-screen flex flex-col items-center justify-start  w-full mt-20 px-[10vh] py-5vh gap-5  max-md:px-[2vh]">
        {type === "property" ? (
          <AddTenant settype={settype} />
        ) : type === "tenant" ? (
          <AddProperty settype={settype} user={user} />
        ) : (
          <>
            <h1 className="font-semibold text-5xl mt-10 max-md:text-3xl">List Your Requirement</h1>
            <p className="text-lg w-[50%] text-center max-md:w-full max-md:text-base">
              Whether you're looking for a compatible roommate or need to rent
              out your space, we've got you covered.
            </p>
            <div className="flex items-center mt-10 justify-center gap-8 w-[70%] max-md:w-full max-md:flex-wrap">
              <div
                onClick={() => settype("property")}
                className="w-1/2 border-2 rounded-2xl h-[35vh] flex flex-col justify-between p-10 cursor-pointer max-md:w-full "
              >
                <div className="flex flex-col items-start ">
                  <h1>Need a property ?</h1>
                  <h5>With a flatemate</h5>
                </div>
                <div className="flex w-full items-end justify-between">
                  <button className="flex items-center justify-center bg-primary text-white p-2 px-6 rounded-xl">
                    Proceed
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                  <img
                    src="/rent.png"
                    className="object-contain h-full"
                    alt=""
                  />
                </div>
              </div>
              <div
                onClick={() => settype("tenant")}
                className="w-1/2 border-2 rounded-2xl h-[35vh] flex flex-col p-10 justify-between cursor-pointer max-md:w-full"
              >
                <div className="flex flex-col items-start ">
                  <h1>Need a tenant ?</h1>
                  <h5>For your property </h5>
                </div>
                <div className="flex w-full items-end justify-between  -mt-10 pb-10">
                  <button className="flex items-center justify-center mb-5  bg-primary text-white p-2 px-6 rounded-xl">
                    Proceed
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                  <img src="/tenant.png" className="object-contain " alt="" />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-[10vh] gap-4 mt-8 max-md:px-[3vh]">
              <h1 className="font-semibold">
                How to Unlock Your Ideal Living Space with FlatMate.in
              </h1>
              <p>
                Are you chasing the dream of the perfect flat or the ultimate
                flatmate? Look no further than flatmate, your all-in-one
                solution for discovering the finest spaces and compatible
                roomies. With 1000+ listings, FlatMate is engineered to simplify
                your quest, make it more efficient, and, most importantly,
                liberate you from those pesky brokerage fees. Let's dive into
                how FlatMate.in operates, so you can find the perfect spot for
                you.
              </p>
              <h1 className="font-semibold">
                1. Discover Your Ideal Location with Search:
              </h1>
              <p>
                The journey commences with a straightforward quest. On
                FlatMate.in, you possess the authority to search into your
                favored location and unearth the listings that align with your
                requirements. Whether you're in pursuit of a room, a flat, or
                looking for a flatmates to share your space, our user-friendly
                exploration feature empowers you to filter your options based on
                your preferences, budget, and geographical preference.
              </p>
              <h1 className="font-semibold">
                2. Explore 100% Brokerage-Free Listings:
              </h1>
              <p>
                At FlatMate.in, we boast of our broker-free approach. What does
                this signify for you? It means no need to struggle with the
                added costs of brokerage fees. All our listings are 100%
                brokerage-free, ensuring you obtain the best value for your
                money.
              </p>
              <br />
              <p>
                You can also check compatibility match percentages for potential
                flatmate options. This distinctive feature aids you in measuring
                how well your inclinations harmonize with those of potential
                flatmates, making it simpler to pinpoint a suitable living
                situation. Once you've pinpointed a match, you can directly
                connect with them through our platform. You can opt to drop them
                a message via our secure chat feature or ring them up directly –
                the choice is yours.
              </p>
              <h1 className="font-semibold">
                3. Post Your Requirement and Safeguard Your Privacy:
              </h1>
              <p>
                FlatMate.in isn't solely about exploring listings. it's also
                about disclosing your own preferences to others. You can post
                out your requirements, creating a listing that spotlights what
                you seek in your ideal living arrangement. Your listing will be
                visible to other users, and they can get in touch if they think
                they meet your criteria.
              </p>
              <br />
              <p>
                We grasp that privacy ranks supremely important, and that's why
                we offer the option to hide your contact number in your listing.
                Your personal information remains locked away, and you need not
                disclose your phone number to anyone until you're ready to do
                so. Interaction is streamlined through our secure chat feature,
                guaranteeing that your personal data remains confidential.
              </p>
              <h1 className="font-semibold">4. Create Team:</h1>
              <p>
                We know that occasionally, you might not discover an ideal spot
                for yourself on our platform. Hence, we created the "Create
                team" function. If you can't find a place, consider joining
                teaming up with users searching of a home in same locality.
                Working together can make your search easier. By establishing a
                team, you'll gain future flatmates and collectively track down
                your future abode.
              </p>
              <h1 className="font-semibold">
                5. Get Professional Help with Our RM Plan:
              </h1>
              <p>
                Short on time or want to speed up your hunt for the perfect flat
                or flatmate? Take help from our Relationship Managers. Our
                professional and dedicated Relationship Managers are here to
                understand your needs, choices, and lifestyle. They will employ
                their finesse to search the ideal matches for you, save your
                time and effort in the process.
              </p>
              <p>
                With MyCozee, you can take comfort in the fact that your
                expedition to find the perfect room or roommate is smoothed and
                made more efficient. Our platform is architected to be
                user-friendly, secure, and free of brokerage fee, providing you
                with the ultimate ease in your search for rooms on rent, flats,
                and compatible flatmates. So, embark on your pursuit today and
                find your dreamy space with FlatMate.in.
              </p>{" "}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ListRequirement;
