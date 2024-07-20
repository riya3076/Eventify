/**
 * Author: Aharnish Solanki (B00933563)
 */

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Container from "../Container";

interface EventDetails {
  details: {
    description: string;
    venue: string;
    additionalInfo?: string;
  };
  _id: string;
  eventName: string;
  organizer: string;
  titlePicture: string;
  pictures: string[];
  topic: string;
  categories: string[];
  eventStartDateTime: string;
  eventEndDateTime: string;
  isActive: boolean;
  isPaidEvent: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface TicketOption {
  type: string;
  price: number;
  quantity: number;
}

interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  event: EventDetails | null | undefined;
}

const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({
  isOpen, onClose, onCheckout, event,}) => {
    
    const navigate = useNavigate();
    const [ticketOptions, setTicketOptions] = useState<TicketOption[]>([]);
    const [showTicketModal, setShowTicketModal] = useState<boolean>(true);
  const isAnyTicketSelected = ticketOptions.some(
    (ticket) => ticket.quantity > 0
  );

  useEffect(() => {
    if (event) {
      setTicketOptions([
        { type: "Adult", price: event.price, quantity: 0 },
        { type: "Teen (above 12 yrs)", price: event.price / 2, quantity: 0 },
      ]);
    }
  }, [event]);

  const updateQuantity = (index: number, delta: number) => {
    setTicketOptions((currentTickets) =>
      currentTickets.map((ticket, i) =>
        i === index
          ? { ...ticket, quantity: Math.max(ticket.quantity + delta, 0) }
          : ticket
      )
    );
  };

  const calculateSubtotal = () => {
    return ticketOptions.reduce(
      (total, ticket) => total + ticket.price * ticket.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };


  const handleCheckout = () => {
    if (!isAnyTicketSelected) {
      console.log("Please select at least one ticket to proceed.");
      return; 
    }

    const ticketQuantities = ticketOptions.reduce((acc, { type, quantity }) => {
      if (quantity > 0) acc[type] = quantity;
      return acc;
    }, {} as { [type: string]: number });

    navigate(`/event/${event?._id}/register/participant-info`, {
      state: { ticketQuantities, ticketOptions, event },
    });

    setShowTicketModal(false);
  };

  if (!isOpen) return null;

  return (
    <Container>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto z-50 flex justify-center items-start pt-10 pb-10">
        <div
          className="relative bg-white rounded-lg shadow-xl m-auto my-0 sm:w-4/5 lg:w-3/4 xl:w-1/2  h-4/5 max-h-4/5 overflow-auto"
          style={{ width: "1200px", height: "600px" }}
        >
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4" 
          >
            <FaTimes size={18} />
          </button>
          <div className="flex flex-col lg:flex-row h-full">
            {/* Ticket selection area (2/3 width) */}
            <div className="w-full lg:w-2/3 border-r p-8 overflow-auto">
              <h1 className="text-xl font-bold text-gray-900 mb-4 relative pb-2">
                <span className="pr-4">{event?.eventName}</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-300"></span>
              </h1>
              {ticketOptions.map((ticket, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg ">{ticket.type}</h3>
                  <div className=" border-b border-gray-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Button
                          onClick={() => updateQuantity(index, -1)}
                          variant="text"
                        >
                          -
                        </Button>
                        <span className="mx-2">{ticket.quantity}</span>
                        <Button
                          onClick={() => updateQuantity(index, 1)}
                          variant="text"
                        >
                          +
                        </Button>
                      </div>
                      <span>CA${ticket.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary area (1/3 width) */}
            <div className="w-full lg:w-1/3 p-8 overflow-auto bg-gray-100">
              <div className="mb-4">
                <img
                  src={event?.titlePicture}
                  alt={event?.eventName}
                  className="w-full h-32 mb-4 object-cover rounded-lg"
                />
                <h2 className="text-xl font-semibold mb-4">Order summary</h2>
                <div className="border-b border-gray-300 mb-4">
                  {ticketOptions.map((ticket, index) => (
                    <div key={index} className="py-2 border-b border-gray-300">
                      <div className="flex justify-between items-center">
                        <span>
                          {ticket.quantity} x {ticket.type}
                        </span>
                        <span>
                          CA${(ticket.quantity * ticket.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>CA${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 font-semibold">
                  <span>Total</span>
                  <span>CA${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full mt-4"
                color="error"
                disabled={!isAnyTicketSelected}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TicketPurchaseModal;