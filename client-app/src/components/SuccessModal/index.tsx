/**
 * Author: Aharnish Solanki (B00933563)
 */

import React from "react";
import Container from "../Container";
import { FaTimes } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const handleViewTickets = () => {
    onClose();
    navigate("/mytickets");
  };

  return (
    <Container>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto z-50 flex justify-center items-center">
        <div
          className="relative bg-white p-4 rounded-lg shadow-lg"
          style={{ width: "1200px", height: "600px" }}
        >
          <button onClick={onClose} className="absolute top-0 right-0 m-4">
            <FaTimes size={25} />
          </button>
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-3xl font-bold mb-4">Success!</h1>
            <p className="mb-4">
              Your tickets have been registered successfully.
            </p>
            <PiSealCheckFill size={75} className="text-green-500" />
            {/* View ticket */}
            <Button
              onClick={handleViewTickets}
              className="absolute top-20 right-0 m-4"
            >
              View Your Ticket
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SuccessModal;
