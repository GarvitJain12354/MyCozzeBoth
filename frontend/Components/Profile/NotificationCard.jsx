import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../store/Action/User";

const NotificationCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeNotification(id));
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  return (
    <>
      <div
        // onClick={showModal}
        className="w-[92%] cursor-pointer max-md:w-full bg-[#aebcc310] rounded-xl p-4 gap-2 border-2 flex flex-col"
      >
        <div className="flex items-center text-[16px] lg:text-xl justify-between w-full font-semibold">
          <h1 onClick={showModal}>{data.title}</h1>
          {/* <h1>07/10/2024 22:28:19</h1> */}
          <i
            onClick={() => handleRemove(data?._id)}
            className="ri-close-line text-primary"
          ></i>
        </div>
        <p onClick={showModal} className=" text-[12px] lg:text-sm">
          {data.description}
        </p>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={""}
        // width={"50vw"}
        centered
        className="responsive-modal"
      >
        <div className="bg-white p-6  w-full text-center ">
          {/* Date and Time */}
          <div className="text-gray-500 flex justify-center items-center relative bottom-11 min-w-fit">
            <p className=" border-2 p-1 px-3 text-sm rounded-b-[20px]">
              {formatDate(data?.createdAt)}
            </p>
          </div>

          {/* Issue Heading */}
          <h2 className="text-2xl font-bold text-primary mb-4">
            {data?.title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6">{data?.description}</p>

          {/* Okay Button */}
          <button
            onClick={handleCancel}
            className="bg-primary text-white py-2 px-6 rounded "
          >
            Okay
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NotificationCard;
