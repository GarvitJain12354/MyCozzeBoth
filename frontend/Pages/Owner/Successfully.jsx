import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import PremiumMember from "../../Components/successfully/PremiumMember";
import SuccessfullyListed from "../../Components/successfully/SuccessfullyListed";
import { Box, Modal } from "@mui/material";
import icon from "../../src/assets/icon.jpg";
import CardList from "../../Components/successfully/CardsList";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../store/Action/Others";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
const Successfully = ({ type }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const { plan } = useSelector((state) => state.Others);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlans());
  }, []);

  return (
    <div>
      <NavBar />

      {/* Main Content */}
      <div className="max:h-screen pt-24 relative md:pt-[10rem] px-4 w-full">
        {/* Modal Section */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          className="border-none"
        >
          <Box sx={style} className="border-none">
            <SuccessfullyListed handleCloseModal={handleCloseModal} />
          </Box>
        </Modal>

        {/* Success Section */}
        <div className="flex flex-col items-center justify-center px-4 md:px-[10rem]">
          <div
            className="w-16 h-16 mb-4 cursor-pointer"
            onClick={handleOpenModal}
          >
            <img src={icon} alt="Icon" />
          </div>

          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Successfully Listed
          </h1>
          <p className="text-gray-500 mt-2 text-center">
            We've received your listing and are processing it. It should be
            available online shortly.
          </p>

          <hr className="w-full mt-4 border-gray-300" />
        </div>

        {/* Premium Member Section */}
        <div className="px-4 md:px-[10rem]">
          <PremiumMember plan={plan} type={type} />
          <hr className="mt-10" />
        </div>
      </div>

      {/* Card List Section */}
      <div className="px-4 md:px-[10rem] mt-6">
        <CardList />
      </div>

      <Footer />
    </div>
  );
};

export default Successfully;
