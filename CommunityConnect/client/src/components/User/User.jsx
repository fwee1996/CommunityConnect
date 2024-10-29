import React, { useEffect, useState } from 'react';
import { GetUserById } from '../../services/UserService';
import { Link, useNavigate } from "react-router-dom";
import { EditPencil, TrashcanDelete } from "../../Icons";
import "./User.css";
import { GetAllEvents } from '../../services/EventService';
import { GetAllVolunteers } from '../../services/VolunteerService';
import Event from '../Event/Event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const User = () => {
    const [user, setUser] = useState(null);
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const [organizedEvents, setOrganizedEvents] = useState([]);
    const [volunteerEvents, setVolunteerEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('organized');
    const navigate = useNavigate();

    useEffect(() => {
        if (userProfile && userProfile.id) {
            fetchUser();
            fetchEvents();
        }
    }, []);

    const fetchUser = async () => {
        try {
            const userData = await GetUserById(userProfile.id);
            setUser(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchEvents = async () => {
        try {
            const allEvents = await GetAllEvents();
            const signups = await GetAllVolunteers();
            const userId = userProfile.id;

            const organized = await Promise.all(
                allEvents
                    .filter(event => event.userId === userId)
                    .map(async (event) => {
                        const organizer = await GetUserById(event.userId);
                        return {
                            ...event,
                            organizerName: organizer.fullName,
                            organizerImage: organizer.profileImage,
                        };
                    })
            );

            const volunteer = await Promise.all(
                allEvents.filter(event =>
                    signups.some(signup => signup.eventId === event.id && signup.userId === userId)
                ).map(async (event) => {
                    const organizer = await GetUserById(event.userId);
                    return {
                        ...event,
                        organizerName: organizer.fullName,
                        organizerImage: organizer.profileImage,
                    };
                })
            );

            const past = allEvents.filter(event =>
                new Date(`${event.eventDate.split('T')[0]} ${event.endTime}`) < new Date() &&
                (organized.some(orgEvent => orgEvent.id === event.id) ||
                    volunteer.some(volEvent => volEvent.id === event.id))
            );

            setOrganizedEvents(organized);
            setVolunteerEvents(volunteer);
            setPastEvents(past);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    //checks below needed for null images in database
    // if (!userProfile || !userProfile.id) {
    //     return <div>Please log in to view your profile.</div>;
    // }

   // If the user data is not yet available, display a loading message
    //if you dont check this the /profile webpage wont load at all
    if (!user) {
        return <div>Loading...</div>;
    }

    const renderEventCards = (events) => (
        events.map(event => (
            <Event
                key={event.id}
                image={event.eventPicture ? `https://localhost:5001/${event.eventPicture}` : "path/to/default/image.jpg"}
                name={event.name}
                date={new Date(event.eventDate).toLocaleDateString()}
                time={`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
                organizerImage={event.organizerImage ? `https://localhost:5001/${event.organizerImage}` : "path/to/default/image.jpg"}
                organizerName={event.organizerName}
                onClick={() => handleEventClick(event.id)}
            />
        ))
    );

    const handleEventClick = (id) => {
        navigate(`/events/${id}`);
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const formattedHours = hours % 12 || 12;
        const ampm = hours < 12 ? 'AM' : 'PM';
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };

    return (
        <div className='user-profile'>
            <div className='user-img-and-info'>
                <div className='user-image'>
                    <img src={user.profileImage ? `https://localhost:5001/${user.profileImage}` : "https://localhost:5001/uploads/default.jpg"} alt={user.fullName} id="user-img" />
                </div>
                <div className='user-info'>
                    <h2 id='user-name'>{user.fullName}</h2>
                    <div className='user-details'>
                        <p> <span>{user.email}</span></p>
                        <p><span>{user.phoneNumber}</span></p>
                        <p> <span>{user.city}, {user.state}</span></p>

                        <Link to={`/profile/${user.id}/edit`} className="btn btn-outline-primary mx-1 text-primary" title="Edit User">
                            {/* <EditPencil size={20} /> */}
                            {/* <FontAwesomeIcon icon={faPencilAlt} className="icon-light" />
                            <FontAwesomeIcon icon={faPencilAlt} style={{ color: 'lightgray' }} /> */}
                            <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/>
                            </svg>
                            {/* React: */}
                            {/* stroke-width ---> strokeWidth */}
                            {/* trash-can ---> trashCan */}
                            {/* fa-pencil-alt ---> faPencilAlt */}
                        </Link>
                        <Link to={`/profile/${user.id}/delete`} className="btn btn-outline-danger mx-1" title="Delete User">
                            <TrashcanDelete color="#b91c1c" size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            <h3 className="my-events-label">My Events</h3>
            <div className="tabs">
                <button onClick={() => setActiveTab('organized')} className={activeTab === 'organized' ? 'active' : ''}>Organized Events</button>
                <button onClick={() => setActiveTab('volunteer')} className={activeTab === 'volunteer' ? 'active' : ''}>Volunteer Events</button>
                <button onClick={() => setActiveTab('past')} className={activeTab === 'past' ? 'active' : ''}>Past Events</button>
            </div>
            <div className="my-profile-event-list">
                <div className="eventListContainer">
                    {activeTab === 'organized' && (organizedEvents.length > 0 ? renderEventCards(organizedEvents) : <p>No organized events found.</p>)}
                    {activeTab === 'volunteer' && (volunteerEvents.length > 0 ? renderEventCards(volunteerEvents) : <p>No volunteer events found.</p>)}
                    {activeTab === 'past' && (pastEvents.length > 0 ? renderEventCards(pastEvents) : <p>No past events found.</p>)}
                </div>
            </div>
        </div>
    );
};

export default User;
