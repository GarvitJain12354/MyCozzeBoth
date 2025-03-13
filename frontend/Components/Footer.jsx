import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FooterDropDown from "./FooterDropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../store/Action/Others";
import { Modal } from "antd";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const Footer = () => {
  const [open, setopen] = useState(false);
  const { city } = useSelector((state) => state.Others);
  const { isAuthenticated } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Function to load more items
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="w-full relative px-6 md:px-[10vw] bg-[#d9d9d946]">
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-5 py-10 place-items-start ">
          <div className="flex flex-col gap-4 justify-center items-start max-md:w-[90vw]  ">
            <img
              src="/Logo.png"
              className="object-contain w-32 md:w-40"
              alt="Logo"
            />
            <p className="text-sm md:text-base">
              Ashokanagar Road, Guna Madhya Pradesh, 473331
            </p>
            <p className="text-sm md:text-base">mycozee1@gmail.com</p>
            <p className="text-sm md:text-base">+91 9993054384</p>

            <NavLink
              to={"/contactus"}
              className="bgRed px-6 md:px-6 py-2 rounded-full text-white text-base max-md:text-sm max-md:-ml-1"
            >
              Contact us
            </NavLink>
            <div className="flex items-center gap-4 justify-start text-xl md:text-2xl w-full">
              <i className="ri-linkedin-fill"></i>
              <i className="ri-facebook-fill"></i>
              <i className="ri-instagram-line"></i>
              <i className="ri-youtube-line"></i>
            </div>
          </div>
          <span className="md:hidden"></span>
          <div className="flex flex-col gap-2 justify-center items-start">
            <h1 className="pb-3 text-xl md:text-2xl">About</h1>
            <NavLink to={"/about"} className="text-sm md:text-base">
              Company
            </NavLink>
            <NavLink to={"/terms"} className="text-sm md:text-base">
              Terms & Conditions
            </NavLink>
            <NavLink to={"/privacypolicy"} className="text-sm md:text-base">
              Privacy Policy
            </NavLink>
            <NavLink to={"/refundpolicy"} className="text-sm md:text-base">
              Refund & Cancel
            </NavLink>
            {/* <NavLink className="text-sm md:text-base">Careers</NavLink> */}
            <NavLink
              to={"https://blog.mycozee.in/"}
              target="_blank"
              className="text-sm md:text-base"
            >
              Blogs
            </NavLink>
          </div>

          <div className="flex flex-col gap-2 justify-center items-start">
            <h1 className="pb-3 text-xl md:text-2xl">Flatmates</h1>
            {city?.slice(0, 5)?.map((i) => (
              <NavLink
                to={`/city/${i?._id}/${i.name}`}
                className="text-sm md:text-base"
              >
                Flatmates in {i.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-2 justify-center items-start">
            <h1 className="pb-3 text-xl md:text-2xl">PGs</h1>
            {city?.slice(1, 6)?.map((i) => (
              <NavLink
                to={`/city/${i?._id}/${i.name}?type=PG`}
                className="text-sm md:text-base"
              >
                PG in {i.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-2 justify-center items-start">
            <h1 className="pb-3 text-xl md:text-2xl">Our Services</h1>
            {isAuthenticated ? (
              <NavLink to={"/rentagreement"} className="text-sm md:text-base">
                Rental Agreements
              </NavLink>
            ) : (
              <div
                onClick={showModal}
                className="text-sm md:text-base cursor-pointer"
              >
                Rental Agreements
              </div>
            )}

            <NavLink className="text-sm md:text-base">
              Tenant for your pg
            </NavLink>
            <NavLink className="text-sm md:text-base">Find rooms</NavLink>
            {/* <NavLink className="text-sm md:text-base">Buy Furniture</NavLink> */}
            {/* <NavLink className="text-sm md:text-base">Buy Furniture</NavLink> */}
            {isAuthenticated ? (
              <NavLink to={"/rentrecipt"} className="text-sm md:text-base">
                Rent Receipt
              </NavLink>
            ) : (
              <div
                onClick={showModal}
                className="text-sm md:text-base cursor-pointer"
              >
                Rent Receipt
              </div>
            )}

            {/* <NavLink className="text-sm md:text-base">
            Manage your Property
          </NavLink> */}
          </div>
        </div>

        <div className="w-full mx-auto h-[1px] bg-gray-200 my-5"></div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center py-5 px-0">
          <h1 className=" text-sm md:text-base">
            Developed by{" "}
            <span className="font-semibold">Tryidol Technologies</span>
          </h1>
          <button
            onClick={() => setopen(!open)}
            className="bgRed px-6 md:px-10 py-2 mt-4 md:mt-0 rounded-full text-white text-sm md:text-xl flex items-center"
          >
            Useful Links{" "}
            <img
              src="/arrow.svg"
              className={`h-6 md:h-8 w-6 md:w-8 transition-transform duration-300 ${
                !open && "-rotate-90"
              }`}
              alt="Arrow"
            />
          </button>
          <h1 className="text-center text-sm md:text-base mt-4 md:mt-0">
            <i className="ri-at-line red"></i> 2025 FOODFOND BEVERAGES PVT. LTD.
            All Rights Reserved
          </h1>
        </div>

        <FooterDropDown open={open} />
      </div>
      {!isMobile ? (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          width={"40vw"}
        >
          <div className="flex items-center justify-center bg-gray-50">
            <div className="grid lg:grid-cols-2 gap-8 items-center bg-white p-6 rounded-lg max-w-[80vw] w-full">
              <div>
                <img
                  src={"/loginimg.png"}
                  alt="Login illustration"
                  className="h-auto"
                />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center justify-center lg:justify-start">
                  <Icon
                    icon="solar:login-2-linear"
                    style={{ color: "#BC2C3D", marginRight: "1vw" }}
                  />
                  Login to proceed
                </h2>
                <p className="text-gray-500 mb-6">
                  In order to proceed ahead you have to login.
                </p>
                <NavLink
                  to={"/login"}
                  className="bg-primary text-white p-1 text-20 px-8 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-4 hover:bg-red-600 transition"
                >
                  <span className="text-lg"> Login</span>{" "}
                  <Icon icon="iconamoon:arrow-right-2-thin" width={35} />
                </NavLink>
                <p className="text-gray-500">
                  New to MY COZEE?{" "}
                  <NavLink
                    to="/register"
                    className="text-primary hover:text-primary"
                  >
                    Register Now
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          width={"80vw"}
        >
          <div className="flex items-center justify-center bg-gray-50">
            <div className="grid lg:grid-cols-2 gap-8 items-center bg-white p-6 rounded-lg max-w-[80vw] w-full">
              <div>
                <img
                  src={"/loginimg.png"}
                  alt="Login illustration"
                  className="h-auto"
                />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-2xl max-md:text-xl font-bold text-primary  flex items-center justify-center lg:justify-start">
                  <Icon
                    icon="solar:login-2-linear"
                    style={{ color: "#BC2C3D", marginRight: "1vw" }}
                  />
                  Login to proceed
                </h2>
                <p className="text-gray-500 mb-6">
                  In order to proceed ahead you have to login.
                </p>
                <NavLink
                  to={"/login"}
                  className="bg-primary text-white  text-20  rounded-xl flex items-center justify-center mx-auto w-[7rem] lg:mx-0 mb-4 "
                >
                  <span className="text-[15px] "> Login</span>{" "}
                  <Icon icon="iconamoon:arrow-right-2-thin" width={30} />
                </NavLink>
                <p className="text-gray-500 max-md:text-[14px]">
                  New to MY COZEE?{" "}
                  <NavLink to="/register" className="text-primary ">
                    {" "}
                    <br />
                    Register Now
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Footer;
