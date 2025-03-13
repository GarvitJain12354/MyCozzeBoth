import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  Settings,
  People,
} from "@mui/icons-material";

const sideBarData = [
  {
    title: "Dashboard",
    icon: "mage:home",
    path: "/admin/dashboard",
  },
  {
    parent: "Profile",
    icon: "ri:team-fill",
    child: [
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
    ],
  },
  {
    parent: "Listing",
    icon: "bi:list-ol",
    child: [
      {
        title: "Tenant",
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
    ],
  },
  {
    parent: "Account Managers",
    icon: "carbon:sales-ops",
    child: [
      {
        title: "Sales person",
        icon: "carbon:sales-ops",
        path: "/admin/salesperson",
      },
      {
        title: "Managers",
        icon: "carbon:sales-ops",
        path: "/admin/salesperson",
      },
    ],
  },
  {
    title: "Offers",
    icon: "streamline:discount-percent-coupon",
    path: "/admin/offers",
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
  // {
  //   title: "Request Refund",
  //   icon: "mdi:cash-refund",
  //   path: "/admin/refund",
  // },
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
  const [openDropdowns, setOpenDropdowns] = useState({}); // Manage state per parent

  const handleDropdownClick = (parentTitle) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [parentTitle]: !prev[parentTitle],
    }));
  };
  return (
    <div
      className={`w-[15rem] relative h-full overflow-y-auto pb-8 max-md:absolute z-50 transition-all duration-300 ease-linear md:w-[18rem] ${
        isOpen ? "max-md:left-0  " : "max-md:-left-full"
      } h-screen flex px-2 flex-col bg-[#F9FAFB] gap-3 pt-[1rem] `}
    >
      {sideBarData?.map((item, index) =>
        item.parent ? (
          <div key={index}>
            {/* Parent List Item */}
            <ListItemButton
              disableGutters
              onClick={() => handleDropdownClick(item.parent)}
              sx={{
                display: "flex",
                justifyContent: "flex-start", // Align items to the left
                alignItems: "center", // Align items vertically
                gap: 1, // Adds spacing between icon and text
                paddingLeft: "10px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <Icon icon={item.icon} width="18" height="18" />
              </ListItemIcon>
              <ListItemText
                primary={item.parent}
                sx={{
                  flex: "none", // Prevents ListItemText from stretching
                  whiteSpace: "nowrap", // Keeps text on one line
                }}
              />
              {openDropdowns[item.parent] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            {/* Dropdown Content */}
            <Collapse
              in={openDropdowns[item.parent]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.child?.map((i, ind) => (
                  <NavLink
                    key={ind}
                    to={i.path}
                    className={`flex items-center gap-3 px-2 py-0 text-xl text-black ${
                      title === i.title
                        ? "bg-primary  text-white"
                        : "bg-transparent text-black"
                    }  rounded`}
                  >
                    <ListItemButton sx={{ pl: 2 }}>
                      <h1 className="mr-4">-</h1>
                      <ListItemText primary={i.title} />
                    </ListItemButton>
                  </NavLink>
                ))}
              </List>
            </Collapse>
          </div>
        ) : (
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
        )
      )}
    </div>
  );
};

export default AdminSidebar;
