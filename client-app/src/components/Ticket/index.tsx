/**
 * Author: Aharnish Solanki (B00933563)
 */

import React, { useState, useEffect } from "react";
import { FaPrint, FaRegTimesCircle } from "react-icons/fa";
import Button from "../UI/Button";
import Container from "../Container";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import QRCode from "qrcode.react";
import CancellationModal from "../CancelModal";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { formatDateTime } from "../../services/utils";
import { Participant } from "../ParticipantForm";
import { deleteEventRegistration } from "../../services/RegisterEventService";
import './index.css';
import { toast } from 'react-toastify';

const TicketInfoComponent: React.FC = () => {
  const location = useLocation();
  const registration = location.state?.registration;
  const navigate = useNavigate();
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleOpenCancellationModal = () => {
    setIsCancellationModalOpen(true);
  };

  const handleCancel = async () => {
    console.log("Cancellation confirmed");
    setIsCancellationModalOpen(false);
    try {
      const response = await deleteEventRegistration(registration._id);
      toast.success("Registration Cancelled Successfully");
      navigate(`/mytickets`);
      console.log("Cancellation Response:", response);
    } catch (error) {
      console.error("Error canceling registration:", error);
    }
  };

  const handleCloseCancellationModal = () => {
    setIsCancellationModalOpen(false);
  };

  const qrCodeValue = `TicketID:${registration._id}`;

  let venueLinkComponent;
if (registration.event.details.venue) {
  venueLinkComponent = (
    <div className="flex items-center mb-2">
      <span className="font-bold min-w-[80px]">Venue:</span>
      <p>{registration.event.details.venue}</p>
    </div>
  );
} else if (registration.event.details.link) {
  venueLinkComponent = (
    <div className="flex items-center mb-2">
      <span className="font-bold min-w-[80px]">Link:</span>
      <a
        href={registration.event.details.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#007bff' }} 
        className="hover:underline"
      >
        {registration.event.details.link}
      </a>
    </div>
  );
}

  return (
    <Container>
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/mytickets"
              className="text-blue-600 font-bold hover:underline flex items-center ml-auto"
            >
              {" "}
              <FaArrowLeft className="mr-1" /> See All Tickets
            </Link>
          </div>

          <div id="ticketContent">
            <div className="bg-gray-100 p-6 rounded-md">
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-xl font-bold">Your Tickets for</h1>
                  <span className="text-3xl lg:text-5xl font-bold text-title-color">
                    {registration.event.eventName}
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <QRCode value={qrCodeValue} size={128} level={"H"} />
                  <span>Reg ID#: {registration._id}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div>
                  <p className="text-2xl ml-3">
                    <strong>Contact Information</strong>
                    <hr
                      className="my-2 border-gray-300 mx-l"
                      style={{ width: "85%" }}
                    />
                  </p>

                  <div className="pt-4">
                    {registration.participants.map(
                      (participant: Participant, index: number) => (
                        <div
                          key={index}
                          className="flex flex-col mb-4  p-4 rounded-md"
                        >
                          <h3 className="font-bold mb-2">
                            Participant {index + 1}
                            <hr
                              className="my-2 border-gray-300 mx-l"
                              style={{ width: "70%" }}
                            />
                          </h3>

                          <div className="flex">
                            <div className="w-1/2 pr-2">
                              <p className="mb-1 font-semibold">First Name</p>
                              <p className="mb-1">{participant.firstName}</p>
                            </div>
                            <div className="w-1/2 pl-2">
                              <p className="mb-1 font-semibold">Last Name</p>
                              <p className="mb-1">{participant.lastName}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="font-semibold">Email</p>
                            <p>{participant.email}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-2xl mb-2">
                    <strong>Event Information</strong>
                    <hr
                      className="my-2 border-gray-300 mx-l"
                      style={{ width: "75%" }}
                    />
                  </p>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <span className="font-bold min-w-[80px]">From:</span>
                      <span>
                        {formatDateTime(registration.event.eventStartDateTime)}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="font-bold min-w-[80px]">To:</span>
                      <span>
                        {formatDateTime(registration.event.eventEndDateTime)}
                      </span>
                    </div>
          
                    <div>{venueLinkComponent}</div>
                    
                    <div className="flex items-start mb-2">
                      {" "}
                      <span className="font-bold min-w-[80px]">About: </span>
                      <p className="mb-0 mt-0 text-justify">
                        {" "}
                        {registration.event.details.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaPrint />
              <span className="ml-2">Print Tickets</span>
            </Button>
            <Button
              onClick={handleOpenCancellationModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              color="error"
            >
              <FaRegTimesCircle />
              <span className="ml-2">Cancel Tickets</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Cancellation Confirmation Modal */}
      <CancellationModal
        isOpen={isCancellationModalOpen}
        onCancel={handleCloseCancellationModal}
        onConfirm={handleCancel}
      />
    </Container>
  );
};

export default TicketInfoComponent;
