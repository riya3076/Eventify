/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import React, { useState } from "react";
import { loginUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = { email: "", password: "" };
    let formIsValid = true;

    if (!formData.email) {
      formIsValid = false;
      tempErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      formIsValid = false;
      tempErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      formIsValid = false;
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await loginUser(formData);
      if (response?.data) {
        if (response?.status === 200) {
          let userData;
          userData = response?.data?.data;
          dispatch(
            login({
              token: userData.token,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              id: userData.userId,
              bio: userData.bio,
            })
          );
          localStorage.setItem("token", userData.token);
          localStorage.setItem("email", userData.email);
          localStorage.setItem("firstName", userData.firstName);
          localStorage.setItem("lastName", userData.lastName);
          localStorage.setItem("id", userData.userId);
          navigate("/");
        } else {
          e.stopPropagation();
          setErrorMsg("Something went wrong!");
        }
      } else {
        let message: string = response?.response?.data.message;
        setErrorMsg(message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4">User Login</h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-md font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-md font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
      <div className="flex items-center justify-between mb-4">
        <button
          type="submit"
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
        >
          Login
        </button>
        <a
          href="/auth/forgot-password"
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Forgot Password?
        </a>
      </div>
      <div>
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-blue-500 hover:text-blue-600"
          >
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
