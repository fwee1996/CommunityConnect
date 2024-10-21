// // Event.js
// import React from 'react';
// import './Event.css'; // Create this CSS file for Event styles

// const Event = ({ image, name, date, time, organizerImage, organizerName, onClick }) => {
//     return (
//         <div className="event" onClick={onClick}>
//             <div style={{ backgroundImage: `url(${image})` }}></div>
//             <h3>{name}</h3>
//             <p>Date: {date}</p>
//             <p>Time: {time}</p>
//             <p>Organizer: {organizerName}</p>
//         </div>
//     );
// };

// export default Event;



// Event.js
import React from 'react';
import './Event.css'; // Ensure you have styles defined here

const Event = ({ image, name, date, time, organizerName, organizerImage, onClick }) => {
    return (
        <div className="event" onClick={onClick}>
            <div className="eventImage" style={{ backgroundImage: `url(${image})` }}></div>
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
