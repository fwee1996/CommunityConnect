import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GetVolunteersByEventId } from "../../services/VolunteerService";
import { GetEventById } from "../../services/EventService";
import Volunteer from "./Volunteer";
import { GetUserById } from '../../services/UserService';
import './VolunteerList.css';


export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const { eventId } = useParams();
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        // Fetch volunteers for the event
        const response = await GetVolunteersByEventId(eventId);

        // If no volunteers exist, response will be an empty array 
        //RMBR TO INCLD THAT LOGIC IN BACKEND:
        // if ( volunteerSignup == null || !volunteerSignup.Any())
        //   {
        //       // Return an empty array if no volunteers are found
        //       return Ok(new List<VolunteerSignup>());
        //   }
        if (response.length === 0) {
          setVolunteers([]);  // Set an empty array when no volunteers are found
        } else {
          setVolunteers(response);  // Set volunteers when data is found
          
          // Fetch user details for each volunteer if any exist
          const volunteersWithUserDetails = await Promise.all(
            response.map(async (volunteer) => {
              const user = await GetUserById(volunteer.userId);
              return { ...volunteer, user };
            })
          );
          setVolunteers(volunteersWithUserDetails);
        }

        // Fetch event name
        const eventData = await GetEventById(eventId);
        setEventName(eventData.name);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVolunteers();
  }, [eventId]);

  return (
    <div className="volunteer-list-container" >
      <div  id="container-vol">
        <div  id="all-vol">
          {/* make event name clickable to go back to event details */}
          <h1 className="p-4"> All Volunteers for 
            <Link 
                  to={`/events/${eventId}`} 
                  style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }} 
                  onMouseEnter={(e) => e.target.style.color = 'blue'}
                  onMouseLeave={(e) => e.target.style.color = 'black'}
                >
                    {eventName}
            </Link>
         </h1>
        </div>

        {/* If no volunteers, show a custom message */}
        {volunteers.length === 0 ? (
          <div className="content">
            <h2>No volunteers for this event yet. </h2>
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Comment</th>
                <th>Signup Date</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((singleVolunteer) => (
                <tr key={singleVolunteer.id}>
                  <Volunteer singleVolunteer={singleVolunteer} />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
