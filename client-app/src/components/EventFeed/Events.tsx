/**
 * Author: Riyaben Pareshkumar Patel (B00926204)
 */

import React, { useState, useEffect } from 'react';
import EventCard from '../EventCard/index';
import Container from '../Container';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEventsExcludeOrganizer, getAllEventsService  } from '../../services/EventService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { useLocation } from 'react-router-dom';

interface Event {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    image: string;
    topic: string;
    categories: string[];
}



const Events: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(selectUser);
    const location = useLocation();

    const noEventsMessage = searchQuery.length > 0 ? "No events match your search criteria." : "No events found.";


    useEffect(() => {
        const fetchEvents = async () => {
        setIsLoading(true); 
        if (user?.id) {
            const fetchedEvents = await fetchEventsExcludeOrganizer(user);
            setEvents(fetchedEvents);
        } else {
            const allEvents = await fetchAllEvents();
            setEvents(allEvents);
        }
        setIsLoading(false); 
    };

    fetchEvents();
    }, [user]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const search = queryParams.get('search');
        const topic = queryParams.get('topic');
        if (search) {
            setSearchQuery(decodeURIComponent(search));
        }
        else if (topic) {
            setSearchQuery('');
            setSearchQuery(decodeURIComponent(topic));
        }
    }, [location]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const clearFilters = () => {
        setSearchQuery('');
        setDateRange([null, null]);
    };

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date).setHours(0,0,0,0);
        let startDateTime = startDate ? new Date(startDate).setHours(0,0,0,0) : null;
        let endDateTime = endDate ? new Date(endDate).setHours(23,59,59,999) : (startDate ? new Date(startDate).setHours(23,59,59,999) : null);
    
        const isInRange = (!startDateTime || eventDate >= startDateTime) && (!endDateTime || eventDate <= endDateTime);
    
        const matchesSearch = (event.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (event.location?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (event.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (event.topic ? event.topic.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (event.categories ? event.categories.some(category => category?.toLowerCase().includes(searchQuery.toLowerCase())) : false);
    
        return isInRange && matchesSearch;
    });
      

    return (
        <Container>
            <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
      
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by name, location, description, topic, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 text-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => setDateRange(update as [Date | null, Date | null])}
                        customInput={<input className="border border-gray-300 text-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer" />}
                        placeholderText="Select a date or range"
                    />
                    <button
                        onClick={clearFilters}
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
                    >
                        Clear
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <p className="text-xl font-semibold text-gray-600 mt-5">Loading events...</p>
                </div>
            ) : (
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4 my-8">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <p className="text-xl font-semibold text-gray-600 mt-5">
                                {noEventsMessage}
                            </p>
                        </div>

                    )}
                </div>
            )}
        </Container>
    );
};

export async function fetchEventsExcludeOrganizer(user: { id: string; }): Promise<any[]> {
    try{
    const response = await getEventsExcludeOrganizer(user.id);
    const data = await response.data;
        console.log(data);
        if (response?.data) {
            let mappedEvents = data.data.map((event: any) => ({
                id: event._id, 
                name: event.eventName,
                date: event.eventStartDateTime, 
                location: event.details.venue, 
                description: event.details.description,
                image: event.titlePicture, 
            }));

            console.log("Filtered Organizer Events:", mappedEvents);
            return mappedEvents;
        } else {
            console.error('Failed to fetch events:', data.message);
            return [];
        }
    } 
    catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export async function fetchAllEvents(): Promise<any[]> {
    try {
        const response = await getAllEventsService(); 
        console.log(response);
        if (response?.data) {
            let mappedEvents = response.data.map((event: any) => ({
                id: event._id, 
                name: event.eventName,
                date: event.eventStartDateTime, 
                location: event.details.venue, 
                description: event.details.description,
                image: event.titlePicture, 
                topic: event.topic,
                categories: event.categories,
            }));

            console.log("All Events:", mappedEvents);
            return mappedEvents;
        } else {
            console.error('Failed to fetch all events:', response.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching all events:', error);
        return [];
    }
}

export default Events;