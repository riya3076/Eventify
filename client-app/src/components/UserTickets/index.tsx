/**
 * Author: Aharnish Solanki (B00933563)
 */

import React, { useState, useEffect } from "react";
import Container from "../Container";
import QRCode from "qrcode.react";
import Button from "../UI/Button";
import { Participant } from "../ParticipantForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { getEventsRegisteredByUser as getEventsRegisteredByUser } from "../../services/EventService";
import { useNavigate } from "react-router-dom";


interface TicketRegistration {
  _id: string;
  user: string;
  event: {
    eventName: string;
    eventStartDateTime: string;
    titlePicture: string;
    details: {
      description: string;
      venue: string;
      link?: string;
    };
  };
  participants: Participant[];
}

const UserTickets = () => {
  const [registeredEvents, setRegisteredEvents] = useState<TicketRegistration[]>([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (user?.id) {
        try {
          const response = await getEventsRegisteredByUser(user.id);
          if (response?.data.data) {
            setRegisteredEvents(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching registered events:", error);
        }
      }
    };

    fetchRegisteredEvents();
  }, [user?.id]);

  const handleTicketSelection = (registration: TicketRegistration) => {
    navigate(`/ticket/${registration._id}`, { state: { registration } });
  };

  return (
    <Container>
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold ">Your Tickets</h1>
          </div>

          {registeredEvents.map((registration) => (
            <div
              key={registration._id}
              className="bg-gray-100 p-6 rounded-md mb-4 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-3xl font-bold text-title-color mb-2">
                    {" "}
                    {registration.event.eventName}{" "}
                  </h2>
                  <img
                    src={registration.event.titlePicture}
                    alt={registration.event.eventName}
                    className="w-32 h-32 object-cover rounded-md mt-4 mb-4"
                  />
                  <p className="text-lg font-semibold  ">Event Date & Time</p>
                  <p>
                    {new Date(
                      registration.event.eventStartDateTime
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <QRCode
                    value={registration._id}
                    size={128}
                    level={"H"}
                    className="mt-8"
                  />
                  <span>Reg ID#: {registration._id}</span>
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => handleTicketSelection(registration)}
                  >
                    <span className="">View Ticket</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default UserTickets;