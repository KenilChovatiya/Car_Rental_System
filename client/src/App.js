import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from './component/layout/Header/Header';
import Home from './component/Home/Home';
import Login from './component/User/Login';
import SignUp from './component/User/SignUp';
import Footer from './component/layout/Footer/Footer';
import Cars from './component/Cars/Cars';
import CarDetails from './component/Cars/CarDetails';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import Reservation from './component/CheckOutProcess/Reservation';
import ConfirmReservation from './component/CheckOutProcess/ConfirmReservation';
import Payment from './component/CheckOutProcess/Payment';
import MyBookedCar from './component/Reservation/MyBookedCar';
import Dashboard from './component/Admin/Dashboard';
import NewCar from './component/Admin/NewCar';
import CarList from './component/Admin/CarList';
import ReservationList from './component/Admin/ReservationList';
import UserList from './component/Admin/UserList';
import ProtectedRoute from './component/Route/ProtectedRoute';
import About from './component/About/About';
import MyBookedCarDetails from './component/Reservation/MyBookedCarDetails';

import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from "react-redux";
import Services from './component/Services/Services';
import Contact from './component/Contact/Contact';
import { getToken } from './actions/getToken';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {

    const config = {
        headers: {
            "auth-token": getToken()
        },
    };
    const { data } = await axios.get("http://localhost:4000/api/stripeapikey", config);
    setStripeApiKey(data.stripeApiKey);
  }


useEffect(() => {
  store.dispatch(loadUser());

  getStripeApiKey();
}, [])

return (
  <>
    <Router>
      <Header />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/reservation/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/cars" element={<Cars />} />
        <Route exact path="/cars/:keyword" element={<Cars />} />
        <Route exact path="/car/:id" element={<CarDetails />} />

        <Route exact path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route exact path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route exact path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />

        <Route exact path="/reservation" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
        <Route exact path="/reservation/confirm" element={<ProtectedRoute><ConfirmReservation /></ProtectedRoute>} />

        <Route exact path="/myBookedCars" element={<ProtectedRoute><MyBookedCar /></ProtectedRoute>} />
        <Route exact path="/myBookedCar/:id" element={<ProtectedRoute><MyBookedCarDetails /></ProtectedRoute>} />

        <Route exact path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route exact path="/admin/car" element={<ProtectedRoute><NewCar /></ProtectedRoute>} />
        <Route exact path="/admin/cars" element={<ProtectedRoute><CarList /></ProtectedRoute>} />
        <Route exact path="/admin/car/:id" element={<ProtectedRoute><NewCar /></ProtectedRoute>} />
        <Route exact path="/admin/reservations" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />
        <Route exact path="/admin/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />

      </Routes>
      <Footer />
    </Router>
  </>
);
}

export default App;
