import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AddVolunteer } from "../../services/VolunteerService";
import { GetEventById } from "../../services/EventService";
import { GetUserById } from '../../services/UserService';
import { sendNotification } from "../../services/NotificationService";
import"./VolunteerForm.css"

export default function VolunteerForm() {
  const { eventId } = useParams();
  const [comment, setComment] = useState("");
  const [eventName, setEventName] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerUserId, setOrganizerUserId] = useState(null); // Use null instead of "" if its userId, not user input
  const navigate = useNavigate();

  useEffect(() => {
    GetEventById(eventId).then(eventData => {
      setEventName(eventData.name);
      return GetUserById(eventData.userId);
    }).then(organizer => {
      setOrganizerName(organizer.fullName);
      setOrganizerUserId(organizer.id); // Set the organizer's user ID
    });
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    // For notification msg to have "(volunteer name) has signed up..""
    // Use variable dont need to set state
    const volunteerName= userProfile.fullName; // Use a local variable instead of just setVolunteerName(userProfile.fullName) bcs state may not be immediately updated when you try to use it
    
    const newVolunteerForm = {
      signupDate: new Date().toISOString(),
      comment: comment,
      eventId: parseInt(eventId),
      userId: userProfile.id
    };

    // Summary of where i get params:
    // userId from local storage "userProfile", eventId from Url, the rest from state set at the start const[...]=useState() 

    await AddVolunteer(newVolunteerForm);

      // Increment unread notification count
  let unreadCount = parseInt(localStorage.getItem("unreadCount"), 10) || 0;
  unreadCount += 1;
  localStorage.setItem("unreadCount", unreadCount);

  
   // Dispatch custom event --for updated count bubble--only these lines added for making sure bubble goes away when you press but increments properly when new notification added
   const event = new Event('notificationAdded');
   window.dispatchEvent(event);


    // Send notifications --params from state look at const [eventName, ..], const [organizerName, ..],
    await sendNotification(userProfile.id, eventId, eventName, volunteerName, organizerUserId);

    alert("Thank you for volunteering! Your contribution is key to this event’s success. See you soon!");

    navigate(`/events/${eventId}`);
  };

  return (
    <div className="volunteer-form-container">
    <form onSubmit={handleSubmit}>
      <div>
      <h3>Thank you for your interest.</h3>
        <h1>Sign up to Volunteer!</h1>
        <h2>{eventName}</h2>
        <h6>{organizerName}</h6>

      </div>
      <div className="comment-container">
        <label htmlFor="comment"><strong>Comments: </strong></label>
        <textarea
          placeholder="Preferences or restrictions"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="volunteer-form-btn-container">
      <button type="submit">Sign me up!</button>
      <button type="button" onClick={() => navigate(`/events/${eventId}`)}>Cancel</button>
      </div>
    </form>
    </div>
  );
}
