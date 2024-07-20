/**
 * Author: Keyur Pradipbhai Khant (B00935171), Riyaben Pareshkumar Patel (B00926204)
 */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { fetchAllEvents, fetchEventsExcludeOrganizer } from '../EventFeed/Events';
import { useNavigate } from 'react-router-dom';
import random from '../../assets/random.png';

interface TrendingTopicProps {
  topic: string;
  onClick: () => void;
}

const TrendingTopic: React.FC<TrendingTopicProps> = ({ topic, onClick }) => (
  <p className="bg-[#F6F6F6] rounded-lg px-2 py-1 cursor-pointer" onClick={onClick}>{topic}</p>
);

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

const SearchBar: React.FC = () => {
  const [focusBox, setFocusBox] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      fetchEventsExcludeOrganizer(user).then(setEvents);
    }
    else{
      fetchAllEvents().then(setEvents);
    }
  }, [user]);

  const handleSearch = () => {
    navigate(`/events?search=${encodeURIComponent(searchText)}`);
  };

  const handleTopicClick = (topic: string) => {
    navigate(`/events?topic=${encodeURIComponent(topic)}`);
  };

  const handleClick = (eventId: any) => {
    if(user){
      navigate(`/event/${eventId}`);
    }
    else{
      navigate('/auth/login');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const trendingTopics = ['Tech', 'Art', 'Music', 'Concerts', 'Conference', 'Environment', 'Science', 'Sports'];

  return (
    <div className="relative z-40">
      <input
        type="text"
        placeholder="Search by Events, Collaborators, Cities"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        onFocus={() => setFocusBox(true)}
     
        className="bg-white bg-opacity-50 focus:bg-opacity-100 border-[1px] border-white outline-none px-4 py-2 rounded-md sm:w-[500px] w-[300px] placeholder-white"
      />
      {focusBox && (
        <div className="bg-white px-4 py-4 absolute top-[2.4rem] left-0 w-full text-[12px] border-t-[1px] border-t-black search_drop_shadow rounded-br-md rounded-bl-md">
          <h2 className="uppercase text-gray-400 font-bold">Trending Topics</h2>
          <div className="my-4 flex items-center gap-2 flex-wrap">
            {trendingTopics.map((topic) => (
              <TrendingTopic key={topic} topic={topic} onClick={() => handleTopicClick(topic)} />
            ))}
          </div>
          <h2 className="uppercase text-gray-400 font-bold py-4">Upcoming Events</h2>
          <div className="grid grid-cols-2 gap-4">
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center gap-2 flex-wrap border-[1px] rounded-md p-2 cursor-pointer hover:bg-gray-600 hover:text-white border-gray-500" onClick={() => handleClick(event.id)}>
                <img src={event.image || random} alt="event" className="w-12 h-12 rounded-full" onClick={() => handleClick(event.id)} />
                <div>
                  <h1 className="font-light capitalize text-base">{event.name.length >= 14 ? `${event.name.substring(0, 14)}...` : event.name}</h1>
                  <p className="opacity-40">{formatDate(event.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
