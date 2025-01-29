import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Page1 from "../Components/HomePage/Page1";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMatches,
  getMatchesListing,
  getUserTenant,
} from "../store/Action/User";
import Page2 from "../Components/HomePage/Page2";
import { useParams } from "react-router-dom";

const ListingMatch = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [filterType, setfilterType] = useState("Roommate");
  const { matches, loading, tenant } = useSelector((state) => state.User);
  useEffect(() => {
    dispatch(getMatchesListing(id));
  }, []);
  console.log(matches, 456);

  return (
    <>
      <NavBar />
      <Page1 type={filterType} settype={setfilterType} />
      <Page2
        type={filterType}
        settype={setfilterType}
        data={matches}
        loading={loading}
        match={true}
        userShow={true}
      />
      <Footer />
    </>
  );
};

export default ListingMatch;
