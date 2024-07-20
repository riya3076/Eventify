/**
 * Author: Riyaben Pareshkumar Patel (B00926204)
 */

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { selectUser } from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { addToWishlistService, getWishlistEvents, removeFromWishlistService } from '../services/EventService';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image: string;
  topic?: string;
  categories?: string[];
}

interface WishlistContextType {
  wishlist: Event[];
  setWishlist: (events: Event[]) => void;
  addToWishlist: (event: Event) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Event[]>([]);
  const user = useSelector(selectUser);
  const userId = user?.id;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getWishlistEvents(userId);
        const mappedEvents = response.data.map((event: any) => ({
          id: event._id,
          name: event.eventName,
          date: event.eventStartDateTime,
          location: event.details.venue,
          description: event.details.description,
          image: event.titlePicture,
        }));
        setWishlist(mappedEvents);
      } catch (error) {
        console.error("Error fetching wishlist events:", error);
      }
    };

    if (userId) {
      fetchEvents();
    }
  }, [setWishlist, userId, wishlist]);

  const addToWishlist = useCallback(async (event: Event) => {
    try {
      const data = await addToWishlistService(userId, event.id);
      if (data.success) {
        setWishlist(currentWishlist => [...currentWishlist, event]);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  }, [userId]);

  const removeFromWishlist = useCallback(async (id: string) => {
    try {
      const data = await removeFromWishlistService(userId, id);
      if (data.success) {
        setWishlist(currentWishlist => currentWishlist.filter(e => e.id !== id));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }, [userId]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
