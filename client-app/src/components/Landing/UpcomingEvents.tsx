/**
 * Author: Keyur Pradipbhai Khant (B00935171), Riyaben Pareshkumar Patel (B00926204)
 */
import React, { useEffect, useState } from 'react';
import EventCard from '../EventCard/index';
import SectionTitle from './SectionTitle';
import Container from '../Container';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { fetchAllEvents, fetchEventsExcludeOrganizer } from '../EventFeed/Events'

interface Event {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    image: string;
}


const TopUpcomingEvents: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user?.id) {
            fetchEventsExcludeOrganizer(user).then(setEvents);
        } else {
            fetchAllEvents().then(setEvents);
        }
    }, [user]);
    

    const handleDiscoverEventsClick = () => {
        navigate('/events');
    };

    
    return (
        <section className="my-14">
            <Container>
                <SectionTitle title="Top Upcoming Events" />
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4 mt-8">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        onClick={handleDiscoverEventsClick}
                        className="bg-button-primary text-white py-2 px-16 rounded-full text-lg font-medium hover:bg-button-primary-hover transition duration-300 ease-in-out w-full sm:w-auto"
                    >
                        Discover Events
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default TopUpcomingEvents;


