import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListing,
  getAllPg,
  getAllUser,
  updateStatusListing,
} from "../../store/Action/Admin";
import { Switch } from "antd";
import { Button } from "antd";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";
import CustomDropdown from "../../Components/Auth/CustomDropDown";
import AdminPgDropdown from "../../Components/Admin/AdminPgDropdown";
import AdminRoomPopUp from "../../Components/Admin/AdminRoomPopUp";
import CityCard from "../../Components/HomePage/CityCard";
import CityAddAdmin from "../../Components/Admin/CityAddAdmin";
import { getAllCity } from "../../store/Action/Others";
const AdminCity = () => {
  const dispatch = useDispatch();
  const { pg, totalPages, loading, error, message } = useSelector(
    (state) => state.Admin
  ); // Adjust according to your state structure
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of rows per page
  const { city } = useSelector((state) => state.Others);
  useEffect(() => {
    dispatch(getAllCity());
  }, [dispatch, currentPage]);
  const [checked, setChecked] = useState(true);
  const [openAdd, setopenAdd] = useState(false);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllCity());
      dispatch(clearAdminMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [message, error]);

  const onChange = (id) => {
    // // console.log(`switch to ${checked}`);
    // setChecked(!checked);
    dispatch(updateStatusListing(id));
  };
  const option = [
    {
      name: "Pending",
    },
    {
      name: "Published",
    },
    {
      name: "Rejected",
    },
  ];
  const [selectedPg, setselectedPg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-screen overflow-hidden">
     <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
      <AdminSidebar title={"City"}  isOpen={isOpen}></AdminSidebar>

        {loading ? (
          <Loading />
        ) : !selectedPg ? (
          <div className="w-full p-10 overflow-y-auto ">
            <div className="w-full flex items-center justify-between ">
              <div className="py-5">
                <h1 className="text-3xl max-md:text-xl">City</h1>
              </div>
              <button
                type="primary"
                onClick={() => setopenAdd(!openAdd)}
                className="flex items-center bg-primary justify-center max-md:px-2 max-md:text-sm px-5 py-1 rounded-lg text-white"
              >
                {!openAdd ? (
                  <>
                    Add City
                    <i className="ri-add-line"></i>
                  </>
                ) : (
                  "Close"
                )}
              </button>
            </div>
            {openAdd ? (
              <CityAddAdmin setopenAdd={setopenAdd} />
            ) : (
              <div className="w-full max-lg:grid-cols-2 max-md:grid-cols-2 grid grid-cols-6 gap-5">
                {city?.map((i, index) => (
                  <CityCard cross={true} data={i} key={index} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <AdminRoomPopUp setselectedList={setselectedPg} pgDets={selectedPg} />
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminCity;
