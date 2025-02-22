import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation

const sideBarData = [
  {
    title: "Dashboard",
    icon: "mage:home",
    path: "/admin/dashboard",
  },
  {
    title: "Tenant",
    icon: "ri:team-fill",
    path: "/admin/tenant",
  },
  {
    title: "Pg Owners",
    icon: "ri:team-fill",
    path: "/admin/owner",
  },
  {
    title: "Flat Owners",
    icon: "ri:team-fill",
    path: "/admin/flatowner",
  },
  {
    title: "Listing",
    icon: "bi:list-ol",
    path: "/admin/listing",
  },
  {
    title: "Flats",
    icon: "bi:list-ol",
    path: "/admin/flat",
  },
  {
    title: "Pg",
    icon: "ri:hotel-line",
    path: "/admin/pg",
  },
  {
    title: "Sales person",
    icon: "carbon:sales-ops",
    path: "/admin/salesperson",
  },
  {
    title: "Plans",
    icon: "mdi:crown",
    path: "/admin/plans",
  },
  {
    title: "City",
    icon: "solar:city-broken",
    path: "/admin/city",
  },
  {
    title: "Add Testimonials",
    icon: "fa6-solid:users-between-lines",
    path: "/admin/testimonial",
  },
  {
    title: "Request Refund",
    icon: "mdi:cash-refund",
    path: "/admin/refund",
  },
  //   {
  //     title: "Delete account",
  //     icon: "line-md:account-delete",
  //     path: "/delete-account",
  //   },
  {
    title: "Logout",
    icon: "material-symbols:logout",
    path: "/logout",
  },
];

const AdminSidebar = ({ title, isOpen }) => {
  return (
    <div
      className={`w-[15rem] relative h-full overflow-y-auto pb-8 max-md:absolute z-50 transition-all duration-300 ease-linear md:w-[18rem] ${
        isOpen ? "max-md:left-0  " : "max-md:-left-full"
      } h-screen flex px-2 flex-col bg-[#F9FAFB] gap-3 pt-[1rem] `}
    >
      {sideBarData?.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={`flex items-center gap-3 px-2 py-2 text-xl text-black ${
            title === item.title
              ? "bg-primary  text-white"
              : "bg-transparent text-black"
          }  rounded`}
        >
          <Icon icon={item.icon} width="18" height="18" />
          <span className="text-lg">{item.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSidebar;
