import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AddContactForm } from "../../services/ContactService";
import { GetEventById } from "../../services/EventService";
import { GetUserById } from '../../services/UserService';
import { sendContactNotification } from "../../services/NotificationService"; // For notification!
import "./ContactForm.css"

export default function ContactForm({ userProfile }) {
  const { eventId } = useParams();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  // const [organizerUserId, setOrganizerUserId] = useState("");
  const [organizerUserId, setOrganizerUserId] = useState(null); // Initialized as null
  const [inquirerName, setInquirerName] = useState(""); //

  // useEffect(() => {
  //   // Fetch event name and organizer name concurrently
  //   GetEventById(eventId).then(eventData => {
  //     setEventName(eventData.name);
  //     return GetUserById(eventData.userId);
  //   }).then(organizer => {
  //     setOrganizerName(organizer.fullName);
  //     // setOrganizerUserId(organizer.id);
  //     setOrganizerUserId(parseInt(organizer.id)); // Check it's a number
  //   });
  // }, [eventId]);



  useEffect(() => {
    GetEventById(eventId).then(eventData => {
        setEventName(eventData.name);
        return GetUserById(eventData.userId);
    }).then(organizer => {
        console.log("Organizer data:", organizer); 
        setOrganizerName(organizer.fullName);
            setOrganizerUserId(parseInt(organizer.id)); 
        
    });
}, [eventId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    console.log("User Profile:", userProfile);
    
    const parsedEventId=JSON.parse(eventId);

    const inquirerName= userProfile.fullName; 

    const newContactForm = {
      submissionDate: new Date().toISOString(),
      subject: subject,
      message: message,
      eventId:parsedEventId,
      userId: userProfile.id,
    };

    await AddContactForm(newContactForm);

      // Check organizerUserId is the correct type (number)
    console.log("Organizer User ID before notification:", organizerUserId);
    console.log("Inquirer Name before notification:", inquirerName);
    console.log("User Profile ID before notification:", userProfile.id); 
    await sendContactNotification(userProfile.id, parsedEventId, eventName, inquirerName, organizerUserId);
//note:parsedEventId!

    navigate(`/events/${eventId}`);
   
  };

  return (
    <div className="contact-form-container">
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Contact Organizer</h1>
        <h2>{eventName}</h2>
        <h6>{organizerName}</h6>

        <div className="subject-and-msg-container">
        
        <label htmlFor="subject">Subject: </label>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

      
      <div>
        <label htmlFor="message" >Message:</label>
        <br/>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      </div>
     
      <div className="volunteer-form-btn-container">
      <button type="submit">Submit</button>
      <button type="button" onClick={() => navigate(`/events/${eventId}`)}>Cancel</button>
      </div>

      </div>
    </form>
    </div>
  );
}
