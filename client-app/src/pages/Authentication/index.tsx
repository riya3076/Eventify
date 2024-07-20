/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import React, { useEffect } from "react";
import loginImage from "../../assets/auth-background.jpg";
import Container from "../../components/Container";
import LoginForm from "../../components/Login";
import SignUpForm from "../../components/SignUp";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/ForgotPassword";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";

const Authentication: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    const validPaths = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/reset-password",
    ];
    if (!validPaths.includes(location.pathname)) {
      navigate("/auth/login");
    }
  }, [location, navigate]);

  const renderComponents = (location: any) => {
    console.log("location", location);
    switch (location.pathname) {
      case "/auth/login":
        return user ? <Navigate to="/" /> : <LoginForm />;
      case "/auth/register":
        return user ? <Navigate to="/" /> : <SignUpForm />;
      case "/auth/forgot-password":
        return user ? <Navigate to="/" /> : <ForgotPasswordForm />;
      case "/auth/reset-password":
        return user ? <Navigate to="/" /> : <ResetPasswordForm />;
      default:
        return user ? <Navigate to="/" /> : <LoginForm />;
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-center h-screen min-h-screen mb-5">
        <div className="hidden lg:block lg:w-3/5">
          <img
            src={loginImage}
            alt="Login"
            className="h-screen w-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full lg:w-2/5 flex justify-center items-center min-h-screen ">
          {renderComponents(location)}
        </div>
      </div>
    </Container>
  );
};

export default Authentication;
