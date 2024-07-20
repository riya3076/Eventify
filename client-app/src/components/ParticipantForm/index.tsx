/**
 * Author: Aharnish Solanki (B00933563)
 */

import React, { useState, useEffect } from "react";
import Container from "../Container";
import SectionTitle from "../../components/Landing/SectionTitle";
import SuccessModal from "../SuccessModal";
import { stringOrDate } from "react-big-calendar";
import { createEventRegistration } from "../../services/RegisterEventService";
import { useNavigate } from "react-router-dom";
import { selectUser, user as USER } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

export interface Participant {
  firstName: string;
  lastName: string;
  email: string;
}

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

interface ParticipantError {
  firstName: string;
  lastName: string;
  email: string;
}

interface ParticipantFormProps {
  ticketQuantities: { [type: string]: number };
  ticketOptions: TicketOption[];
  eventdetails: EventDetails;
}

interface TicketOption {
  type: string;
  price: number;
  quantity: number;
}

export interface TicketRegistration {
  userId: string;
  eventId: string;
  participants: Participant[];
  status: string;
  registrationDate: stringOrDate;
  paymentStatus: string;
  amountPaid: number;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  ticketQuantities,
  ticketOptions,
  eventdetails,
}) => {
  const user = useSelector(selectUser);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ParticipantError[]>([]);
  const notify = () => toast.success("Event registered successfully!");

  const [userId, setUserId] = useState({
    id: "",
  });

  useEffect(() => {
    if (user) {
      setUserId({
        id: user.id,
      });
    }
  }, [user]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  React.useEffect(() => {
    const initialParticipants: Participant[] = [];

    const initialErrors: ParticipantError[] = [];

    Object.entries(ticketQuantities).forEach(([type, quantity]) => {
      for (let i = 0; i < quantity; i++) {
        initialParticipants.push({ firstName: "", lastName: "", email: "" });
        initialErrors.push({ firstName: "", lastName: "", email: "" });
      }
    });
    setParticipants(initialParticipants);
    setErrors(initialErrors);
  }, [ticketQuantities]);

  const handleInputChange = (
    index: number,
    field: keyof Participant,
    value: string
  ) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const validateForm = () => {
    const updatedErrors: ParticipantError[] = participants.map(
      (participant) => {
        return {
          firstName: participant.firstName.match(/^[A-Za-z ]+$/)
            ? ""
            : "Numbers / special characters not allowed",
          lastName: participant.lastName.match(/^[A-Za-z ]+$/)
            ? ""
            : "Numbers / special characters not allowed",
          email: participant.email.match(
            /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/
          )
            ? ""
            : "Email is invalid",
        };
      }
    );

    console.log("UPDATE:", updatedErrors);

    setErrors(updatedErrors);
    return !updatedErrors.some(
      (error) => error.firstName || error.lastName || error.email
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const registrationData: TicketRegistration = {
        userId: user.id,
        eventId: eventdetails._id,
        participants: participants,
        status: "PENDING",
        registrationDate: new Date().toISOString(),
        paymentStatus: "PENDING",
        amountPaid: calculateSubtotal(),
      };

      try {
        let response;
        if (eventdetails?.isPaidEvent) {
          navigate('/payment', { state: { registrationData, eventdetails, amount: calculateSubtotal() } })
        } else {
          response = await createEventRegistration(registrationData);
        }
        if (response?.data) {
          if (response?.status === 200) {
            setShowSuccessModal(true);
            notify();
          }
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate("/events");
  };

  const calculateSubtotal = () => {
    const validTickets = ticketOptions.filter(
      (ticket) => ticketQuantities[ticket.type] > 0
    );

    const subtotal = validTickets.reduce((total, ticket) => {
      const quantity = Number(ticketQuantities[ticket.type]) || 0;
      return total + ticket.price * quantity;
    }, 0);

    return isNaN(subtotal) ? 0 : subtotal;
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SectionTitle title="Registration Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {/* Participant Form - Takes 2/3 space on medium screens and above */}
          <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6 ">
            <form onSubmit={handleSubmit} className="space-y-6">
              {participants.map((participant, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold">Attendee {index + 1}</h2>
                  <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                      <input
                        type="text"
                        name="FirstName"
                        id="firstName"
                        value={participant.firstName}
                        onChange={(e) =>
                          handleInputChange(index, "firstName", e.target.value)
                        }
                        className="border border-gray-300 text-md block w-full p-2.5 mt-6"
                        placeholder="First Name"
                      />
                      {errors[index].firstName && <p className="text-red-500 text-xs mt-1">{errors[index].firstName}</p>}
                    </div>

                    <div className="w-1/2">
                      <input
                        type="text"
                        name="LastName"
                        id="lastName"
                        value={participant.lastName}
                        onChange={(e) =>
                          handleInputChange(index, "lastName", e.target.value)
                        }
                        className="border border-gray-300 text-md block w-full p-2.5 mt-6"
                        placeholder="Last Name"
                      />
                      {errors[index].lastName && <p className="text-red-500 text-xs mt-1">{errors[index].lastName}</p>}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="Email"
                    id="email"
                    value={participant.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                    className="border border-gray-300 text-md block w-full p-2.5 mt-6"
                    placeholder="Email"
                  />
                  {errors[index].email && <p className="text-red-500 text-xs mt-1">{errors[index].email}</p>}
                </div>
              ))}
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
              >
                Submit
              </button>
              {showSuccessModal && <SuccessModal onClose={closeModal} />}
            </form>
          </div>

          {/* Order Summary - Takes 1/3 space */}
          <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div>
              {ticketOptions.map(
                (ticket, index) =>
                  ticketQuantities[ticket.type] > 0 && (
                    <div
                      key={index}
                      className="flex justify-between border-b py-2"
                    >
                      <span>{ticket.type}</span>
                      <span>
                        CA$
                        {(ticket.price * ticketQuantities[ticket.type]).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  )
              )}
              <div className="pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>CA${calculateSubtotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ParticipantForm;
