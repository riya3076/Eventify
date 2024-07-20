/**
 * Author: Keyur Pradipbhai Khant (B00935171)
 */
import React, { useState } from 'react';
import Container from '../Container';
import { logo_2 } from '../../assets/home';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailSend } from '../../services/UserService';

interface LinkData {
  name: string;
  to: string;
}

const companyLinks: LinkData[] = [
  { name: "Events", to: "/events" },
  { name: "Contact Us", to: "/contact" },
  { name: "FAQs", to: "/faqs" },
];

const connectLinks: LinkData[] = [
  { name: "Twitter", to: "/social/twitter" },
  { name: "Facebook", to: "/social/facebook" },
  { name: "Instagram", to: "/social/facebook" },
  { name: "Linkedin", to: "/social/linkedin" },
  { name: "Youtube", to: "/social/youtube" },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex =
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      toast.error("Invalid email address."); 
      return;
    }
    
    try {
      const response = await emailSend({
        email, 
        subject:"Subscription with Eventify", 
        body: "Thank you for subscribing to Eventify! Stay tuned for exciting events.",
      })

      if (response?.data) {
        if (response?.status === 200) {
          setEmail("");
          setError("");
          toast.success("Thank you for subscribing!");
        }
        else{
          toast.error("Error subscribing. Please try again later.");
        }
      }
      else{
        toast.error("Error subscribing. Please try again later.");
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("Error subscribing. Please try again later.");
    }
  };


  return (
    <footer className="bg-[#212121] py-14 text-white">
      <Container>
        <div className="grid lg:place-items-start sm:place-items-center sm:text-left text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <img
            src={logo_2}
            alt="Eventify"
            className="w-34 h-28 place-self-center"
          />
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">company</h1>
            <ul>
              {companyLinks.map((link) => (
                <li
                  key={link.name}
                  className="hover:text-gray-500 transition-colors duration-200"
                >
                  <Link to={link.to}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">browser</h1>
            <ul>
              {connectLinks.map((link) => (
                <li
                  key={link.name}
                  className="hover:text-gray-500 transition-colors duration-200"
                >
                  <Link to={link.to}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">
              Subscribe to our newsletter
            </h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user.name@example.com"
                className="border border-gray-300 text-sm text-black focus:border-gray-400 block w-full p-2.5"
              />

              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-button-primary hover:bg-button-primary-hover text-white font-bold py-2 px-4 rounded"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
