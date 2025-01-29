import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import ProfileSidebar from "../../Components/Profile/ProfileSidebar";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import AdminNavBar from "../../Components/Admin/Navbar";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selected, setSelected] = useState("My Profile");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelected("My Profile");
  };

  // Fetch user data
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user"); // Example API call to fetch user data
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  // Logout API call
  const userLogout = async () => {
    try {
      await axios.post("/api/logout"); // Example API call to logout
      setIsAuthenticated(false);
      navigate("/"); // Redirect to home
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage(null); // Clear message after displaying
    }
    if (error) {
      toast.error(error);
      setError(null); // Clear error after displaying
    }
  }, [message, error]);

  useEffect(() => {
    if (selected === "Delete account") {
      setIsModalOpen(true);
    }
    if (selected === "Logout") {
      userLogout();
    }
  }, [selected]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
        <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Dashboard"}  isOpen={isOpen}></AdminSidebar>

            <div className="w-full h-full p-6 relative overflow-y-auto overflow-x-hidden">

            </div>
        </div>
        {/* <Footer /> */}

      </div>
    </>
  );
};

export default AdminProfile;
