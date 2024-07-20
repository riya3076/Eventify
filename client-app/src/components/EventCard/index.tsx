/**
 * Authors: Keyur Pradipbhai Khant (B00935171), Riyaben Pareshkumar Patel (B00926204)
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from "../../context/WishlistContext";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { toast } from 'react-toastify';

interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    image: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const isWishlisted = wishlist.some(e => e.id === event.id);

  const handleClick = () => {
    if(user?.id) {
      navigate(`/event/${event.id}`);
    }
    else {
      navigate('/auth/login');
    }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      try {
        await removeFromWishlist(event.id);
        toast.success("Removed from wishlist");
      } catch (error) {
        toast.error("Error removing from wishlist");
      }
    } else {
      try {
        await addToWishlist(event);
        toast.success("Added to wishlist");
      } catch (error) {
        toast.error("Error adding to wishlist");
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="h-[350px] w-[320px] cursor-pointer" onClick={handleClick}>
      <div className="relative rounded-xl overflow-hidden">
        <img src={event.image} alt={event.name} style={{ width: '500px', height: '200px' }}/>
        <div className="absolute top-4 right-4 flex items-center bg-white text-black rounded-full py-2 px-4 text-xs font-semibold">
          <span>{formatDate(event.date)}</span>
          {user && <button onClick={toggleWishlist} className="ml-2 text-red-500 flex items-center">
            {isWishlisted ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
          </button>}
        </div>
      </div>
      <div className="flex flex-col gap-2 my-4 px-2">
        <h2 className="text-lg font-bold text-title-color">{event.name}</h2>
        <p className="text-sm text-gray-500">{event.location}</p>
        <p className="text-xs font-medium text-gray-700">{event.description.length >= 80 ? `${event.description.substring(0, 80)}...` : event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
