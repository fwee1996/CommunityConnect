// import React, { useState, useEffect } from 'react';
// import { GetAllEvents } from '../../services/EventService';
// import { useNavigate } from 'react-router-dom';
// import './Event.css';
// import { GetUserById } from '../../services/UserService';

// const EventList = () => {
//     const [events, setEvents] = useState([]);
//     const navigate = useNavigate();
//     const [searchTerm, setSearchTerm] = useState(''); // Search filter
//     const [locationFilter, setLocationFilter] = useState('');
//     const [cityFilter, setCityFilter] = useState('');
//     const [stateFilter, setStateFilter] = useState('');
//     const [nearbyEvents, setNearbyEvents] = useState(false);

//     useEffect(() => {
//         GetAllEvents().then(allEvents => {
//             const eventsWithOrganizers = allEvents.map(event => {
//                 return GetUserById(event.userId).then(organizer => ({
//                     ...event,
//                     organizerName: organizer.fullName 
//                 }));
//             });
//             return Promise.all(eventsWithOrganizers);
//         }).then(eventsWithOrganizers => {
//             setEvents(eventsWithOrganizers);
//         });
//     }, []);

//     const handleEventClick = (id) => {
//         navigate(`/events/${id}`);
//     };


//     // Filter events based on search term that includes name, description and
//     // To filter by any combination of fields: city only, state only, both, or neither: ---return true:
//     const filteredEvents = events.filter(event => {
//         // Get user profile data from local storage
//         const userProfile = JSON.parse(localStorage.getItem("userProfile"));


//     // Check if the event date and time are in the future
//     const isUpcoming = new Date(`${event.eventDate.split('T')[0]} ${event.startTime}`) >= new Date();

//     // Check if the event matches the search term in its name or description
//     const matchesSearch = searchTerm 
//         ? event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//         event.description.toLowerCase().includes(searchTerm.toLowerCase())
//         : true; // If no search term, consider it true
                        
//     // Check if the event's city matches the city filter, if provided
//     const matchesCity = cityFilter 
//         ? event.city.toLowerCase() === cityFilter.toLowerCase() 
//         : true; // If no city filter, consider it true
                        
//     // Check if the event's state matches the state filter, if provided
//     const matchesState = stateFilter 
//         ? event.state.toLowerCase() === stateFilter.toLowerCase() 
//         : true; // If no state filter, consider it true
                        
//     // Check if the event is marked as "Nearby" based on user's city and state
//     const matchesNearby = nearbyEvents 
//         ? event.city.toLowerCase() === userProfile.city.toLowerCase() && 
//         event.state.toLowerCase() === userProfile.state.toLowerCase()
//         : true; // If not looking for nearby events, consider it true
                        
//     // Return true if all conditions are met
//     return isUpcoming && matchesSearch && matchesCity && matchesState && matchesNearby;
//         });
        
//     return (
//         <div className="event-list">
//             {/* Search Input */}
//             <input
//                 type="text"
//                 placeholder="Search events..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
//             />
            
//             {/* city Filter */}
//             <input
//                 type="text"
//                 placeholder="Filter by city..."
//                 value={cityFilter}
//                 onChange={(e) => setCityFilter(e.target.value)} // Update location filter on input change
//             />

//             <input
//                 type="text"
//                 placeholder="Filter by state..."
//                 value={stateFilter}
//                 onChange={(e) => setStateFilter(e.target.value)}
//             />
//             <label>
//                 <input
//                     type="checkbox"
//                     checked={nearbyEvents}
//                     onChange={() => setNearbyEvents(!nearbyEvents)} // Toggle nearby events
//                 />
//                 Nearby Events
//             </label>

//             {/* instead of events.map its filteredEvents.map */}
//             {/* //filteredEvents? */}
//             {filteredEvents.map(event => (
//                 <div className="event-card" key={event.id} onClick={() => handleEventClick(event.id)}>
//                     {/* since this is working fetching from backend works fine */}
//                     <img src={event.eventPicture ? `https://localhost:5001/${event.eventPicture}` : "path/to/default/image.jpg"} alt={event.name} />
//                     <h3>{event.name}</h3>
//                     <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
//                     <p>Time: {`${event.startTime} - ${event.endTime}`}</p>
//                     <p>Organizer: {event.organizerName}</p>
//                 </div>
//             ))}
            
//         </div>
//     );
// };

// export default EventList;


































//this works:
import React, { useState, useEffect } from 'react';
import { GetAllEvents } from '../../services/EventService';
import { useNavigate } from 'react-router-dom';
import './EventList.css';
import { GetUserById } from '../../services/UserService';
import Event from './Event'; // Import the new Event component

const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [nearbyEvents, setNearbyEvents] = useState(false);

    useEffect(() => {
        GetAllEvents().then(allEvents => {
            const eventsWithOrganizers = allEvents.map(event => {
                return GetUserById(event.userId).then(organizer => ({
                    ...event,
                    organizerName: organizer.fullName,
                    organizerImage: organizer.profileImage

                }));
            });
            return Promise.all(eventsWithOrganizers);
        }).then(eventsWithOrganizers => {
            setEvents(eventsWithOrganizers);
        });
    }, []);

    const handleEventClick = (id) => {
        navigate(`/events/${id}`);
    };

    const filteredEvents = events.filter(event => {
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        const isUpcoming = new Date(`${event.eventDate.split('T')[0]} ${event.startTime}`) >= new Date();
        const matchesSearch = searchTerm ? event.name.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        //exact match search (===)
        //const matchesCity = cityFilter? event.city.toLowerCase() === cityFilter.toLowerCase() : true;
        //partial match search "city filtering" so when i type "hun" matches appear for huntington: (.includes)
        const matchesCity = cityFilter
        ? event.city.toLowerCase().includes(cityFilter.toLowerCase()) // Change equality to includes for partial matches
        : true;

        const matchesState = stateFilter ? event.state.toLowerCase().includes(stateFilter.toLowerCase()) : true;
        const matchesNearby = nearbyEvents  && userProfile ? event.city.toLowerCase().includes(userProfile.city.toLowerCase()) && event.state.toLowerCase() === userProfile.state.toLowerCase() : true;

        return isUpcoming && matchesSearch && matchesCity && matchesState && matchesNearby;
    });

      // Utility function to format time from HH:mm:ss to h:mm AM/PM
       const formatTime = (timeString) => {   // Split the input time string (e.g., "14:30:00") into its components
        // The expected format is HH:mm:ss

        const [hours, minutes] = timeString.split(':').map(Number);
          // Convert hours from 24-hour format to 12-hour format
    // The expression hours % 12 converts the hours:
    // 0 (midnight) becomes 12, 1-11 remain the same, 
    // 12 remains 12, and 13-23 convert to 1-11 respectively.

        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        // Handle midnight (0) as 12

    // Determine whether the time is AM or PM
    // If hours are less than 12, it's AM; otherwise, it's PM

        const ampm = hours < 12 ? 'AM' : 'PM'; // Determine AM/PM

        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`; // Format and return
          // Return the formatted time as a string in the format "h:mm AM/PM"
    // minutes.toString().padStart(2, '0') ensures minutes are always two digits (e.g., "05" instead of "5")
    };

    return (
        <div className="event-list">
            <h1 className="eventTitle">Upcoming Events</h1>
            
             {/* Search and filter controls */}
        <div className="filter-container">
            <div className="filter-search-city-state">
        <div className="search-container">
            <input
                type="text"
                placeholder="&#128269;Search events"/* Magnifying glass icon */
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            /> 
        </div>

            <input
                type="text"
                placeholder="City"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="State"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
            />
            </div>
              <label>
                <input
                    type="checkbox"
                    checked={nearbyEvents}
                    onChange={() => setNearbyEvents(!nearbyEvents)}
                />
                <i className="fas fa-map-marker-alt"></i> Nearby Events 
            </label>
            </div>
          

            <div className="eventListContainer">
            {filteredEvents.length === 0 ? ( // Check if there are no matching events
                <p>No events found.</p>
            ) : (filteredEvents.map(event => (
                    <Event
                        key={event.id}
                        image={event.eventPicture ? `https://localhost:5001/${event.eventPicture}` : "path/to/default/image.jpg"}
                        name={event.name}
                        date={new Date(event.eventDate).toLocaleDateString()}
                        time={`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`} // Format times here for 2:00pm-3:00pm
                        // time={`${event.startTime} - ${event.endTime}`} //
                        organizerImage={event.organizerImage? `https://localhost:5001/${event.organizerImage}` : "path/to/default/image.jpg"}
                        organizerName={event.organizerName}
                        onClick={() => handleEventClick(event.id)}
                    />
                ))
            )}
            </div>
        </div>
    );
};

export default EventList;

