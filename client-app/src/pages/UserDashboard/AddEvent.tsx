/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React, { useState } from 'react';
import Container from '../../components/Container';
import SectionTitle from '../../components/Landing/SectionTitle';
import { createEvent } from '../../services/EventService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { toast } from 'react-toastify';

export interface EventDetails {
    description: string;
    venue?: string;
    link?: string;
    additionalInfo?: string;
}

export interface Event {
    eventName: string;
    organizer: string;
    details: EventDetails;
    titlePicture: string;
    pictures: string[];
    topic: string;
    categories: string[];
    eventStartDateTime: string;
    eventEndDateTime: string;
    isPaidEvent: boolean;
    price?: number;
}

const AddEvent = () => {
    const user = useSelector(selectUser);
    const [eventData, setEventData] = useState({
        eventName: '',
        organizer: user.id,
        description: '',
        isOnline: false,
        venue: '',
        link: '',
        additionalInfo: '',
        titlePicture: '',
        pictures: [] as string[],
        topic: '',
        categories: [] as string[],
        eventStartDateTime: '',
        eventEndDateTime: '',
        isPaidEvent: false,
        price: NaN,
    });
    const [errors, setErrors] = useState({} as any);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const notify = () => toast.success("Event created successfully!");

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setEventData({
            ...eventData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const allCategories = ["Tech", "Art", "Music", "Science", "Sports"];
    const [selectedCategory, setSelectedCategory] = useState('');

    const addCategory = () => {
        if (selectedCategory && !eventData.categories.includes(selectedCategory)) {
            setEventData({
                ...eventData,
                categories: [...eventData.categories, selectedCategory],
            });
            setSelectedCategory('');
        }
    };

    const removeCategory = (categoryToRemove: string | number) => {
        setEventData({
            ...eventData,
            categories: eventData.categories.filter(category => category !== categoryToRemove),
        });
    };

    const handlePictureChange = (index: number, value: string) => {
        const updatedPictures = [...eventData.pictures];
        updatedPictures[index] = value;
        setEventData({ ...eventData, pictures: updatedPictures });
    };

    const addPicture = () => {
        setEventData({
            ...eventData,
            pictures: [...eventData.pictures, ''],
        });
    };

    const removePicture = (index: number) => {
        const filteredPictures = eventData.pictures.filter((_, i) => i !== index);
        setEventData({ ...eventData, pictures: filteredPictures });
    };

    const validateForm = () => {
        let formErrors: any = {};
        let isValid = true;

        if (!eventData.eventName.trim()) {
            isValid = false;
            formErrors.eventName = 'Event name is required';
        }

        if (!eventData.description.trim()) {
            isValid = false;
            formErrors.description = 'Description is required';
        }

        if (!eventData.eventStartDateTime) {
            isValid = false;
            formErrors.eventStartDateTime = 'Start date and time are required';
        }
        if (!eventData.eventEndDateTime) {
            isValid = false;
            formErrors.eventEndDateTime = 'End date and time are required';
        }
        if (new Date(eventData.eventStartDateTime) >= new Date(eventData.eventEndDateTime)) {
            isValid = false;
            formErrors.eventEndDateTime = 'End date must be after the start date';
        }

        if (eventData.isOnline) {
            if (!eventData.link.trim()) {
                isValid = false;
                formErrors.link = 'Event link is required for online events';
            } else if (!/^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=]+$/.test(eventData.link)) {
                isValid = false;
                formErrors.link = 'Invalid URL format';
            }
        } else {
            if (!eventData.venue.trim()) {
                isValid = false;
                formErrors.venue = 'Venue is required for physical events';
            }
        }

        if (!eventData.topic.trim()) {
            isValid = false;
            formErrors.topic = 'Topic is required';
        }

        if (eventData.categories.length < 1) {
            isValid = false;
            formErrors.categories = 'At least one category is required';
        }

        if (!eventData.titlePicture.trim()) {
            isValid = false;
            formErrors.titlePicture = 'Title picture URL is required';
        } else if (!/^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=]+$/.test(eventData.titlePicture)) {
            isValid = false;
            formErrors.titlePicture = 'Invalid URL format for title picture';
        }

        if (eventData.isPaidEvent) {
            if (isNaN(eventData.price)) {
                isValid = false;
                formErrors.price = 'Price is required for paid events and must be a number';
            } else if (Number(eventData.price) <= 0) {
                isValid = false;
                formErrors.price = 'Price must be greater than 0';
            }
        }

        setErrors(formErrors);
        return isValid;
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(eventData);
            const event: Event = {
                eventName: eventData.eventName,
                organizer: eventData.organizer,
                details: {
                    description: eventData.description,
                    venue: eventData.venue || undefined,
                    link: eventData.link || undefined,
                    additionalInfo: eventData.additionalInfo || undefined,
                },
                titlePicture: eventData.titlePicture,
                pictures: eventData.pictures || [],
                topic: eventData.topic,
                categories: eventData.categories,
                eventStartDateTime: eventData.eventStartDateTime,
                eventEndDateTime: eventData.eventEndDateTime,
                isPaidEvent: eventData.isPaidEvent,
                price: eventData.price || undefined,
            };
            const response = await createEvent(event);
            if (response?.data) {
                if (response?.status === 200) {
                    notify();
                    navigate('/dashboard');
                } else {
                    setErrorMsg("Something went wrong!");
                }
            } else {
                let message: string = response?.response?.data.message;
                setErrorMsg(message);
            }
        }
    };

    return (
        <Container>
            <SectionTitle title={'New Event Registration'} />
            <div className="max-w-6xl mx-auto p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Event Overview</h2>
                    <div>
                        <label htmlFor="eventName" className="block text-md font-medium text-gray-700">Event Name</label>
                        <input
                            type="text"
                            name="eventName"
                            id="eventName"
                            value={eventData.eventName}
                            onChange={handleChange}
                            className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                            placeholder="Event Name"
                        />
                        {errors.eventName && <p className="text-red-500 text-xs mt-1">{errors.eventName}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-md font-medium text-gray-700">Event Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                            placeholder="Event Description"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <h2 className="text-xl font-bold mb-4">Event Engagement</h2>

                    <div className="flex gap-4">
                        <div className='w-1/2'>
                            <label htmlFor="eventStartDateTime" className="block text-md font-medium text-gray-700">Start Date and Time</label>
                            <input
                                type="datetime-local"
                                id="eventStartDateTime"
                                name="eventStartDateTime"
                                value={eventData.eventStartDateTime}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 text-md p-2.5"
                            />
                            {errors.eventStartDateTime && <p className="text-red-500 text-xs mt-1">{errors.eventStartDateTime}</p>}
                        </div>

                        <div className='w-1/2'>
                            <label htmlFor="eventEndDateTime" className="block text-md font-medium text-gray-700">End Date and Time</label>
                            <input
                                type="datetime-local"
                                id="eventEndDateTime"
                                name="eventEndDateTime"
                                value={eventData.eventEndDateTime}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 text-md p-2.5"
                            />
                            {errors.eventEndDateTime && <p className="text-red-500 text-xs mt-1">{errors.eventEndDateTime}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="isOnline" className="block text-md font-medium text-gray-700">Is this event online?</label>
                        <input
                            type="checkbox"
                            name="isOnline"
                            id="isOnline"
                            checked={eventData.isOnline}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    {eventData.isOnline ? (
                        <div>
                            <label htmlFor="link" className="block text-md font-medium text-gray-700">Event Link</label>
                            <input
                                type="text"
                                name="link"
                                id="link"
                                value={eventData.link}
                                onChange={handleChange}
                                className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                                placeholder="https://example.com/event"
                            />
                            {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="venue" className="block text-md font-medium text-gray-700">Event Venue</label>
                            <input
                                type="text"
                                name="venue"
                                id="venue"
                                value={eventData.venue}
                                onChange={handleChange}
                                className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                                placeholder="Venue Address"
                            />
                            {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue}</p>}
                        </div>
                    )}

                    <h2 className="text-xl font-bold mb-4">Event Genre</h2>

                    <div className="flex gap-4">
                        <div className='w-1/3'>
                            <label htmlFor="topic" className="block text-md font-medium text-gray-700">Event Topic</label>
                            <input
                                type="text"
                                name="topic"
                                id="topic"
                                value={eventData.topic}
                                onChange={handleChange}
                                className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                                placeholder="Event Topic"
                            />
                            {errors.topic && <p className="text-red-500 text-xs mt-1">{errors.topic}</p>}
                        </div>

                        <div className='w-2/3'>
                            <label className="block text-md font-medium text-gray-700">Categories</label>
                            <div className="flex items-center">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                                >
                                    <option value="">Select a category</option>
                                    {allCategories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addCategory}
                                    className="text-white font-bold py-1 px-2 rounded text-xs mt-2 ml-2 bg-button-primary hover:bg-button-primary-hover text-white"
                                >
                                    Add Category
                                </button>
                            </div>
                            {errors.categories && <p className="text-red-500 text-xs mt-1">{errors.categories}</p>}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {eventData.categories.map((category, index) => (
                                    <span key={index} className="flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {category}
                                        <button
                                            type="button"
                                            onClick={() => removeCategory(category)}
                                            className="ml-2 bg-blue-200 rounded-full text-blue-800 hover:bg-blue-300"
                                        >
                                            <span className="text-xs font-semibold">&times;</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4">Payment Information</h2>

                    <div>
                        <label htmlFor="isPaidEvent" className="block text-md font-medium text-gray-700">Is this a paid event?</label>
                        <input
                            type="checkbox"
                            name="isPaidEvent"
                            id="isPaidEvent"
                            checked={eventData.isPaidEvent}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    {eventData.isPaidEvent && (
                        <div>
                            <label htmlFor="price" className="block text-md font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={eventData.price}
                                onChange={handleChange}
                                className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                                placeholder="0.00"
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                    )}

                    <h2 className="text-xl font-bold mb-4">Media and additional information</h2>

                    <div>
                        <label htmlFor="titlePicture" className="block text-md font-medium text-gray-700">Title Picture</label>
                        <input
                            type="text"
                            name="titlePicture"
                            id="titlePicture"
                            value={eventData.titlePicture}
                            onChange={handleChange}
                            className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                            placeholder="Title Picture URL"
                        />
                        {errors.titlePicture && <p className="text-red-500 text-xs mt-1">{errors.titlePicture}</p>}
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-700">Pictures</label>
                        {eventData.pictures.map((picture, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <input
                                    type="text"
                                    name={`pictures[${index}]`}
                                    value={picture}
                                    onChange={(e) => handlePictureChange(index, e.target.value)}
                                    className="border border-gray-300 text-md block w-full p-2.5 mr-2"
                                    placeholder="Picture URL"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePicture(index)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addPicture}
                            className="mt-2 bg-button-primary hover:bg-button-primary-hover text-white font-bold py-1 px-2 rounded text-sm"
                        >
                            Add Picture
                        </button>
                    </div>

                    <div>
                        <label htmlFor="additionalInfo" className="block text-md font-medium text-gray-700">Additional Information</label>
                        <textarea
                            name="additionalInfo"
                            id="additionalInfo"
                            value={eventData.additionalInfo}
                            onChange={handleChange}
                            className="border border-gray-300 text-md block w-full p-2.5 mt-2"
                            placeholder="Event Additional Information"
                        />
                        {errors.additionalInfo && <p className="text-red-500 text-xs mt-1">{errors.additionalInfo}</p>}
                    </div>

                    {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
                    <button type="submit" className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover">
                        Create Event
                    </button>
                </form>
            </div>
        </Container >
    );
};

export default AddEvent;

