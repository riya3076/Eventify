/**
 * Author: Riyaben Pareshkumar Patel (B00926204)
 */

import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import EventCard from '../../components/EventCard';
import Container from '../../components/Container';

const WishlistPage: React.FC = () => {
  const { wishlist} = useWishlist();

  return (
    <Container>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-lg">No events in your wishlist.</p>
        )}
      </div>
    </Container>
  );
};

export default WishlistPage;
