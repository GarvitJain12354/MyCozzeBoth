import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import RentAgreement from '../Components/Owner/RentAgreement'

const RentAgreementPage = () => {
  return (
   <>
    <NavBar/>
    <div className="w-full min-h-screen px-[10rem] mt-[18vh] pb-10 max-md:px-[3vh]">
        <RentAgreement page={true}/>
    </div>
    <Footer/>
   </>
  )
}

export default RentAgreementPage