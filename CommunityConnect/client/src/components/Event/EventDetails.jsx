import React, { useState, useEffect } from 'react';
import { GetEventById } from '../../services/EventService';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Event.css';
import { EditPencil, TrashcanDelete } from "../../Icons";
import { GetVolunteersByEventId } from '../../services/VolunteerService'; // To check if user already signed up for event
import './EventDetails.css';
import { Label } from 'reactstrap';
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isSignedUp, setIsSignedUp] = useState(false);// To check if user already signed up for event
    const navigate = useNavigate();
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in based on the presence of userProfile so that non-logged in users can access details.
    

    useEffect(() => {
        fetchEventDetails();
        checkUserSignUp(); // Check sign-up status
        checkLoginStatus(); // Check if user is logged in
    }, [id]);

    const fetchEventDetails = async () => {
        const eventData = await GetEventById(id);
        setEvent(eventData);
    };

    const checkUserSignUp = async () => {
        if (!userProfile) return; // If not logged in, skip checking sign up
        const volunteers = await GetVolunteersByEventId(id);
        if (!Array.isArray(volunteers)) {
            console.error("Expected an array of volunteers, got:", volunteers);
            setIsSignedUp(false); 
            return;
        }
        //cant use .some on non array so checked above if its array
        const signedUp = volunteers.some(volunteer => volunteer.userId === userProfile.id);
        setIsSignedUp(signedUp);
    };


    // For non logged in user to see details too -- !!userProfile is true! vs userProfile is whole object whereas we want T/F value for setIsLoggedIn
    const checkLoginStatus = () => {
        setIsLoggedIn(!!userProfile);
    };
    
    const handleSignUpClick = () => {
        if (!isLoggedIn) {
            alert("You must be logged in to perform this action.");
            return;
        }

        if (isSignedUp) {
            alert("You have already signed up for this event."); // Show popup if already signed up
        } else {
            navigate(`/events/${event.id}/volunteer`); // Go to volunteer form to confirm sign up
        }
    };


    // For non logged in user gets msg that they cant contact org
    const handleContactClick = () => {
        if (!isLoggedIn) {
            alert("You must be logged in to perform this action.");
            return;
        }
        navigate(`/events/${event.id}/contact-organizer`);
    };



    if (!event) return <div>Loading...</div>;

    // For non logged in user can see details too
    const isCreator = event.userId === userProfile?.id; //for rendering edit and delete only for creator



    // To get Wednesday, Oct 24 for this year, and Wednesday, Oct 24 2025 for next year
    const formatDate = (eventDate) => {
        const date = new Date(eventDate); // Create a Date object from the event date
        const currentYear = new Date().getFullYear(); // Get the current year
    
        // Check if the event year is the current year
        if (date.getFullYear() === currentYear) {
            // If it's the current year, return the formatted date without the year
            const options = { 
                weekday: 'long', // Full name of the weekday (e.g., "Wednesday")
                month: 'long',   // Full name of the month (e.g., "October")
                day: 'numeric'   // Numeric day of the month (e.g., "24")
            };
            return date.toLocaleDateString(undefined, options); // Format and return the date
        } else {
            // If the event year is in the future or past, include the year
            const options = { 
                weekday: 'long', // Full name of the weekday (e.g., "Wednesday")
                month: 'long',   // Full name of the month (e.g., "October")
                day: 'numeric'   // Numeric day of the month (e.g., "24")
            };
            return `${date.toLocaleDateString(undefined, options)}, ${date.getFullYear()}`; // Format and return the date with the year
        }
    };

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


    // Share url:
    const shareUrl = `https://localhost:5173/events/${event.id}`;
    
    return (
        <div className="event-details">
           {/* <div
            className="detailsTop"
            style={{ backgroundImage: `url(https://localhost:5001/${event.eventPicture})` }}
        ></div> */}
             <div className="event-image">
                <img 
                    src={`https://localhost:5001/${event.eventPicture}`} 
                    alt={event.name}
                    
                />
                </div>

                <div className="event-details-content">
                {/* <p>{new Date(event.eventDate).toLocaleDateString()}</p> */}
                <p className="event-date">{formatDate(event.eventDate)}</p>

        {/* Share Buttons */}
        <div className="title-and-share-buttons-container">
    <h1 className="event-title">{event.name}</h1>
    <div className="share-buttons">
                    {/* <h3>Share this event:</h3> */}
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    {/* <WhatsAppShareButton url={shareUrl}>
                        <WhatsAppIcon size={32} round />
                    </WhatsAppShareButton> */}
                    <TwitterShareButton url={shareUrl}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <EmailShareButton url={shareUrl} subject={event.name} body={`Check out this event:`}>
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </div>
                </div>

    <p className="event-description">{event.description}</p>
    
    <label htmlFor="time" className="label"><strong>Time:</strong></label>
    <p id="time" className="input-field">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
    
    <label htmlFor="location" className="label"><strong>Location:</strong></label>
    <p className="input-field"><i className="fas fa-map-marker-alt"></i> {event.address}, {event.city}, {event.state}</p>
    
     {/* Embed Google Map */}
     {/* <div className="map-container">
            <iframe
                title="Google Map"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(`${event.address}, ${event.city}, ${event.state}`)}`}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div> */}

    <label htmlFor="volunteers" className="label"><strong>Volunteers Needed:</strong></label>
    <p className="input-field">{event.numVolunteersNeeded}</p>
    
    <label htmlFor="duties" className="label"><strong>Volunteer Duties:</strong></label>
    <p id="duties" className="input-field">{event.volunteersDuties || 'N/A'}</p>

    {/* Action Buttons -Edit/Delete*/}
            {!isCreator && (
                <>
                    <button onClick={handleSignUpClick} className="btn btn-primary" id="get-involved">
                        Get Involved!
                    </button>
                    <button onClick={handleContactClick} className="btn btn-primary" id="contact-organizer">
                    Contact Organizer
                </button>
                </>
            )}
            {isCreator && (
                <>
                    <Link to={`/volunteers/${event.id}`} className="btn btn-primary" id="volunteer-list">
                        View Volunteers
                    </Link>
                    <Link to={`/contact-forms/${event.id}`} className="btn btn-primary" id="contact-form-list">
                        View Contact Forms
                    </Link>
                    <Link to={`/events/${event.id}/edit`} className="btn btn-outline-primary mx-1 text-primary" title="Edit Event">
                        <EditPencil size={20} />
                    </Link>
                    <Link to={`/events/${event.id}/delete`} className="btn btn-outline-danger mx-1" title="Delete Event">
                        <TrashcanDelete color="#b91c1c" size={20} />
                    </Link>
                </>
            )}         
        </div>
    </div>
    );
};

export default EventDetails;




//location details:<iframe
{/* <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345097514!2d144.95373531531527!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11b4a3%3A0x5045675218ceed30!2sYOUR_LOCATION!5e0!3m2!1sen!2sus!4v1613990850718!5m2!1sen!2sus"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy">
</iframe> */}









