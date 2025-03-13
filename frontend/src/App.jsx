import { useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import CityPage from "../Pages/CityPage";
import UserProfile from "../Pages/UserProfile";
import RegisterPage from "../Pages/RegisterPage";
import RegisterDets from "../Pages/RegisterDets";
import { isUser } from "../store/Action/Auth";
import RoomDetails from "../Pages/RoomDetails";
import MatesDets from "../Pages/MatesDets";
import ListRequirement from "../Pages/ListRequirement";
import OwnerProfile from "../Pages/Owner/OwnerProfile";
import List from "../Pages/Owner/List";
import AdminProfile from "../Pages/admin/AdminProfile";
import DashboardAdmin from "../Pages/admin/Dashboard";
import Tenant from "../Pages/admin/TeamEnd";
import AdminListing from "../Pages/admin/Listing";
import AdminPgRooms from "../Pages/admin/PgRooms";
import SalesPerson from "../Pages/admin/SalesPerson";
import ContactUs from "../Pages/ContactUs";
import Successfully from "../Pages/Owner/Successfully";
import AdminPlans from "../Pages/admin/AdminPlans";
import AdminCity from "../Pages/admin/AdminCity";
import ViewCities from "../Pages/viewcities/ViewCities";
import FeedBack from "../Components/feedback/FeedBack";
import AgreementReady from "../Components/AgreementReady/AgrementReady";
import AgreementPayment from "../Components/AgreementReady/AgreementPayment";
import About from "../Components/About/About";
import UserMacthesPage from "../Pages/UserMacthesPage";
import RentRecipt from "../Pages/RentRecipt";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import HomeChatDrawer from "../Components/Chat/HomeChatDrawer";
import PricingPage from "../Components/priceingcard/Pricingcard";
import PlansPage from "../Pages/PlansPage";
import GeneratedReceipt from "../Pages/Recipt/GeneratedReceipt";
import AdminFlat from "../Pages/admin/AdminFlat";
import ListingMatch from "../Pages/ListingMatch";
import UserDetail from "../Pages/UserDetail";
import RentAgreement from "../Components/Owner/RentAgreement";
import RentAgreementPage from "../Pages/RentAgreementPage";
import RefundPolicy from "../Components/RefundPolicy";
import TermsCondition from "../Components/TermsConditions";
import Priv from "../Components/Priv";
import AdminTestimonal from "../Pages/admin/AdminTestimonal";
import AdminRequestRefund from "../Pages/admin/AdminRequestRefund";
import Owners from "../Pages/admin/Owners";
import TroubleShoot from "../Pages/TroubleShoot";
import FlatOwner from "../Pages/admin/FlatOwner";
import ListingPage from "../Pages/ListingPage";
import AdminOffer from "../Pages/admin/AdminOffer";
// import ViewCities from "../Pages/viewcities/ViewCities";
// import UserDetailPage from "../Pages/UserDetailPage";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUser());
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="w-full relative overflow-hidden">
      <Routes>
        {/* Unauthenticated Routes */}
        {!isAuthenticated && (
          <>
            <Route path="login" element={<LoginPage />} />
            <Route path="troubleshoot" element={<TroubleShoot />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="registerdets" element={<RegisterDets />} />
            {user?.role !== "superAdmin" ? (
              <Route path="*" element={<HomePage />} />
            ) : (
              <Route path="*" element={<CityPage />} />
            )}
          </>
        )}
        <Route path="city/:id/:name" element={<CityPage />} />
        <Route path="listing" element={<ListingPage />} />
        {isAuthenticated && (
          <>
            <Route path="/roommate/:id" element={<MatesDets />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="userdetail/:id" element={<UserDetail />} />
            <Route
              path="/rentagreement"
              element={<RentAgreementPage />}
            ></Route>
            <Route path="/rentrecipt" element={<RentRecipt />}></Route>
          </>
        )}
        {/* Authenticated Routes */}
        {isAuthenticated && user?.role === "flatemate" && (
          <>
            {/* <Route path="/roommate/:id" element={<MatesDets />} /> */}
            <Route path="/plans" element={<PlansPage type={"Roommate"} />} />
            {/* <Route path="/room/:id" element={<RoomDetails />} /> */}
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/matches" element={<UserMacthesPage />} />
            <Route path="user/matches/list/:id" element={<ListingMatch />} />
            <Route
              path="/user/successfully"
              element={<Successfully type={"Roommate"} />}
            />

            {!user?.flateOwner ? (
              user?.tenant ? (
                <Route
                  path="user/addlisting"
                  element={<ListRequirement typeS={"property"} />}
                />
              ) : user?.listing?.length > 0 ? (
                <Route
                  path="user/addlisting"
                  element={<ListRequirement typeS={"tenant"} />}
                />
              ) : (
                <Route
                  path="user/addlisting"
                  element={<ListRequirement typeS={""} />}
                />
              )
            ) : (
              <Route
                path="user/addlisting"
                element={<ListRequirement typeS={"tenant"} />}
              />
            )}
          </>
        )}

        {/* Owner Routes */}
        {isAuthenticated && user?.role === "owner" && (
          <>
            <Route path="owner/profile" element={<OwnerProfile />} />
            <Route path="owner/list" element={<List />} />
            <Route
              path="owner/successfully"
              element={<Successfully type={"PG"} />}
            />
            <Route path="/plans" element={<PlansPage type={"PG"} />} />
          </>
        )}
        {isAuthenticated && user?.role === "superAdmin" && (
          <>
            {/* <Route path="admin/profile" element={<AdminProfile />} /> */}
            <Route path="admin/dashboard" element={<DashboardAdmin />} />
            <Route path="admin/tenant" element={<Tenant />} />
            <Route path="admin/owner" element={<Owners />} />
            <Route path="admin/flatowner" element={<FlatOwner />} />
            <Route path="admin/listing" element={<AdminListing />} />
            <Route path="admin/flat" element={<AdminFlat />} />
            <Route path="admin/pg" element={<AdminPgRooms />} />
            <Route path="admin/salesperson" element={<SalesPerson />} />
            <Route path="admin/plans" element={<AdminPlans />} />
            <Route path="admin/offers" element={<AdminOffer />} />
            <Route path="admin/city" element={<AdminCity />} />
            <Route path="admin/testimonial" element={<AdminTestimonal />} />
            <Route path="admin/refund" element={<AdminRequestRefund />} />
            {/* <Route path="owner/list" element={<List />} /> */}
          </>
        )}
        <Route path="/viewcities" element={<ViewCities></ViewCities>}></Route>
        <Route path="/feedback" element={<FeedBack></FeedBack>}></Route>
        <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
        <Route path="/terms" element={<TermsCondition />}></Route>
        <Route path="/refundpolicy" element={<RefundPolicy />}></Route>
        <Route path="/privacypolicy" element={<Priv />}></Route>

        <Route path="/about" element={<About></About>}></Route>
        {/* Common Routes */}
        {user?.role !== "superAdmin" && (
          <Route path="/" index element={<HomePage />} />
        )}

        <Route path="/contact" element={<ContactUs />} />

        {/* Catch-all Route (Fallback) */}
        {isAuthenticated && user?.role === "superAdmin" ? (
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      {isAuthenticated &&
        (user?.role === "flatemate" || user?.role === "owner") && (
          <div
            onClick={showDrawer}
            className="h-14 w-14 text-3xl fixed cursor-pointer flex items-center justify-center bottom-10 right-10 bg-primary rounded-full"
          >
            <Icon icon="heroicons-outline:chat" style={{ color: "white" }} />
          </div>
        )}

      <HomeChatDrawer
        showDrawer={showDrawer}
        userId={user?._id}
        onClose={onClose}
        open={open}
      />
    </div>
  );
}

export default App;
