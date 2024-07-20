/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import React, { useState } from "react";
import { registerUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let formIsValid = true;

    const nameRegex = /^[a-zA-Z]+$/;
    if (!formData.firstName) {
      formIsValid = false;
      tempErrors.firstName = "First name is required";
    } else if (!nameRegex.test(formData.firstName)) {
      formIsValid = false;
      tempErrors.firstName = "Numbers / special characters not allowed";
    }

    if (!formData.lastName) {
      formIsValid = false;
      tempErrors.lastName = "Last name is required";
    } else if (!nameRegex.test(formData.lastName)) {
      formIsValid = false;
      tempErrors.lastName = "Numbers / special characters not allowed";
    }

    const emailRegex =
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      formIsValid = false;
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      formIsValid = false;
      tempErrors.email = "Email is not valid";
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!formData.password) {
      formIsValid = false;
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      formIsValid = false;
      tempErrors.password =
        "At least 8 characters long and contain alphanumeric and special characters";
    }

    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await registerUser(formData);
      if (response?.data) {
        if (response?.status === 200) {
          navigate("/auth/login");
        } else {
          setErrorMsg("Something went wrong!");
        }
      } else {
        let message: string = response?.response?.data.message;
        setErrorMsg(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Register</h2>
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label
            htmlFor="firstName"
            className="block text-md font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="lastName"
            className="block text-md font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>
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
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-md font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
      <div className="flex items-center justify-between mb-4">
        <button
          type="submit"
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
        >
          Sign Up
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500 hover:text-blue-600">
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
