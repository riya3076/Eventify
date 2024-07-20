import { createEvent, updateEvent, deleteEvent, getEventsByOrganizer, getEventById, getEventsExcludingOrganizer,getEventsRegisteredByUser, getAllEvents} from "./event";
import { addToWishlist, removeFromWishlist, getWishlistEvents } from "./wishlist";

export default { createEvent, updateEvent, deleteEvent, getEventsByOrganizer, getEventById, getEventsExcludingOrganizer, addToWishlist, removeFromWishlist, getWishlistEvents, getAllEvents, getEventsRegisteredByUser};
