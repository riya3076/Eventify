/**
 * Author: Aharnish Solanki (B00933563)
 */

import React from 'react';
import EventDetails from '../../components/EventDetails';
import { useParams } from "react-router-dom";

const EventPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <EventDetails eventId={id} />
        </div>);
};

export default EventPage;