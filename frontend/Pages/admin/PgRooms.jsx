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
import { Button } from "@mui/material";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";
import CustomDropdown from "../../Components/Auth/CustomDropDown";
import AdminPgDropdown from "../../Components/Admin/AdminPgDropdown";
import AdminRoomPopUp from "../../Components/Admin/AdminRoomPopUp";
const AdminPgRooms = () => {
  const dispatch = useDispatch();
  const { pg, totalPages, loading, error, message } = useSelector(
    (state) => state.Admin
  ); // Adjust according to your state structure
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of rows per page

  useEffect(() => {
    dispatch(getAllPg(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);
  const [checked, setChecked] = useState(true);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllPg(currentPage, itemsPerPage));
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
  const [selectedPg, setselectedPg] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-screen overflow-hidden">
    <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
      <AdminSidebar title={"Pg"}  isOpen={isOpen}></AdminSidebar>


        {loading ? (
          <Loading />
        ) : (
          !selectedPg ?
          <div className="w-full p-10 overflow-y-auto ">
            <div className="py-5">
              {" "}
              <h1 className="text-3xl max-md:text-xl">Pg & Rooms</h1>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4">S. No.</th>

                    <th className="px-6 py-4">Listed By</th>
                    <th className="px-6 py-4">Pg Name</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Mobile</th>
                    <th className="px-6 py-4">Listed At</th>
                    {/* <th className="px-6 py-4">Approx Rent</th> */}
                    <th className="px-6 py-4">View Listing</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pg?.map((i, index) => (
                    <tr className="border-b">
                      <td className="px-6 py-4">{index + 1}</td>

                      <td className="px-6 py-4">
                        {i?.owner?.firstname} {i?.owner?.lastname}
                      </td>
                      <td className="px-6 py-4">{i?.pgName}</td>
                      <td className="px-6 py-4">{i?.location}</td>
                      <td className="px-6 py-4">{i?.mobile}</td>
                      <td className="px-6 py-4">
                        {new Date(i?.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <Button
                          type="button"
                          variant="contained"
                          style={{ backgroundColor: "#bc2c3d" }}
                          onClick={()=>setselectedPg(i)}
                          className="capitalize hover:bg-[#791d28] hover:shadow-xl shadow-black"
                        >
                          View
                        </Button>
                      </td>
                      <td className="px-6 py-4 relative">
                        <AdminPgDropdown
                          options={option}
                          data={i?.status}
                          id={i?._id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
              >
                Next
              </button>
            </div>
          </div>
          : <AdminRoomPopUp setselectedList={setselectedPg} pgDets={selectedPg}/>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminPgRooms;
