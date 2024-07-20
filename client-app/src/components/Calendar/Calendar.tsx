import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Container from '../Container';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { getEventsByOrganizer, getEventsRegisteredByUser, getEventsbyId } from '../../services/EventService';
import { useNavigate } from 'react-router-dom';


const localizer = momentLocalizer(moment);

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

const eventStyleGetter = (event: Event) => {
  var backgroundColor = event.color;
  return {
    style: {
      backgroundColor,
    }
  };
}

const Legend = () => (
  <div className="flex justify-center items-center gap-4 my-4">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-[#1b5785]"></div>
      <span>My Events</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-[#31572c]"></div>
      <span>Registered and Paid</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-[#d90429]"></div>
      <span>Registered but Not Paid</span>
    </div>
  </div>
);


const CustomCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const user = useSelector(selectUser);

  const handleEventSelect = (event: Event) => {
    navigate(`/event/${event.id}`); 
  };

  useEffect(() => {
    const fetchAndFormatEvents = async () => {
      if (user && user.id) {
        const createdEvents = await fetchEventsCreatedByCurrentUser(user);
        const formattedCreatedEvents = createdEvents.map((event) => ({
          id: event._id,
          title: event.eventName,
          start: new Date(event.eventStartDateTime),
          end: new Date(event.eventEndDateTime),
          color: '#1b5785',
          source: 'created', 
        }));
  
        const registrationResponse = await getEventsRegisteredByUser(user.id);
        const registrations = registrationResponse.data.data;
        const detailedRegisteredEvents = await Promise.all(
        registrations.map(async (registration: { event: any; _id: any; paymentStatus: string; }) => {

          if (registration.event) {
            return {
              id: registration.event._id, 
              title: registration.event.eventName,
              start: new Date(registration.event.eventStartDateTime),
              end: new Date(registration.event.eventEndDateTime),
              color: registration.paymentStatus === "PAID" ? '#31572c' : '#d90429', 
              source: 'registered',
            };
          }
          return null;
        })
      ).then();
  
        setEvents([...formattedCreatedEvents, ...detailedRegisteredEvents]);
      }
    };
  
    fetchAndFormatEvents();
  }, [user]);


  return (
    <Container>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <Legend /> 
        <div style={{ height: '600px', padding: '20px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
            defaultView="month"
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            style={{ height: '100%', width: '100%' }}
            onSelectEvent={handleEventSelect}
          />
        </div>
      </div>
    </Container>
  );
};

async function fetchEventsCreatedByCurrentUser(user: { id: string; }): Promise<any[]> {
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

export default CustomCalendar;
