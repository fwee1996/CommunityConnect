import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AddEvent, UpdateEvent, GetEventById } from "../../services/EventService";
import "./EventForm.css"

export const EventForm = () => {
  const { eventId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [numVolunteersNeeded, setNumVolunteersNeeded] = useState(0);
  const [volunteersDuties, setVolunteersDuties] = useState("");
  const [eventPicture, setEventPicture] = useState("");
  const [file, setFile] = useState(null); // State for selected file
  const [eventBeingEdited, setEventBeingEdited] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      GetEventById(eventId).then(event => {
        setName(event.name);
        setDescription(event.description);
        setEventDate(event.eventDate.split('T')[0]);
        setStartTime(event.startTime.split('.')[0]);
        setEndTime(event.endTime.split('.')[0]);
        setAddress(event.address);
        setCity(event.city);
        setState(event.state);
        setNumVolunteersNeeded(event.numVolunteersNeeded);
        setVolunteersDuties(event.volunteersDuties || "");
        setEventPicture(event.eventPicture || "");
        setEventBeingEdited(true);
      });
    }
  }, [eventId]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file
    setFile(selectedFile); // Set the selected file
  
    if (selectedFile) {
      setEventPicture(URL.createObjectURL(selectedFile)); // Create a local URL for preview
    } else {
      setEventPicture(""); // Clear preview if no file is selected
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  //if(eventBeingEdited) {const parsedEventId=JSON.parse(eventId)}
    // Prepare the event data
    const eventData = {
      ...(eventBeingEdited && { id: eventId }),
      name,
      description,
      eventDate: new Date(eventDate).toISOString(),
      // Check if editing or creating a new event for time formatting
      startTime: eventBeingEdited ? `${startTime}`: `${startTime}:00` ,
      endTime: eventBeingEdited ?  `${endTime}`: `${endTime}:00`,
      address,
      city,
      state,
      numVolunteersNeeded: parseInt(numVolunteersNeeded, 10),
      volunteersDuties,
      userId: userProfile.id,
      eventPicture: eventPicture,
    };
  
    // Error: singleEvent field require soln: eventData: eventData 
    const payload = eventBeingEdited ?  eventData: eventData ;

    try {
      // Handle image upload if file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadUrl = eventBeingEdited
          ? `https://localhost:5001/api/Event/upload?eventId=${eventId}` //edit event
          : `https://localhost:5001/api/Event/upload`; //new event
  
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) throw new Error("Image upload failed");
        const data = await response.json();
        eventData.eventPicture = data.filePath; // Add the uploaded image path
      }
  
      const eventAction = eventBeingEdited ? UpdateEvent(eventId, payload) : AddEvent(payload);
      await eventAction;

     // Redirect to the event's details page after successful update
     if (eventBeingEdited) {
      navigate(`/events/${eventId}`); //if updated event
    } else {
      navigate(`/events`); //if added new event
    }
  } catch (error) {
    console.error("Error saving event:", error);
  }
};
  
  //note : div className="form-group", input className="form-control"
  return (
    <div className="event-form-background">
    <form onSubmit={handleSubmit} className="form" >
     
      <div className="title-and-line-container">
        <div>
      <h2 >{eventBeingEdited ?  "Update":"Organize"}</h2>
      <h2>Event</h2>
      </div>
      <div className="vertical-line"></div>
      </div>

<div className="img-input-button-container">
      <div className="form-group">
  <label htmlFor="file"><strong>Event Picture:</strong> </label>
      <br/>
      
        <input
          type="file"
          onChange={handleFileChange} // Directly handle file change here
          required={!eventBeingEdited} // Make it required for new events
        />
    {eventBeingEdited ? (
      // If editing, show existing picture or new preview, but new preview doesn't work..yet
      eventPicture ? (
        <img src={eventPicture.startsWith("http") ? eventPicture : `https://localhost:5001/${eventPicture}`} alt="Event" className="image-preview" />
      ) : (
        <p>No image available</p> // Optional message if no image exists in the database
      )
    ) : (
      // If creating a new event, show new preview
      eventPicture && (
        <img src={eventPicture} alt="Event Preview" className="image-preview"/>
      )
    )}

      <br />
        {/* htmlFor should match id, id dont need to match value*/}
        <label htmlFor="event-title"><strong>Event Title:</strong> </label> 
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
          id="event-title"
        />     
     
      <label htmlFor="description"><strong>Description:</strong> </label> 
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
          id="description"
        />
        
      <label htmlFor="date"><strong>Date:</strong> </label> 
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
          className="form-control"
          id="date"
        />

      <label htmlFor="start-time"><strong>Start Time:</strong></label> 
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="form-control"
          id="start-time"
        />

         <label htmlFor="end-time"><strong>End Time: </strong></label> 
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="form-control"
           id="end-time"
        />
  
     <label htmlFor="address"><strong>Address: </strong></label> 
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="form-control"
          id="address"
        />
    
    <label htmlFor="city"><strong>City: </strong></label> 
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="form-control"
          id="city"
        />
     
     <label htmlFor="state"><strong>State: </strong></label>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="form-control"
          id="state"
        />
 
     <label htmlFor="num-volunteers-needed"><strong>Number of Volunteers Needed: </strong></label>
        <input
          type="number"
          placeholder="Volunteers Needed"
          value={numVolunteersNeeded}
          onChange={(e) => setNumVolunteersNeeded(e.target.value)}
          required
          className="form-control"
          id="num-volunteers-needed"
        />

    <label htmlFor="volunteer-duties"><strong>Volunteer Duties: </strong></label>
        <input
          type="text"
          placeholder="Volunteer Duties"
          value={volunteersDuties}
          onChange={(e) => setVolunteersDuties(e.target.value)}
          className="form-control"
          id="volunteer-duties"
        />
     </div>

    <div className="button-container">
      <button type="submit">
        {eventBeingEdited ? "Save Changes" : "Add Event"}
      </button>
      <button type="button" onClick={eventBeingEdited ?() => navigate(`/events/${eventId}`):() => navigate(`/events`)} className="btn btn-secondary">Cancel</button>
      </div>
      </div>
    </form>
    </div>
  );
};

