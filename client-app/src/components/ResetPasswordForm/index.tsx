/**
 * Author: Bhavisha Oza
 * Banner ID: B00935827
 */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/UserService";
import { toast } from 'react-toastify';

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const userId = location.search.split("=")[1];

  useEffect(() => {
    if (!userId) {
      navigate('/auth/login');
    }
  }, [navigate, userId])

  const notify = () => toast.success("Password changes successfully.");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {
      password: "",
      confirmPassword: "",
    };
    let formIsValid = true;

    if (!formData.password) {
      formIsValid = false;
      tempErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        formData.password
      )
    ) {
      formIsValid = false;
      tempErrors.password =
        "Password must be at least 8 characters long and contain a letter, a number, and a special character";
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
      console.log("Form data submitted:", formData);
      const userData = { userId: userId, newPassword: formData.password };
      const response = await resetPassword(userData);
      if (response?.data) {
        if (response?.status === 200) {
          navigate("/auth/login");
          notify();
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
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-md font-medium text-gray-700"
        >
          New Password
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
          Confirm New Password
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
      <div className="flex items-center justify-between mb-4">
        {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
        <button
          type="submit"
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
