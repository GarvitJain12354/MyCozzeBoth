import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSalesPerson,
  getAllUser,
  updateStatusListing,
  updateStatusSalesPerson,
} from "../../store/Action/Admin";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import { Button, Switch } from "antd";
import AdminSalesPerson from "../../Components/Admin/AdminSalesPerson";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";
import Loading from "../../Components/Loading";

const SalesPerson = () => {
  const dispatch = useDispatch();
  const { sales, totalPages, message, error, loading } = useSelector(
    (state) => state.Admin
  ); // Adjust according to your state structure
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [addSales, setaddSales] = useState(false);
  useEffect(() => {
    dispatch(getAllSalesPerson(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllSalesPerson(currentPage, itemsPerPage));

      dispatch(clearAdminMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [message, error,loading,dispatch]);

  const onChange = (id) => {
    // // console.log(`switch to ${checked}`);
    // setChecked(!checked);
    dispatch(updateStatusSalesPerson(id));
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-screen overflow-hidden">
     <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
      <AdminSidebar title={"Sales person"}  isOpen={isOpen}></AdminSidebar>

        {loading ? (
          <Loading />
        ) : (
          <div className="w-full p-10  h-full overflow-y-auto ">
            <div className="w-full flex items-center justify-between ">
              <div className="">
                <h1 className="text-3xl max-md:text-xl py-10">Sales Person</h1>
              </div>
              <button
                type="primary"
                onClick={() => setaddSales(!addSales)}
                className="flex items-center bg-primary justify-center max-md:px-2 max-md:text-sm px-5 py-1 rounded-lg text-white"
              >
                {!addSales ? (
                  <>
                    Add Sales Person
                    <i className="ri-add-line"></i>
                  </>
                ) : (
                  "Close"
                )}
              </button>
            </div>
            {addSales ? (
              <AdminSalesPerson />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-4">S. No.</th>
                        <th className="px-6 py-4">User Name</th>
                        <th className="px-6 py-4">Gender</th>
                        <th className="px-6 py-4">Contact Number</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales?.map((user, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50 border-b" : "border-b"
                          }
                        >
                          <td className="px-6 py-4">{index + 1}</td>

                          <td className="px-6 py-4">
                            {user.firstname} {user.lastname}
                          </td>
                          <td className="px-6 py-4">{user?.gender}</td>

                          <td className="px-6 py-4">{user?.contact}</td>
                          <td className="px-6 py-4">{user?.email}</td>
                          <td className="px-6 py-4">
                            <Switch
                              onChange={() => onChange(user?._id)}
                              checked={user?.isVerified}
                              value={user?.isVerified}
                              style={{
                                backgroundColor: user?.isVerified
                                  ? "#bc2c3d"
                                  : "#ccc",
                              }}
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
              </>
            )}

            {/* Pagination controls */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPerson;
