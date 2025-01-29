import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getRequestRefund } from "../../store/Action/Admin";
import moment from "moment";
import AdminPgDropdown from "../../Components/Admin/AdminRefundDropDown";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";

const AdminRequestRefund = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { refund, message, error, loading } = useSelector(
    (state) => state.Admin
  );
  useEffect(() => {
    dispatch(getRequestRefund());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearAdminMessage());
      dispatch(getRequestRefund());
    }
    if (error) {
      toast.success(error);
      dispatch(clearAdminError());
    }
  }, [message, error]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm a");
  };
  const options = [
    {
      name: "In Process",
    },
    {
      name: "Refunded",
    },
    {
      name: "Rejected",
    },
  ];
  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Request Refund"} isOpen={isOpen}></AdminSidebar>

        <div className="w-full p-10">
          <div className="py-5">
            {" "}
            <h1 className="text-3xl max-md:text-xl">Request Refund</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4">Plan Name</th>
                  <th className="px-6 py-4">Payment Id</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Start Date</th>
                  <th className="px-6 py-4">End Date</th>
                  <th className="px-6 py-4">Sttaus</th>
                </tr>
              </thead>
              <tbody>
                {refund?.map((i, index) =>
                  i?.planHistory?.map((j) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4">{j?.planId?.planName}</td>
                      <td className="px-6 py-4">{j?.paymentId}</td>
                      <td className="px-6 py-4">{j?.planId?.price}</td>
                      <td className="px-6 py-4">{formatDate(j?.startDate)}</td>
                      <td className="px-6 py-4">{formatDate(j?.endDate)}</td>

                      <td className="px-6 py-4 relative">
                        <AdminPgDropdown
                          data={j?.refundStatus}
                          id={i?._id}
                          d={j}
                          options={options}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminRequestRefund;
