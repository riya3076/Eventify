/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import React, { useState } from "react";
import { sendVerificationLink } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const notify = () => toast.success("Verification link sent to your email.");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = { email: "" };
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

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      const response = await sendVerificationLink(formData);
      if (response?.data) {
        if (response?.status === 200) {
          navigate("/auth/login");
          notify();
        }
      } else {
        e.stopPropagation();
        setErrorMsg("Something went wrong!");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
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
      {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
      <div className="flex items-center justify-between mb-4">
        <button
          type="submit"
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
        >
          Send Verification Link
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-500">
          Remembered your password?{" "}
          <a href="/auth/login" className="text-blue-500 hover:text-blue-600">
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
