/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  index: number;
  eventId: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
}

export const HorizontalEventCard: React.FC<EventCardProps> = ({
  index,
  eventId,
  title,
  imageUrl,
  isActive
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex items-center bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition duration-200 ease-in-out" onClick={() => { navigate(`/event/${eventId}`); }}>
      <span className="font-bold mr-4">{index}.</span>
      <img src={imageUrl} alt="Event" className="w-20 h-20 mr-4 object-cover rounded-lg" />
      <div className="flex-grow">
        <h4 className="font-bold mb-2 line-clamp-1" title={title}>{title}</h4>
      </div>
      {!isActive && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-lg">
          Expired
        </span>
      )}
    </div>
  );
};
