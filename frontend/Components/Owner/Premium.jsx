import { Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../store/Action/Others";
import Loading from "../Loading";
import RazorpayPayment from "../../Pages/PaymentDemo";
import { assignPlan } from "../../store/Action/User";
const PricingCard = ({ data, isHighlighted }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);

  const handleBuyPlan = (pyid) => {
    const dets = {
      planId: data?._id,
      paymentId: pyid,
    };
    // toast.success("Hello")
    dispatch(assignPlan(dets));
  };
  return (
    <div
      className={`w-[23rem] overflow-hidden flex justify-start items-center flex-col  bg-white rounded-lg shadow-md ${
        isHighlighted ? "md:scale-110 transform z-10" : "border border-gray-300"
      } transition-transform duration-300`}
    >
      <div className="customBg relative w-[25rem] h-[15rem]  text-white rounded-t-lg p-10 rounded-[30rem] text-center ">
        {isHighlighted && (
          <div className="w-full absolute uppercase font-semibold top-0 left-0 p-1 py-2 text-white border-b-2 border-dashed border-white">
            <h1>Most Popular</h1>
          </div>
        )}
        <h3 className={`text-xl font-bold mb-8 ${isHighlighted ? "mt-4" : ""}`}>
          {data?.planName}
        </h3>
        <p className="text-6xl font-bold">₹ {data?.price}</p>
        <p className="text-sm mt-5">for {data?.days} days</p>
      </div>
      <ul className="my-6 px-10 text-gray-700  w-full">
        {data?.description?.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-red-500 mr-2 ">✔</span> {feature?.value}
          </li>
        ))}
        {data?.manager ? (
          <li className="flex items-center">
            <span className="text-red-500 mr-2 ">✔</span> Personal Relationship
            Manager
          </li>
        ) : (
          <li className="flex items-center">
            <span className="text-red-500 mr-2 ">
              <i className="ri-close-circle-line"></i>
            </span>{" "}
            Personal Relationship Manager
          </li>
        )}
      </ul>
      <div className="flex justify-center items-center py-10">
        {/* <button  className=" mt-4  px-4 border-2 border-red-500 text-red-500 rounded-md hover:bg-[#bc2c3d] hover:text-white transition-colors">
          Buy now
        </button> */}
        {/*  */}
        {!user?.currentPlan ? (
          <RazorpayPayment
            onComplete={handleBuyPlan}
            amount={data?.price}
            text={"Buy Now"}
          />
        ) : (
          <button
            onClick={() => toast.error("Alredy have an plan")}
            className="bg-primary w-fit py-3 px-8 text-white text-xl rounded-md mt-5 ml-2"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};
const Premium = () => {
  const { plan, loading } = useSelector((state) => state.Others);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlans());
  }, []);
  var type = "PG";
  return (
    <>
      <h1 className="text-2xl max-md:text-xl mb-2 font-semibold sm:text-start ">
        Checkout our Plans
      </h1>
      <Divider className="w-[92%] mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {loading ? (
          <Loading />
        ) : (
          plan?.map(
            (plan, index) =>
              type === plan?.type && (
                <PricingCard
                  key={index}
                  data={plan}
                  isHighlighted={index === 1}
                />
              )
          )
        )}
      </div>
    </>
  );
};

export default Premium;
