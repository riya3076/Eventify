import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventRoutes from './routes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const stripePromise = loadStripe('pk_test_51Oy0ngDOaOzbdR3fZLhzKKLUCyZeZhYPa1yqTne7k7na3Bj1EiGxTdFeZVfmoI0lDNy8CiMMlkSJFR1e5N0EULCV000xB5sXkf');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Navbar />
        <EventRoutes />
        <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
        <Footer />
      </div>
    </Elements>
  );
}

export default App;
