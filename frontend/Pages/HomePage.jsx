import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { Divider } from "@mui/material";
import Card from "../Components/Card";
import Page2 from "../Components/HomePage/Page2";
import Page3 from "../Components/HomePage/Page3";
import Page4 from "../Components/HomePage/Page4";
import Page5 from "../Components/HomePage/Page5";
import Page1 from "../Components/HomePage/Page1";
import Page3F from "../Components/HomePage/Page3F";
import Page4F from "../Components/HomePage/Page4F";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListings,
  getAllPgs,
  getFilterData,
  getFilterTenant,
} from "../store/Action/Others";
import { getAllMatches } from "../store/Action/User";
import PricingPage from "../Components/priceingcard/Pricingcard";
import Loading from "../Components/Loading";
import RazorpayPayment from "./PaymentDemo";
import HomePage2 from "../Components/HomePage/HomePage2";
import HomePage3 from "../Components/HomePage/HomePage3";

export function FluentBuildingBankLink24Regular(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="black"
        d="M13 6.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0m.032-3.925a1.75 1.75 0 0 0-2.064 0L3.547 7.74c-.978.713-.473 2.26.736 2.26H4.5v5.8A2.75 2.75 0 0 0 3 18.25v1.5c0 .413.336.75.75.75h7.416a4.8 4.8 0 0 1-.16-1.5H4.5v-.75c0-.691.56-1.25 1.25-1.25h5.816a4.8 4.8 0 0 1 1.268-1.5h-.084V10h1.75v4.666a4.8 4.8 0 0 1 1.25-.167H16V10h2v4.5h1.25q.126 0 .25.007V10h.217c1.21 0 1.714-1.546.736-2.26zm-1.18 1.211a.25.25 0 0 1 .295 0L18.95 8.5H5.05zM11.25 10v5.5H9.5V10zM6 15.5V10h2v5.5zm17 3.75a3.75 3.75 0 0 0-3.75-3.75l-.102.007A.75.75 0 0 0 19.25 17l.154.006a2.25 2.25 0 0 1-.154 4.494l-.003.005l-.102.007a.75.75 0 0 0 .108 1.493V23l.2-.005A3.75 3.75 0 0 0 23 19.25m-6.5-3a.75.75 0 0 0-.75-.75l-.2.005a3.75 3.75 0 0 0 .2 7.495l.102-.006a.75.75 0 0 0-.102-1.494l-.154-.005A2.25 2.25 0 0 1 15.75 17l.102-.006a.75.75 0 0 0 .648-.744m3.5 3a.75.75 0 0 0-.75-.75h-3.5l-.102.007A.75.75 0 0 0 15.75 20h3.5l.102-.006A.75.75 0 0 0 20 19.25"
      ></path>
    </svg>
  );
}

export function MdiFamilyRoom(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="black"
        d="M12.5 7c0-1.11.89-2 2-2H18c1.1 0 2 .9 2 2v2.16c-1.16.41-2 1.51-2 2.81V14h-5.5zM6 11.96V14h5.5V7c0-1.11-.89-2-2-2H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.52 2 2.81m14.66-1.93c-.98.16-1.66 1.09-1.66 2.09V15H5v-3a2 2 0 1 0-4 0v5c0 1.1.9 2 2 2v2h2v-2h14v2h2v-2c1.1 0 2-.9 2-2v-5c0-1.21-1.09-2.18-2.34-1.97"
      ></path>
    </svg>
  );
}

export function CarbonPartnership(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="black"
        d="M8 9a4 4 0 1 1 4-4a4 4 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m16 6a4 4 0 1 1 4-4a4 4 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m2 27h-4a2 2 0 0 1-2-2v-7h2v7h4v-9h2v-6a1 1 0 0 0-1-1h-6.42L16 20l-4.58-8H5a1 1 0 0 0-1 1v6h2v9h4v-7h2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3 3 0 0 1 3-3h7.58L16 16l3.42-6H27a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2v7a2 2 0 0 1-2 2"
      ></path>
    </svg>
  );
}

export function PhBuildingOffice(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="black"
        d="M248 208h-16V96a8 8 0 0 0 0-16h-48V48a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16v160H24a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16M216 96v112h-32V96ZM56 48h112v160h-24v-48a8 8 0 0 0-8-8H88a8 8 0 0 0-8 8v48H56Zm72 160H96v-40h32ZM72 80a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16H80a8 8 0 0 1-8-8m48 0a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16h-16a8 8 0 0 1-8-8m-48 40a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16H80a8 8 0 0 1-8-8m48 0a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16h-16a8 8 0 0 1-8-8"
      ></path>
    </svg>
  );
}
const HomePage = () => {
  const { filterData, listing, pg } = useSelector((state) => state.Others);

  const [filterType, setfilterType] = useState("Roommate");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.Auth);
  const search = (type, location, budget, gender) => {
    if (user?.role === "owner") {
      dispatch(getFilterTenant(user?.city, budget, gender));
    } else {
      dispatch(getFilterData(type, location, budget, gender));
    }
  };
  useEffect(() => {
    // if (filterType === "Roommate") {
    console.log(user?.role, 459);

    if (user?.role === "owner") {
      dispatch(getFilterTenant(user?.city, "", ""));
    } else {
      dispatch(getFilterData("", "", "", ""));
    }

    // if (filterType === "PG") {
    //   dispatch(getAllPgs());
    // }
  }, [user?.role]);

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Page1
            search={search}
            user={user}
            type={filterType}
            settype={setfilterType}
          />
          {/* <Page2
            data={filterData}
            loading={loading}
            type={filterType}
            settype={setfilterType}
            userShow={user?.role === "owner" && true}
          /> */}
          <HomePage2/>
          <HomePage3/>
          <Page3F />
          <Page4F />
        </>
      )}

      {/* <Page3/>
  <Page4/>
  <Page5/> */}
      <Footer />
    </>
  );
};

export default HomePage;
