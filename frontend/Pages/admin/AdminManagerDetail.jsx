import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignUserToManager,
  getAllUser,
  getManagerById,
  updateStatusManager,
} from "../../store/Action/Admin";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import NavBar from "../../Components/NavBar";
import { Button, Modal, Select, Switch } from "antd";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";
import Loading from "../../Components/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminManagerDetail = () => {
  const dispatch = useDispatch();
  const { manager, allUser, message, error, loading } = useSelector(
    (state) => state.Admin
  );
  const { id } = useParams();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTenants, setSelectedTenants] = useState([]);

  useEffect(() => {
    dispatch(getManagerById(id));
    dispatch(getAllUser());
  }, [dispatch, id]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getManagerById(id));
      dispatch(clearAdminMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [message, error, dispatch, id]);

  const onChangeStatus = () => {
    dispatch(updateStatusManager(id));
  };

  const handleAssignTenant = () => {
    if (selectedTenants) {
      const dets = {
        user: selectedTenants,
      };
      dispatch(assignUserToManager(id, dets));
      setSelectedTenants([]);

      setIsAssignModalOpen(false);
    } else {
      setSelectedTenants([]);

      toast.error("Please select a tenant");
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar dashboard={true} />
      <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Managers"} />

        {loading ? (
          <Loading />
        ) : (
          <div className="w-full p-10 h-full overflow-y-auto">
            <h1 className="text-3xl py-5">Manager Details</h1>
              <Link to={"/admin/managers"}>
              <i className="ri-arrow-left-line text-2xl"></i>

              </Link>
            <div className="bg-white p-5 shadow-lg rounded-lg flex flex-col gap-4">
              <p>
                <strong>Name:</strong> {manager?.firstname} {manager?.lastname}
              </p>
              <p>
                <strong>Email:</strong> {manager?.email}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Switch
                  checked={manager?.isVerified}
                  onChange={onChangeStatus}
                />
              </p>
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
                    {manager?.assignedUsers?.map((user, index) => (
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
              <Button
                type="primary"
                className="mt-4 w-fit"
                onClick={() => setIsAssignModalOpen(true)}
              >
                Assign Tenant
              </Button>
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Assign Tenant"
        open={isAssignModalOpen}
        onOk={handleAssignTenant}
        onCancel={() => setIsAssignModalOpen(false)}
      >
        <Select
          mode="multiple"
          placeholder="Select tenants"
          style={{ width: "100%" }}
          onChange={(value) => setSelectedTenants(value)}
        >
          {allUser?.map((tenant) => (
            <Select.Option key={tenant._id} value={tenant._id}>
              {tenant.firstname}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default AdminManagerDetail;
