import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import FilterChip from "../Components/FilterChip";
import { Footer } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { getFilterData, getFilterTenant } from "../store/Action/Others";
import Card from "../Components/Card";

const ListingPage = () => {
  const [filterType, setfilterType] = useState("Roommate");
  const { filterData, listing, pg } = useSelector((state) => state.Others);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.Auth);
  const getQueryParams = () => {
    const hash = window.location.hash; // Get hash route
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    return new URLSearchParams(queryString);
  };

  const queryParams = getQueryParams();
  const type = queryParams.get("type") || "Roommate";
  const location = queryParams.get("location") || "";
  const budget = queryParams.get("budget") || "";
  const gender = queryParams.get("gender") || "";

  console.log(type, gender, budget, location, 1234); // Debugging

  // Search function
  const search = (type, location, budget, gender) => {
    console.log("hello garvit", 456);

    if (user?.role === "owner") {
      dispatch(getFilterTenant(location, budget, gender));
    } else {
      dispatch(getFilterData(type, location, budget, gender));
    }
  };
  // useEffect(() => {
  //   // if (filterType === "Roommate") {
  //   if (user?.role === "owner") {
  //     dispatch(getFilterTenant(user?.city, "", ""));
  //   } else {
  //     dispatch(getFilterData("", "", "", ""));
  //   }

  //   // if (filterType === "PG") {
  //   //   dispatch(getAllPgs());
  //   // }
  // }, [user?.role]);
  // Fetch data when query params change
  useEffect(() => {
      search(type, location, budget, gender);
    
  }, [type, location, budget, gender]);

  return (
    <>
      <NavBar />
      <div className="w-full mt-[15vh] min-h-screen flex flex-col items-center">
        <FilterChip
          location={location}
          search={search}
          type={filterType}
          settype={setfilterType}
        />
        <div className="w-full h-fit flex items-start justify-center pb-20 flex-wrap gap-7 px-[10vw] py-10">
          <>
            {filterData?.length === 0 ? (
              <div className="h-[20vh] flex items-center justify-center w-full">
                <h1>No Data available</h1>
              </div>
            ) : (
              filterData?.map(
                (item, index) =>
                  user?._id !== item?.user?._id && (
                    <Card
                      key={index}
                      // showModal={showModal}
                      data={item}
                      index={index}
                      type={filterType}
                      listing={filterType === "Roommate"}
                      // match={match}
                      userShow={user?.role === "owner" && true}
                    />
                  )
              )
            )}
          </>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingPage;
