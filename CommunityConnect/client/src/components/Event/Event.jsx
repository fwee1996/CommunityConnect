import React from 'react';
import './Event.css'; // Ensure you have styles defined here

const Event = ({ image, name, date, time, organizerName, organizerImage, onClick }) => {
    return (
        <div className="event" onClick={onClick}>
            <div className="eventImage" style={{ backgroundImage: `url(${image})` }}></div>
            {/* <img src={image} alt={name} className="eventImage" /> */}

            <div className="eventDetails">
                <h3>{name}</h3>
                <div className="eventMeta">
                    <div className="eventDate">
                        <i className="far fa-calendar-alt"></i> {/* Calendar icon */}
                        <span>{date}</span>
                    </div>
                    <div className="eventTime">
                        <i className="far fa-clock"></i> {/* Clock icon */}
                        <span>{time}</span>
                    </div>
                    <div className="eventOrganizer">
                        {organizerImage && <img src={organizerImage} className="organizerImage" />}
                        <span>{organizerName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
