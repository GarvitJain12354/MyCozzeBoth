import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import PricingPage from "../Components/priceingcard/Pricingcard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrorUser, clearMessageUser } from "../store/Reducer/UserReducer";

const PlansPage = ({ type }) => {
  const { message, error } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessageUser())
    }
    if(error){
      toast.error(error);
      dispatch(clearErrorUser())
    }
  }, [message,error]);

  return (
    <>
      <NavBar />
      <PricingPage type={type} />
      <Footer />
    </>
  );
};

export default PlansPage;
