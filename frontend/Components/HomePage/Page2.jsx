import React, { useEffect, useState } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings, getAllPgs } from "../../store/Action/Others";
import Loading from "../Loading";
import { Modal } from "antd";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { NavLink } from "react-router-dom";

const Page2 = ({ data, loading, type, settype,match,userShow }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  // State to control how many items are shown
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter data based on type
  const dataToDisplay = data;

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
      <div className="w-full h-fit flex items-start justify-center pb-20 flex-wrap gap-7 px-[10vw] py-10">
        {loading ? (
          <Loading />
        ) : (
          <>
            {dataToDisplay?.length ===  0 ? (
              <div className="h-[20vh] flex items-center justify-center w-full">
                <h1>No data available</h1>
              </div>
            ) : (
              dataToDisplay
                ?.slice(0, visibleCount)
                .map((item, index) => (
                  user?._id !== item?.user?._id &&
                  <Card
                    key={index}
                    showModal={showModal}
                    data={item}
                    index={index}
                    listing={type === "Roommate"}
                    match={match}
                    user={userShow}
                  />
                ))
            )}
          </>
        )}
      </div>
      {/* {visibleCount < dataToDisplay?.length && ( */}
      <div className="flex justify-center items-center">
        <div className="relative w-full h-[1px] bg-[#BC2C3D33] bottom-5 left-0">
          <button
            className="flex min-w-[8rem] justify-center items-center sm:p-4 bgRed sm:px-8 rounded-full h-10 text-white text-sm sm:text-lg md:text-lg absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            onClick={loadMore}
          >
            View More <i className="ri-arrow-right-wide-line"></i>
          </button>
        </div>
      </div>
      {/* )} */}
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
                  <NavLink
                    to="/register"
                    className="text-primary "
                  >
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

export default Page2;
