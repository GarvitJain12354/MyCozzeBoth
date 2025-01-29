import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import PremiumMember from '../../Components/successfully/PremiumMember';
import SuccessfullyListed from '../../Components/successfully/SuccessfullyListed';
import { Modal } from '@mui/material';
import icon from "../../src/assets/icon.jpg"
import CardList from '../../Components/successfully/CardsList';
import InfoCard from '../../Components/infocard/InfoCard';
import PricingPage from '../../Components/priceingcard/Pricingcard';

const Successfully = () => {
  // State to control modal open/close
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle modal open
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <div className="max:h-screen pt-[10rem] w-full">
        {/* Modal component */}
        <Modal
          open={isModalOpen} // Bind modal visibility to the state
          onClose={handleCloseModal} // Close modal when clicked outside
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="flex justify-center items-center min-h-screen">
            {/* Modal content - SuccessfullyListed component */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <SuccessfullyListed />

            </div>
          </div>
        </Modal>

        <div className="flex px-[15rem] flex-col items-center justify-center">
          {/* Checkmark Icon */}
          <div className="w-16 h-16 mb-4 cursor-pointer" onClick={handleOpenModal}>
            <img src={icon} alt="" />
          </div>

          {/* Successfully Listed Message */}
          <h1 className="text-2xl font-bold text-gray-800">Successfully Listed</h1>
          <p className="text-gray-500 mt-2 text-center">
            We've received your listing and are processing it. It should be available online shortly.
          </p>

          {/* Horizontal Line */}
          <hr className="w-full mt-4 border-gray-300" />
        </div>

        <div className="px-[15rem]">
          <PremiumMember />
          {/* <PremiumPosterDets></PremiumPosterDets> */}
          <hr className='mt-10' />
        </div>
      </div>
      <div>
<div className=''>
  <CardList></CardList>
  <InfoCard></InfoCard>
  <PricingPage></PricingPage>
</div>
      </div>
      <Footer />
    </div>
  );
};

export default Successfully;
