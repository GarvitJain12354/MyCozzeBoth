import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlat, updateStatusListing } from "../../store/Action/Admin";
import { Switch } from "antd";
import { Button } from "@mui/material";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";
import AdminListingPopUp from "../../Components/Admin/AdminListingPopUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminFlat = () => {
  const dispatch = useDispatch();
  const { flat, totalPages, loading, error, message } = useSelector(
    (state) => state.Admin
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedList, setselectedList] = useState("");

  useEffect(() => {
    dispatch(getAllFlat(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllFlat(currentPage, itemsPerPage));
      dispatch(clearAdminMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [message, error]);

  const onChange = (id) => {
    dispatch(updateStatusListing(id));
  };

  const [isOpen, setIsOpen] = useState(false);

  // Function to export table data to Excel
  const exportToExcel = () => {
    const tableData = flat.map((i) => ({
      "Listed By": `${i?.user?.firstname} ${i?.user?.lastname}`,
      Location: i?.location,
      Occupancy: i?.occupancy,
      Gender: i?.gender,
      "Approx Rent": i?.approxRent,
      Status: i?.status ? "Active" : "Inactive",
    }));

    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Listings");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, "Listings.xlsx");
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Flats"} isOpen={isOpen}></AdminSidebar>

        {loading ? (
          <Loading />
        ) : !selectedList ? (
          <div className="w-full p-10">
            <div className="py-5 flex justify-between">
              <h1 className="text-3xl max-md:text-xl">Listings</h1>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  marginBottom: "10px",
                }}
                onClick={exportToExcel}
              >
                Download Excel
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4">Listed By</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Occupancy</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Approx Rent</th>
                    <th className="px-6 py-4">View Listing</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {flat?.map((i, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4">
                        {i?.user?.firstname} {i?.user?.lastname}
                      </td>
                      <td className="px-6 py-4">{i?.location}</td>
                      <td className="px-6 py-4">{i?.occupancy}</td>
                      <td className="px-6 py-4">{i?.gender}</td>
                      <td className="px-6 py-4">{i?.approxRent}</td>
                      <td className="px-6 py-4">
                        <Button
                          type="button"
                          variant="contained"
                          style={{ backgroundColor: "#bc2c3d" }}
                          className="capitalize hover:bg-[#791d28] hover:shadow-xl shadow-black"
                          onClick={() => setselectedList(i)}
                        >
                          View
                        </Button>
                      </td>
                      <td className="px-6 py-4">
                        <Switch
                          onChange={() => onChange(i?._id)}
                          checked={i?.status}
                          value={i?.status}
                          style={{
                            backgroundColor: i?.status ? "#bc2c3d" : "#ccc",
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
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
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
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <AdminListingPopUp
            setselectedList={setselectedList}
            list={selectedList}
          />
        )}
      </div>
    </div>
  );
};

export default AdminFlat;
