import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllDetails } from "../../store/Action/Admin";
import { sendForgetLink } from "../../store/Action/Auth";
import { toast } from "react-toastify";
import { clearMessage } from "../../store/Reducer/Auth";

const UserDetails = ({ id, setid, owner }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.Admin);
  const { message } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (id) {
      dispatch(getUserAllDetails(id));
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [id, message]);
  const handleForget = () => {
    const dets = {
      email: user?.email,
    };
    dispatch(sendForgetLink(dets));
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-screen p-6 bg-gray-100">
      <i
        className="ri-arrow-left-line cursor-pointer p-2 text-2xl"
        onClick={() => setid("")}
      ></i>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">
          User Details: {user?.firstname} {user?.lastname}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Contact:</strong> {user?.contact}
            </p>
            <p>
              <strong>City:</strong> {user?.city}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
          <div>
            <p>
              <strong>Plan Expiry Date:</strong> {user?.planExpiryDate || "N/A"}
            </p>
            <p>
              <strong>Flat Owner:</strong> {user?.flateOwner ? "Yes" : "No"}
            </p>
            <p>
              <strong>Preferences:</strong>{" "}
              {user?.prefrence?.map((pref, index) => (
                <span key={index}>{pref.prefrence}, </span>
              ))}
            </p>
            {/* <p>
              <strong>Notifications:</strong> {user?.notification?.length || 0}
            </p> */}
          </div>
        </div>
        {user?.planHistory?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Plan History:</h3>
            <table className="table-auto w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">Plan Name</th>
                  <th className="border px-2 py-1">For Days</th>
                  <th className="border px-2 py-1">Start Date</th>
                  <th className="border px-2 py-1">Expiry Date</th>
                  <th className="border px-2 py-1">Payment ID</th>
                  <th className="border px-2 py-1">Refund Status</th>
                </tr>
              </thead>
              <tbody>
                {user?.planHistory?.map((history, index) => (
                  <tr key={index} className="border-t">
                    <td className="border px-2 py-1">
                      {history.planId?.planName}
                    </td>
                    <td className="border px-2 py-1">{history.planId?.days}</td>
                    <td className="border px-2 py-1">
                      {new Date(history.startDate).toLocaleDateString()}
                    </td>
                    <td className="border px-2 py-1">
                      {new Date(history.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="border px-2 py-1">{history.paymentId}</td>
                    <td className="border px-2 py-1">{history.refundStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between px-10">
          <div className="mt-4 border-2 rounded-xl cursor-pointer w-fit p-5 px-10 text-center ">
            <h3 className="text-xl  font-semibold">
              {owner ? "Pgs Listed" : "Listings"}
            </h3>
            <h3 className="text-xl  font-semibold">
              {owner ? user?.rooms?.length : user?.listing?.length}
            </h3>
          </div>
          <button
            className=" p-2 border-2  rounded-lg"
            onClick={() => handleForget(user?._id)}
          >
            {" "}
            {user?.resetpasswordToken === "0"
              ? "Forget Password Link"
              : "Link Send Successfully"}
          </button>
        </div>
        {/* <div className="mt-4">
          <h3 className="text-lg font-semibold">Listings:</h3>
          {user?.listing?.length ? (
            <ul className="list-disc pl-5">
              {user?.listing?.map((list, index) => (
                <li key={index}>{list?._id}</li>
              ))}
            </ul>
          ) : (
            <p>No Listings</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default UserDetails;
