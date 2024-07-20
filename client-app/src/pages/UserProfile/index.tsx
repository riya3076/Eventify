/**
 * Author: Bhavisha Oza, Parth Mehta
 * Banner ID: B00935827, B00931931
 */
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../components/Container";
import { selectUser, user as USER } from "../../redux/userSlice";
import { updateUser } from "../../services/UserService";
import { fetchUserBadges } from '../../services/BadgeService';
import { fetchParticipatoryEvents } from '../../services/EventService';

const UserProfile = () => {
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    profilePicture: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=128`,
    bio: user.bio || '',
    badge: '',
    participatoryEvents: [],
  });
  const [tempFormData, setTempFormData] = useState({ ...formData }); // Temporary form data state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserBadges(user.id)
        .then(badgeData => {
          const badgeType = badgeData?.data?.badgeType || 'No Badge';
          setFormData(updatedFormData => ({
            ...updatedFormData,
            badge: badgeType,
          }));
        })
        .catch(error => console.error('Fetching badges failed:', error));

      fetchParticipatoryEvents(user.id)
        .then(eventsData => {
          setFormData(updatedFormData => ({
            ...updatedFormData,
            participatoryEvents: eventsData.data || [],
          }));
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempFormData({
      ...tempFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateUser(user.id, tempFormData);
      if (response?.data) {
        if (response?.status === 200) {
          let data = response.data.data;
          dispatch(
            USER({
              ...user,
              firstName: data.firstName,
              lastName: data.lastName,
              bio: data.bio,
            })
          );
          setFormData(tempFormData); // Update formData with tempFormData
          setEditMode(false);
          setError("");
        }
      } else {
        setError(response?.data.message);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again later.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setTempFormData(formData); // Revert tempFormData to original formData
    setEditMode(false);
  };

  const handleCertificateDownload = (eventId: any) => {
    const downloadUrl = `${REACT_APP_BASE_URL}/event/certificate/${user.id}/${eventId}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <Container>
      <div className="flex flex-wrap md:flex-nowrap gap-10 mt-10 p-5 bg-white rounded shadow">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 mb-4"
          />
          {formData.badge && formData.badge !== 'No Badge' && (
            <div className="flex flex-cols mt-3">
              <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 flex items-center justify-center">
                <div className="w-1/2">
                  {formData.badge === 'Bronze Attendee' && (
                    <i className="fa-sharp fa-solid fa-medal fa-5x" style={{ color: '#a05822' }} />
                  )}
                  {formData.badge === 'Silver Attendee' && (
                    <i className="fa-sharp fa-solid fa-medal fa-5x" style={{ color: '#a9b0b4' }} />
                  )}
                  {formData.badge === 'Gold Attendee' && (
                    <i className="fa-sharp fa-solid fa-medal fa-5x" style={{ color: '#d4af37' }} />
                  )}
                </div>
                <div className="w-1/2 pt-1 font-semibold text-center">
                  {formData.badge}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          {error && <div className="text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-md font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={tempFormData.firstName}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-md font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={tempFormData.lastName}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-md font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={tempFormData.bio}
                onChange={handleInputChange}
                disabled={!editMode}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={tempFormData.email}
                onChange={handleInputChange}
                disabled={true}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="badges" className="block text-md font-medium text-gray-700">Participatory Events</label>
              <div className="mt-2">
                {formData.participatoryEvents.length > 0 ? formData.participatoryEvents.map((event: { _id: string, eventName: string }) => (
                  <div key={event._id} className="mb-4 p-4 border rounded-lg">
                    <h4 className="font-semibold">{event.eventName}</h4>
                    <button onClick={() => handleCertificateDownload(event._id)} className="mt-2 text-blue-500 hover:text-blue-700">Download Certificate</button>
                  </div>
                )) : <p>No participatory events found.</p>}
              </div>
            </div>
            {editMode ? (
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}

          </form>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
