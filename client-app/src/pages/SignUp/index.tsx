/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import React, { useState } from "react";
import signUpImage from "../../assets/home/front_world.jpg";

const SignUp: React.FC = () => {
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

    if (!formData.firstName) {
      formIsValid = false;
      tempErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      formIsValid = false;
      tempErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      formIsValid = false;
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      tempErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      formIsValid = false;
      tempErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-2/5 flex justify-center items-center bg-gray-100 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>
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
              type="email"
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
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
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
              <a href="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden lg:block lg:w-3/5">
        <img
          src={signUpImage}
          alt="Sign Up"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
