import Nav from "../../Components/Nav";
// import contactus from "../../src/assets/contactus.png";
// import InputList from "../../Components/InputList";
import InputContact from "../../Components/InputContact";
import { IoIosArrowForward } from "react-icons/io";
import ReachOut from "../../Components/contactus/ReachOut";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
     <NavBar></NavBar>

      {/* Main Container */}
      <div className="w-full flex justify-center items-center mt-10  py-8">
        <div className="bg-black w-full px-[9vw] rounded-lg p-6 flex flex-col md:flex-row gap-[5rem] items-center">

          {/* Image Section */}
          <div className="flex justify-center ">
            <img
              src="/contact.png"
              alt="Customer Support"
              className="w-full h-auto max-h-[24rem] object-cover md:max-h-[38rem]"
            />
          </div>

          <div className="w-full md:w-[42vw] ">
            <h2 className="text-2xl md:text-3xl text-[#bc2c3d] mb-4">
              Let's Get In Touch
            </h2>
            <p className="text-gray-500 mb-6">
              Or reach out manually to{" "}
             <span>mycozee1@gmail.com</span>
            </p>

            <form className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <InputContact
                  name="firstName"
                  title="First Name"
                  placeholder="Enter your first name"
                />
                <InputContact
                  name="lastName"
                  title="Last Name"
                  placeholder="Enter your last name"
                />
              </div>

              <InputContact
                name="email"
                title="Email Address"
                placeholder="Enter your email address"
              />

              <InputContact
                name="phone"
                title="Phone Number"
                placeholder="(+91) 989-989-9889"
              />

              <textarea
                placeholder="Enter your message here..."
                className="w-full p-3 border border-gray-300 rounded outline-none"
                rows="4"
                maxLength="300"
              ></textarea>

              <button
                type="submit"
                className="w-full flex justify-center items-center bg-[#bc2c3d] text-white text-lg gap-2 p-3 rounded-3xl"
              >
                Submit Form
                <span>
                  <IoIosArrowForward />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center  justify-center">
        <div className="w-full px-[11vw]  ">
          <ReachOut />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
