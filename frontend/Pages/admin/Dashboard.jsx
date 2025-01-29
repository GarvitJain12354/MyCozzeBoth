import { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import MonthBar from "./BarChart";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminDashboardDetails,
  getAdminDashboardListing,
} from "../../store/Action/Admin";
import { Select } from "antd";

const DashboardAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setfilter] = useState("Months");
  const [data, setdata] = useState("Listings");
  const { dashboard, dashboardlisting } = useSelector((state) => state.Admin);
  const dispatch = useDispatch();
  // console.log(dashboardlisting, 486);

  useEffect(() => {
    dispatch(getAdminDashboardDetails());
    dispatch(getAdminDashboardListing(filter));
  }, []);
  const handleChange = (value) => {
    setdata(value);
    dispatch(getAdminDashboardListing(filter));

  };
  // console.log(data, 746);

  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Dashboard"} isOpen={isOpen}></AdminSidebar>

        <div className="w-full p-10 overflow-y-auto">
          <div className="py-5 flex items-center justify-between">
            {" "}
            <h1 className="text-3xl max-md:text-xl">Dashboard</h1>
            <Select
              // defaultValue="Listings"
              value={data}
              style={{
                width: 200,
                fonySize: "3.5rem",
              }}
              onChange={handleChange}
              options={[
                {
                  value: "Listings",
                  label: "Listings",
                },
                {
                  value: "PGs",
                  label: "PGs",
                },
                {
                  value: "Flatmates",
                  label: "Flatmates",
                },
                {
                  value: "Owners",
                  label: "Owners",
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data === "Listings" ? (
              <>
                <div className="w-full font-semibold text-2xl h-[20vh] rounded-2xl bg-gray-200 flex flex-col items-center justify-center">
                  <h1>Yearly Income</h1>
                  <h1>₹ {dashboard?.yearlyIncome}</h1>
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
            )}
          </div>
          <div className="  gap-4 w-full mt-4">
            <h1 className="p-4 font-semibold text-2xl">Listings Data</h1>
            <MonthBar monthlySales={dashboardlisting} />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardAdmin;
