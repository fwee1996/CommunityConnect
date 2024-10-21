// import React, { useState, useEffect } from 'react';
// import { GetAllEvents } from '../../services/EventService';
// import { GetAllVolunteers } from '../../services/VolunteerService';
// import './MyEvents.css';

// const MyEvents = () => {
//     const [organizedEvents, setOrganizedEvents] = useState([]);
//     const [volunteerEvents, setVolunteerEvents] = useState([]);
//     const [pastEvents, setPastEvents] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const allEvents = await GetAllEvents();
//             const signups = await GetAllVolunteers();
//             const userId = JSON.parse(localStorage.getItem("userProfile")).id;
    
//             // Categorize events
//             const organizedEvents = allEvents.filter(event => event.userId === userId);
//             const volunteerEvents = allEvents.filter(event => 
//                 signups.some(signup => signup.eventId === event.id && signup.userId === userId)
//             );

//             // Filter past events (date and time ended before now) that are either organized or volunteered
//             const pastEvents = allEvents.filter(event => new Date(`${event.eventDate.split('T')[0]} ${event.endTime}`) < new Date())
//                 .filter(event => 
//                     organizedEvents.some(orgEvent => orgEvent.id === event.id) || 
//                     volunteerEvents.some(volEvent => volEvent.id === event.id)
//                 );
    
//             setOrganizedEvents(organizedEvents);
//             setVolunteerEvents(volunteerEvents);
//             setPastEvents(pastEvents);
//         };
    
//         fetchData();
//     }, []);
    

//     return (
//         <div>
//             <h2>My Events</h2>

//             <h3>Organized Events</h3>
//             <div className="event-card" key={event.id} onClick={() => handleEventClick(event.id)}></div>
//             {organizedEvents.length > 0 ? (
//                 organizedEvents.map(event => (
//                     <div key={event.id}>
//                         <h4>{event.name}</h4>
//                         <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No organized events found.</p>
//             )}

//             <h3>Volunteer Events</h3>
//             {volunteerEvents.length > 0 ? (
//                 volunteerEvents.map(event => (
//                     <div key={event.id}>
//                         <h4>{event.name}</h4>
//                         <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No volunteer events found.</p>
//             )}

//             <h3>Past Events</h3>
//             {pastEvents.length > 0 ? (
//                 pastEvents.map(event => (
//                     <div key={event.id}>
//                         <h4>{event.name}</h4>
//                         <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No past events found.</p>
//             )}
//         </div>
//     );
// };

// export default MyEvents;




//this works: but i no longer want my events
// import React, { useState, useEffect } from 'react';
// import { GetAllEvents } from '../../services/EventService';
// import { GetAllVolunteers } from '../../services/VolunteerService';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
// import './MyEvents.css';
// import Event from './Event'; // Import the Event component for consistent styling

// const MyEvents = () => {
//     const [organizedEvents, setOrganizedEvents] = useState([]);
//     const [volunteerEvents, setVolunteerEvents] = useState([]);
//     const [pastEvents, setPastEvents] = useState([]);
//     const navigate = useNavigate(); // Initialize navigate

//     useEffect(() => {
//         const fetchData = async () => {
//             const allEvents = await GetAllEvents();
//             const signups = await GetAllVolunteers();
//             const userId = JSON.parse(localStorage.getItem("userProfile")).id;

//             // Categorize events
//             const organizedEvents = allEvents.filter(event => event.userId === userId);
//             const volunteerEvents = allEvents.filter(event => 
//                 signups.some(signup => signup.eventId === event.id && signup.userId === userId)
//             );

//             // Filter past events
//             const pastEvents = allEvents.filter(event => 
//                 new Date(`${event.eventDate.split('T')[0]} ${event.endTime}`) < new Date() &&
//                 (organizedEvents.some(orgEvent => orgEvent.id === event.id) || 
//                  volunteerEvents.some(volEvent => volEvent.id === event.id))
//             );

//             setOrganizedEvents(organizedEvents);
//             setVolunteerEvents(volunteerEvents);
//             setPastEvents(pastEvents);
//         };

//         fetchData();
//     }, []);

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
//         <div>
//              <div className="event-list">
//             <h1 className="my-events-eventTitle">My Events</h1>
          
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
//     );
// };

// export default MyEvents;
