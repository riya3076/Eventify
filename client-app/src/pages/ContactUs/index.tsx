/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React, { useState } from "react";
import SectionTitle from "../../components/Landing/SectionTitle";
import Container from "../../components/Container";
import { emailSend } from "../../services/UserService";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    let tempErrors = { name: "", email: "", message: "" };
    let formIsValid = true;

    if (!formData.name) {
      formIsValid = false;
      tempErrors.name = "Name is required";
    }

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

    if (!formData.message) {
      formIsValid = false;
      tempErrors.message = "Message is required";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await emailSend({
          email: formData.email, 
          subject:"Contacting with Eventify", 
          body: "Thank you for contacting with Eventify! Our representative will contact you soon.",
        })
  
        if (response?.data) {
          if (response?.status === 200) {
            setErrors({
              name: "",
              email: "",
              message: "",
            });
            toast.success("Thank you for contacting!");
          }
          else{
            toast.error("Error in contacting. Please try again later.");
          }
        }
        else{
          toast.error("Error contacting. Please try again later.");
        }
      } catch (error) {
        console.error('Contacting error:', error);
        toast.error("Error contacting. Please try again later.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <Container>
        <SectionTitle title="Contact Us" />
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
              placeholder="First Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
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
              placeholder="user.name@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-md font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
              placeholder="Your message..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 md:flex border-t pt-10 text-center">
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold">Our Office</h3>
            <p className="mt-2">Eventify Studio LLP</p>
            <p>6299 South St, Halifax, NS B3H 4R2 </p>
          </div>
          <div className="md:w-1/2 md:border-l md:pl-10">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p className="mt-2">Email: contact@eventify.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
