import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import CityAddAdmin from "../../Components/Admin/CityAddAdmin";
import { Button } from "antd";
import AddTestimonial from "../../Components/Admin/AddTestimonial";
import { getAllTestimonial } from "../../store/Action/Others";
import Testimonials from "../../Components/About/cards/Testimonials";
import { toast } from "react-toastify";
import { clearAdminError, clearAdminMessage } from "../../store/Reducer/Admin";
import { deleteTestimonials } from "../../store/Action/Admin";

const AdminTestimonal = () => {
  const [openAdd, setopenAdd] = useState(false);
  const { testimonial } = useSelector((state) => state.Others);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Others);
  const {  message, error } = useSelector((state) => state.Admin);

  useEffect(() => {
    dispatch(getAllTestimonial());
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllTestimonial());

      dispatch(clearAdminMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAdminError());
    }
  }, [message, error]);

  console.log(testimonial);
  const handleDelete = (id)=>{
    dispatch(deleteTestimonials(id))
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} dashboard={true} />
        <div className="flex w-full h-[89vh] overflow-hidden translate-y-20">
        <AdminSidebar title={"Add Testimonials"}  isOpen={isOpen}></AdminSidebar>

          {loading ? (
            <Loading />
          ) : (
            <div className="w-full h-full  p-4">
              <div className="w-full px-5 h-full overflow-y-auto ">
                <div className="w-full flex items-center justify-between ">
                  <div className="py-5">
                    <h1 className="text-3xl max-md:text-text-xl">Testimonials</h1>
                  </div>
                  <button
                    type="primary"
                    onClick={() => setopenAdd(!openAdd)}
                    className="flex items-center bg-primary justify-center max-md:px-2 max-md:text-sm px-5 py-1 rounded-lg text-white"
                  >
                    {!openAdd ? (
                      <>
                        Add Testimonial
                        <i className="ri-add-line"></i>
                      </>
                    ) : (
                      "Close"
                    )}
                  </button>
                </div>
                {openAdd ? (
                  <AddTestimonial setopenAdd={setopenAdd} />
                ) : (
                  <div className="grid max-md:grid-cols-1 gap-5 grid-cols-2">
                    {testimonial?.map((i, index) => (
                      <Testimonials handleDelete={handleDelete} admin={true} data={i} key={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default AdminTestimonal;
