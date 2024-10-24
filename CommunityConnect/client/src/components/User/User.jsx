
// // import React, { useState, useEffect } from 'react';
// // import { GetUserById } from '../../services/UserService';
// // import { useNavigate } from 'react-router-dom';


// // export default function User ({ setIsLoggedIn }){
// //     const [user, setUser] = useState([]);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         fetchUser();
// //     }, []);

// //     const fetchUser = async () => {
// //         const user = await GetUserById();
// //         setUser(user);
// //     };

// //     const handleUserClick = (id) => {
// //         navigate(`/user/${id}`);
// //     };

// //     return (
// //         <div className="user">
// //             {user.map(user => (
// //                 <div className="user-card" key={user.id} onClick={() => handleUserClick(user.id)}>
// //                     <img src={user.profileImage} alt={user.fullName} />
// //                     <h3>{user.fullName}</h3>
// //                     <p>Email:{user.email}</p>
// //                     <p>Phone NUmber: {user.phoneNumber}</p>
// //                     <p>City:{user.city}</p>
// //                     <p>City:{user.state}</p>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };





// import React, { useEffect, useState } from 'react';
// import { GetUserById } from '../../services/UserService';
// // import { useNavigate } from 'react-router-dom';

// const UserProfile = () => {
//     const [user, setUser] = useState(null);
//     // const navigate = useNavigate();
//     const userId = JSON.parse(localStorage.getItem("userProfile"))?.id; // Get the logged-in user ID

//     const userProfile = JSON.parse(localStorage.getItem("userProfile"));
//     console.log("User Profile:", userProfile);

//     useEffect(() => {
//             fetchUser();
//     }, [userId]);

//     const fetchUser = async () => {
//         const userData = await GetUserById(userId);
//         setUser(userData);
//     };

//     return (
//         <div className="user-profile">
//             <img src={user.profileImage} alt={user.fullName} />
//             <h2>{user.fullName}</h2>
//             <p>Email: {user.email}</p>
//             <p>Phone Number: {user.phoneNumber}</p>
//             <p>City: {user.city}</p>
//             <p>State: {user.state}</p>
//         </div>
//     );
// };

// export default UserProfile;




// import React, { useState, useEffect } from 'react';
// import { GetUserById } from '../../services/UserService';
// import { useNavigate } from 'react-router-dom';


// export default function User ({ setIsLoggedIn }){
//     const [user, setUser] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     const fetchUser = async () => {
//         const user = await GetUserById();
//         setUser(user);
//     };

//     const handleUserClick = (id) => {
//         navigate(`/user/${id}`);
//     };

//     return (
//         <div className="user">
//             {user.map(user => (
//                 <div className="user-card" key={user.id} onClick={() => handleUserClick(user.id)}>
//                     <img src={user.profileImage} alt={user.fullName} />
//                     <h3>{user.fullName}</h3>
//                     <p>Email:{user.email}</p>
//                     <p>Phone NUmber: {user.phoneNumber}</p>
//                     <p>City:{user.city}</p>
//                     <p>City:{user.state}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };





// import React, { useEffect, useState } from 'react';
// import { GetUserById } from '../../services/UserService';
// // import { useNavigate } from 'react-router-dom';

// const User = () => {
//     const [user, setUser] = useState(null);
//     // const navigate = useNavigate();
//     //const userId = JSON.parse(localStorage.getItem("userProfile"))?.id; // Get the logged-in user ID

//     const userProfile = JSON.parse(localStorage.getItem("userProfile"));
//     console.log("User Profile:", userProfile);

//     useEffect(() => {
//             fetchUser();
//     }, [userProfile.id]);

//     const fetchUser = async () => {
//         const userData = await GetUserById(userProfile.id);
//         setUser(userData);
//     };

//     return (
//         <div className="user-profile">
//             <img src={user.profileImage} alt={user.fullName} />
//             <h2>{user.fullName}</h2>
//             <p>Email: {user.email}</p>
//             <p>Phone Number: {user.phoneNumber}</p>
//             <p>City: {user.city}</p>
//             <p>State: {user.state}</p>
//         </div>
//     );
// };

// export default User;












//this works:
// import React, { useEffect, useState } from 'react';
// import { GetUserById } from '../../services/UserService';
// import { Link, useNavigate } from "react-router-dom";
// import { EditPencil, TrashcanDelete } from "../../Icons";
// import"./User.css"
// import { GetAllEvents } from '../../services/EventService';
// import { GetAllVolunteers } from '../../services/VolunteerService';
// import '../Event/MyEvents.css';
// import Event from '../Event/Event'; // Import the Event component for consistent styling

// const User = () => {
//     const [user, setUser] = useState(null);
//     const userProfile = JSON.parse(localStorage.getItem("userProfile"));
//     const [organizedEvents, setOrganizedEvents] = useState([]);
//     const [volunteerEvents, setVolunteerEvents] = useState([]);
//     const [pastEvents, setPastEvents] = useState([]);
//     const navigate = useNavigate(); // Initialize navigate

//     useEffect(() => {
//         if (userProfile && userProfile.id) {
//             fetchUser();
            
//             const fetchData = async () => {
//                 const allEvents = await GetAllEvents();
//                 const signups = await GetAllVolunteers();
//                 const userId = JSON.parse(localStorage.getItem("userProfile")).id;
        
//                 // Categorize events
//                 const organizedEvents = allEvents.filter(event => event.userId === userId);
//                 const volunteerEvents = allEvents.filter(event => 
//                     signups.some(signup => signup.eventId === event.id && signup.userId === userId)
//                 );
        
//                 // Filter past events
//                 const pastEvents = allEvents.filter(event => 
//                     new Date(`${event.eventDate.split('T')[0]} ${event.endTime}`) < new Date() &&
//                     (organizedEvents.some(orgEvent => orgEvent.id === event.id) || 
//                      volunteerEvents.some(volEvent => volEvent.id === event.id))
//                 );
        
//                 setOrganizedEvents(organizedEvents);
//                 setVolunteerEvents(volunteerEvents);
//                 setPastEvents(pastEvents);
//             };
//             fetchData();
//         }
//     }, []);

//     const fetchUser = async () => {
//         try {
//             const userData = await GetUserById(userProfile.id);
//             setUser(userData);
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//         }
//     };

//     if (!userProfile || !userProfile.id) {
//         return <div>Please log in to view your profile.</div>;
//     }

//     if (!user) {
//         return <div>Loading...</div>;
//     }





//     const handleEventClick = (id) => {
//         navigate(`/events/${id}`); // Navigate to event details
//     };

//      // Utility function to format time from HH:mm:ss to h:mm AM/PM
//      const formatTime = (timeString) => {   // Split the input time string (e.g., "14:30:00") into its components
//         // The expected format is HH:mm:ss
    
//         const [hours, minutes] = timeString.split(':').map(Number);
//           // Convert hours from 24-hour format to 12-hour format
//         // The expression hours % 12 converts the hours:
//         // 0 (midnight) becomes 12, 1-11 remain the same, 
//         // 12 remains 12, and 13-23 convert to 1-11 respectively.
    
//         const formattedHours = hours % 12 || 12; // Convert to 12-hour format
//         // Handle midnight (0) as 12
    
//         // Determine whether the time is AM or PM
//         // If hours are less than 12, it's AM; otherwise, it's PM
    
//         const ampm = hours < 12 ? 'AM' : 'PM'; // Determine AM/PM
    
//         return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`; // Format and return
//         // Return the formatted time as a string in the format "h:mm AM/PM"
//         // minutes.toString().padStart(2, '0') ensures minutes are always two digits (e.g., "05" instead of "5")
//     };

//     const renderEventCards = (events) => (
//         events.map(event => (
//             <Event
//                 key={event.id}
//                 image={event.eventPicture ? `https://localhost:5001/${event.eventPicture}` : "path/to/default/image.jpg"}
//                 name={event.name}
//                 date={new Date(event.eventDate).toLocaleDateString()}
//                 time={`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
//                 organizerImage={event.organizerImage ? `https://localhost:5001/${event.organizerImage}` : "path/to/default/image.jpg"}
//                 organizerName={event.organizerName}
//                 onClick={() => handleEventClick(event.id)}
//             />
//         ))
//     );
//     return (
//         <div className='user-profile'>
        
//         <div className='user-img-and-info'>
//         <div className='user-image'>
//             <img src={user.profileImage ? `https://localhost:5001/${user.profileImage}` : "path/to/default/image.jpg"} alt={user.fullName} id="user-img"/>
//         </div>
//         <div className='user-info'>
//             <h2 id='user-name'>{user.fullName}</h2>
//             <div className='user-details'>
//                 <p><strong>Email:</strong> <span>{user.email}</span></p>
//                 <p><strong>Phone Number:</strong> <span>{user.phoneNumber}</span></p>
//                 <p><strong>City:</strong> <span>{user.city}</span></p>
//                 <p><strong>State:</strong> <span>{user.state}</span></p>
//                 <Link to={`/profile/${user.id}/edit`} className="btn btn-outline-primary mx-1 text-primary" title="Edit User">
//                         <EditPencil size={20} />
//             </Link>
//             <Link to={`/profile/${user.id}/delete`} className="btn btn-outline-danger mx-1" title="Delete User">
//                 <TrashcanDelete color="#b91c1c" size={20} />
//             </Link>
//             </div>
//         </div>
//         </div>

           



//             <div className='user-events'>
//              <div className="event-list">

          
//             <h3 className="my-events-label">Organized Events</h3>
//             <div className="eventListContainer">
//             {organizedEvents.length > 0 ? renderEventCards(organizedEvents) : <p>No organized events found.</p>}
//             </div>

//             <h3 className="my-events-label">Volunteer Events</h3>
//             <div className="eventListContainer">
//             {volunteerEvents.length > 0 ? renderEventCards(volunteerEvents) : <p>No volunteer events found.</p>}
//             </div>

//             <h3 className="my-events-label">Past Events</h3>
//             <div className="eventListContainer">
//             {pastEvents.length > 0 ? renderEventCards(pastEvents) : <p>No past events found.</p>}
//             </div>
//          </div>
//         </div>
//         </div>
//     );
// };

// export default User;











// import React, { useEffect, useState } from 'react';
// import { GetUserById } from '../../services/UserService';
// import { Link, useNavigate } from "react-router-dom";
// import { EditPencil, TrashcanDelete } from "../../Icons";
// import "./User.css";
// import { GetAllEvents } from '../../services/EventService';
// import { GetAllVolunteers } from '../../services/VolunteerService';
// import Event from '../Event/Event';

// const User = () => {
//     const [user, setUser] = useState(null);
//     const userProfile = JSON.parse(localStorage.getItem("userProfile"));
//     const [organizedEvents, setOrganizedEvents] = useState([]);
//     const [volunteerEvents, setVolunteerEvents] = useState([]);
//     const [pastEvents, setPastEvents] = useState([]);
//     const [activeTab, setActiveTab] = useState('organized'); // State for active tab
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (userProfile && userProfile.id) {
//             fetchUser();
//             fetchEvents();
//         }
//     }, []);

//     const fetchUser = async () => {
//         try {
//             const userData = await GetUserById(userProfile.id);
//             setUser(userData);
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//         }
//     };

//     const fetchEvents = async () => {
//         try {
//             const allEvents = await GetAllEvents();
//             const signups = await GetAllVolunteers();
//             const userId = userProfile.id;

//             const organized = allEvents.filter(event => event.userId === userId);
//             const volunteer = allEvents.filter(event => 
//                 signups.some(signup => signup.eventId === event.id && signup.userId === userId)
//             );
//             const past = allEvents.filter(event => 
//                 new Date(`${event.eventDate.split('T')[0]} ${event.endTime}`) < new Date() &&
//                 (organized.some(orgEvent => orgEvent.id === event.id) || 
//                  volunteer.some(volEvent => volEvent.id === event.id))
//             );

//             setOrganizedEvents(organized);
//             setVolunteerEvents(volunteer);
//             setPastEvents(past);
//         } catch (error) {
//             console.error("Error fetching events:", error);
//         }
//     };

//     if (!userProfile || !userProfile.id) {
//         return <div>Please log in to view your profile.</div>;
//     }

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     const renderEventCards = (events) => (
//         events.map(event => (
//             <Event
//                 key={event.id}
//                 image={event.eventPicture ? `https://localhost:5001/${event.eventPicture}` : "path/to/default/image.jpg"}
//                 name={event.name}
//                 date={new Date(event.eventDate).toLocaleDateString()}
//                 time={`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
//                 organizerImage={event.organizerImage ? `https://localhost:5001/${event.organizerImage}` : "path/to/default/image.jpg"}
//                 organizerName={event.organizerName}
//                 onClick={() => handleEventClick(event.id)}
//             />
//         ))
//     );

//     const handleEventClick = (id) => {
//         navigate(`/events/${id}`);
//     };

//     const formatTime = (timeString) => {
//         const [hours, minutes] = timeString.split(':').map(Number);
//         const formattedHours = hours % 12 || 12;
//         const ampm = hours < 12 ? 'AM' : 'PM';
//         return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
//     };

//     return (
//         <div className='user-profile'>
//             <div className='user-img-and-info'>
//                 <div className='user-image'>
//                     <img src={user.profileImage ? `https://localhost:5001/${user.profileImage}` : "https://localhost:5001/uploads/default.jpg"} alt={user.fullName} id="user-img" />
//                 </div>
//                 <div className='user-info'>
//                     <h2 id='user-name'>{user.fullName}</h2>
//                     <div className='user-details'>
//                         <p> <span>{user.email}</span></p>
//                         <p><span>{user.phoneNumber}</span></p>
//                         <p> <span>{user.city}, {user.state}</span></p>
                    
//                         <Link to={`/profile/${user.id}/edit`} className="btn btn-outline-primary mx-1 text-primary" title="Edit User">
//                             <EditPencil size={20} />
//                         </Link>
//                         <Link to={`/profile/${user.id}/delete`} className="btn btn-outline-danger mx-1" title="Delete User">
//                             <TrashcanDelete color="#b91c1c" size={20} />
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             <h3 className="my-events-label">My Events</h3>
//             <div className="tabs">
//                 <button onClick={() => setActiveTab('organized')} className={activeTab === 'organized' ? 'active' : ''}>Organized Events</button>
//                 <button onClick={() => setActiveTab('volunteer')} className={activeTab === 'volunteer' ? 'active' : ''}>Volunteer Events</button>
//                 <button onClick={() => setActiveTab('past')} className={activeTab === 'past' ? 'active' : ''}>Past Events</button>
//             </div>
//             {/* <div className='user-events'> */}
//             <div className="my-profile-event-list">
//             <div className="eventListContainer">{activeTab === 'organized' && (organizedEvents.length > 0 ? renderEventCards(organizedEvents) : <p>No organized events found.</p>)}
//                 {activeTab === 'volunteer' && (volunteerEvents.length > 0 ? renderEventCards(volunteerEvents) : <p>No volunteer events found.</p>)}
//                 {activeTab === 'past' && (pastEvents.length > 0 ? renderEventCards(pastEvents) : <p>No past events found.</p>)}
//                 </div>
//                 </div>
//             {/* </div> */}
//         </div>
//     );
// };

// export default User;






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

    if (!userProfile || !userProfile.id) {
        return <div>Please log in to view your profile.</div>;
    }

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
