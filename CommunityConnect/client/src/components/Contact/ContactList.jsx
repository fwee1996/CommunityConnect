import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GetContactFormsByEventId } from "../../services/ContactService";
import { GetEventById } from "../../services/EventService";
import { GetUserById } from '../../services/UserService';
import Contact from "./Contact";
import "./ContactList.css";

export default function ContactList() {
  const { eventId } = useParams();
  const [contactForms, setContactForms] = useState([]);
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        // Fetch contact forms for the event
        const forms = await GetContactFormsByEventId(eventId);

        // If no contactForms exist, response will be an empty array
        if (forms.length === 0) {
          setContactForms([]);  // Set an empty array when no contactForms are found
        } else {

        setContactForms(forms);
        
        // Fetch the event name
        const eventData = await GetEventById(eventId);
        setEventName(eventData.name);

        // Fetch user details for each contact form
        const contactFormsWithUserDetails = await Promise.all(forms.map(async (form) => {
          const user = await GetUserById(form.userId);
          return { ...form, user }; // Include user data
        }));

        setContactForms(contactFormsWithUserDetails);
      
      }
      // Fetch event name
      const eventData = await GetEventById(eventId);
      setEventName(eventData.name);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchContactForms();
  }, [eventId]);

  return (
    <div className="contact-list-container" >
    <div id="container-contact">
    <div  id="all-contact">
        {/* make event name clickable to go back to event details */}
        <h1 className="p-4"> All Contact Forms for 
            <Link 
                  to={`/events/${eventId}`} 
                  style={{ textDecoration: 'none', color: 'inherit', marginLeft: '10px' }} 
                  onMouseEnter={(e) => e.target.style.color = 'blue'}
                  onMouseLeave={(e) => e.target.style.color = 'inherit'}
                >
                    {eventName}
            </Link>
         </h1>
      </div>


      {/* If no contactForms, show a custom message */}
      {contactForms.length === 0 ? (
          <div className="content">
            <h2>No Contact Forms for this event yet. </h2>
          </div>
        ) : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {contactForms.map((singleContactForm) => (
            <tr key={singleContactForm.id}>
              <Contact singleContactForm={singleContactForm} />
            </tr>
          ))}
        </tbody>
      </table>
        )}
    </div>
    </div>
  );
}
