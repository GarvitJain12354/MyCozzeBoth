import { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import MonthBar from "./BarChart";
import { useDispatch, useSelector } from "react-redux";

import {
  getAdminDashboardDetails,
  getAdminDashboardListing,
} from "../../store/Action/Admin";
import { DatePicker, Modal, Select } from "antd";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Loading from "../../Components/Loading";
import YearlyUsersChart from "./SplineUserChart";
const { RangePicker } = DatePicker;

const DashboardAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setfilter] = useState("Months");
  const [data, setdata] = useState("Daily");
  const [customDate, setCustomDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value) => {
    setdata(value);

    if (value === "Custom Date") {
      setIsModalOpen(true); // Open modal when "Custom Date" is selected
    } else {
      setIsModalOpen(false);
    }
  };

  const handleDateChange = (date, dateString) => {
    setCustomDate(date);
    dispatch(getAdminDashboardDetails(data, dateString[0], dateString[1]));
  };
  const { dashboard, dashboardlisting, loading } = useSelector(
    (state) => state.Admin
  );
  const dispatch = useDispatch();
  // console.log(dashboardlisting, 486);

  useEffect(() => {
    dispatch(getAdminDashboardDetails(data));
    dispatch(getAdminDashboardListing(filter));
  }, [data]);
  // const handleChange = (value) => {
  //   setdata(value);
  //   // dispatch(getAdminDashboardListing(filter));
  // };
  // console.log(data, 746);

  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Dashboard"} isOpen={isOpen}></AdminSidebar>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full p-10 overflow-y-auto">
            <div className="py-5 flex items-center justify-between">
              {" "}
              <h1 className="text-3xl max-md:text-xl">Dashboard</h1>
              <div className="flex items-center justify-center gap-4">
                <Select
                  suffixIcon={
                    <Icon
                      icon="solar:calendar-line-duotone"
                      width="20"
                      height="20"
                    />
                  }
                  // defaultValue="Listings"
                  value={data}
                  style={{
                    width: 200,
                    fonySize: "3.5rem",
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Daily",
                      label: "Daily",
                    },
                    {
                      value: "Weekly",
                      label: "Weekly",
                    },
                    {
                      value: "Monthly",
                      label: "Monthly",
                    },
                    {
                      value: "Yearly",
                      label: "Yearly",
                    },
                    {
                      value: "Custom Date",
                      label: "Custom Date",
                    },
                  ]}
                />
                {isModalOpen && (
                  <RangePicker value={customDate} onChange={handleDateChange} />
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-start p-6 justify-center">
                <h1 className="text-4xl">₹ {dashboard?.filteredIncome}</h1>
                <h1 className="text-base">
                  {data === "Custom Date"
                    ? `${new Date(
                        customDate[0]
                      ).toLocaleDateString()} - ${new Date(
                        customDate[1]
                      ).toLocaleDateString()} Income`
                    : `${data} Income`}
                </h1>
              </div>
              {/* {data === "Listings" ? (
              <>
                <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                  <h1>Today's Income</h1>
                  <h1>₹ {dashboard?.todaysIncome}</h1>
                </div>
                <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                  <h1>Total Listings</h1>
                  <h1>{dashboard?.totalListings}</h1>
                </div>
                <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                  <h1>Monthly Listings</h1>
                  <h1>{dashboard?.monthlyListings}</h1>
                </div>
                <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                  <h1>Yearly Listings</h1>
                  <h1>{dashboard?.yearlyListings}</h1>
                </div>
              </>
            ) : data === "Flatmates" ? (
              <>
                <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                  <h1>Total Flatemates</h1>
                  <h1>{dashboard?.flatemate}</h1>
                </div>
              </>
            ) : data === "Owners" ? (
              <>
                <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                  <h1>Total Owners</h1>
                  <h1>{dashboard?.owner}</h1>
                </div>
              </>
            ) : data === "PGs" ? (
              <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                <h1>Total PGs</h1>
                <h1>{dashboard?.pg}</h1>
              </div>
            ) : (
              ""
            )} */}
            </div>
            {/* <div className="  gap-4 w-full mt-4">
              <h1 className="p-4 font-semibold text-2xl">Listings Data</h1>
              <MonthBar monthlySales={dashboardlisting} />
            </div> */}
            <div className="flex flex-col w-[70%] border-2 rounded-lg p-4 mt-4">
              <h1 className="text-2xl font-semibold translate-x-6">
                Listing User Registration
              </h1>
              <YearlyUsersChart data={dashboardlisting} />
            </div>
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default DashboardAdmin;
