/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import FAQPage from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import WorkingInProgress from "./components/WorkingPrgress";
import UserDashboard from "./pages/UserDashboard";
import Authentication from "./pages/Authentication";
import Eventfeed from "./pages/Events";
import Wishlist from "./pages/Wishlist";
import Calendar from "./components/Calendar/Calendar";
import AddEvent from "./pages/UserDashboard/AddEvent";
import EventPage from "./pages/EventDetails";
import ParticipantInfoPage from "./pages/ParticipantForm";
import PaymentForm from "./components/PaymentForm";
import UserProfile from "./pages/UserProfile";
import TicketPage from "./pages/Ticket";
import UserTicketPage from "./pages/UserTickets";
import AnalyticsPage from "./pages/Analytics";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";
import NotFoundPage from "./pages/NoFoundPage";

const PrivateRoute = ({ children }: any) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/auth/login" />;
};

const EventRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth/*" element={<Authentication />} />
      <Route path="/faqs" element={<FAQPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/events" element={<Eventfeed />} />
      <Route path="/social/*" element={<WorkingInProgress />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Private Routes */}
      <Route path="dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      <Route path="dashboard/add-event" element={<PrivateRoute><AddEvent /></PrivateRoute>} />
      <Route path="/event/:id" element={<PrivateRoute><EventPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
      <Route path="/event/:id/register/participant-info" element={<PrivateRoute><ParticipantInfoPage /></PrivateRoute>} />
      <Route path="/ticket/:id" element={<PrivateRoute><TicketPage /></PrivateRoute>} />
      <Route path="/mytickets" element={<PrivateRoute><UserTicketPage /></PrivateRoute>} />
      <Route path="/payment" element={<PrivateRoute><PaymentForm /></PrivateRoute>} />
      <Route path="/analytics" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
    </Routes>
  );
};

export default EventRoutes;
