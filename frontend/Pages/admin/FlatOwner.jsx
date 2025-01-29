import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlatOwners, getAllUser } from "../../store/Action/Admin";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import { Button } from "antd";
import UserDetails from "../../Components/Admin/UserDetails";
import GraphPage from "../../Components/Admin/FlateMateGraph";

const FlatOwner = () => {
  const dispatch = useDispatch();
  const { flatOwner, totalPages } = useSelector((state) => state.Admin); // Adjust according to your state structure
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of rows per page
  const [id, setid] = useState("");
  useEffect(() => {
    dispatch(getAllFlatOwners(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />

      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Flat Owners"} isOpen={isOpen}></AdminSidebar>

        <div className="w-full p-10 overflow-y-auto h-full">
          <div className="py-5">
            <h1 className="text-3xl max-md:text-xl">Flat Owners</h1>
          </div>

          <GraphPage role={"flat"} />

          {id ? (
            <UserDetails setid={setid} id={id} />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4">S. No.</th>
                    <th className="px-6 py-4">User Name</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Listings</th>
                    <th className="px-6 py-4">Contact Number</th>
                    <th className="px-6 py-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {flatOwner?.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50 border-b" : "border-b"
                      }`}
                      onClick={() => setid(user?._id)}
                    >
                      <td className="px-6 py-4">{index + 1}</td>

                      <td className="px-6 py-4">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="px-6 py-4">{user?.gender}</td>
                      <td className="px-6 py-4">
                        {user?.listing?.length > 0 ? (
                          <Button type="default">Added</Button>
                        ) : (
                          <Button type="default">Not Added</Button>
                        )}
                      </td>
                      <td className="px-6 py-4">{user?.contact}</td>
                      <td className="px-6 py-4">{user?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination controls */}
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
      </div>
    </div>
  );
};

export default FlatOwner;
