/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React, { useState, useEffect } from 'react';
import { HorizontalEventCard } from "../../components/HorizontalEventCard";
import CreateEventProcedure from './CreateEventProcedure';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';
import { getEventsByOrganizer } from '../../services/EventService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import Analytics from '../Analytics';

const UserDashboard: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        fetchEventsCreatedByCurrentUser(user).then(setEvents);
    }, [user]);

    return (
        <Container>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Your Events</h2>
                <Link to={"/dashboard/add-event"}>
                    <button type="button" className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover">
                        Add Event
                    </button>
                </Link>
            </div>

            <div className='min-h-screen'>
                <div>
                    {events.length > 0 ? (
                        events.map((event, idx) => <HorizontalEventCard key={event._id} eventId={event._id} index={idx + 1} title={event.eventName} imageUrl={event.titlePicture} isActive={event.isActive} />)
                    ) : (
                        <div className="text-center">
                            <p>No events created yet.</p>
                        </div>
                    )}
                </div>

                <div className='justify-between items-center my-8'>
                    <h2 className="text-xl font-bold">Your Analytics</h2>
                    <Analytics />
                </div>
                <CreateEventProcedure />
            </div>
        </Container>
    );
};

export async function fetchEventsCreatedByCurrentUser(user: { id: string; }): Promise<any[]> {
    const response = await getEventsByOrganizer(user.id);
    if (response?.data) {
        if (response?.status === 200) {
            console.log("DATA===>", response?.data?.data);
            return response?.data?.data;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

export default UserDashboard;