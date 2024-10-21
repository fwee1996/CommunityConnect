import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetEventById, DeleteEvent } from "../../services/EventService";
import "./EventDelete.css"

export const EventDelete = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        GetEventById(eventId).then(data => {
            setEvent(data);
        })
    }, [eventId]);

    const handleDelete = () => {
        DeleteEvent(eventId).then(() => {
            navigate(`/events`);
        });
    };

    if (!event) {
        return <p>No events to show</p>; 
    }

  // Utility function to format time from HH:mm:ss to h:mm AM/PM
  const formatTime = (timeString) => {   
    const [hours, minutes] = timeString.split(':').map(Number);
    const formattedHours = hours % 12 || 12; 
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`; 
};

    return (
        <div className="delete-container">
            <h2>Delete Event</h2>
            <p id="delete-alert-msg">Are you sure you want to delete the following event?</p>
            <h1 id="delete-event-name">{event.name}</h1>
            <img src={`https://localhost:5001/${event.eventPicture}`} style={{ width: "200px", height: "auto" }} alt={event.name}/>    
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Date:</strong>  {new Date(event.eventDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong>  {`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}</p>
            <p><strong>Location: </strong> {event.address}, {event.city}, {event.state}</p>
            <p><strong>Volunteers Needed:</strong>  {event.numVolunteersNeeded}</p>
            <p><strong>Volunteer Duties: </strong> {event.volunteersDuties || 'N/A'}</p>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            <button onClick={() => navigate(`/events/${eventId}`)} className="btn btn-secondary">Cancel</button>
        </div>
    );
};

