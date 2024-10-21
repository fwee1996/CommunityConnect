import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EventList from './components/Event/EventList'; 
import EventDetails from './components/Event/EventDetails'; 
// import HomePage from './Homepage';
import VolunteerList from './components/Volunteer/VolunteerList';
import ContactList from './components/Contact/ContactList';
import ContactForm  from './components/Contact/ContactForm';
import VolunteerForm from './components/Volunteer/VolunteerForm';
import { EventDelete } from './components/Event/EventDelete';
import { EventForm } from './components/Event/EventForm';
import User from './components/User/User';
import { UserForm } from './components/User/UserForm';
import { UserDelete } from './components/User/UserDelete';
// import MyEvents from './components/Event/MyEvents';
import Notification from './components/Notification/Notification';

const ApplicationViews = ({ isLoggedIn }) => {
  return (
    <Routes>
      {/* Allow access to events and details for everyone */}
       <Route path="/events" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetails />} />

      {/* Protected routes */}
      {isLoggedIn ? (
        <> 
      {/* <Route path="/" element={<HomePage />} /> */}
      {/* <Route path="/events" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetails />} /> */}
      <Route path="/volunteers/:eventId" element={<VolunteerList/>} />
      <Route path="/contact-forms/:eventId" element={<ContactList/>} />
      <Route path="/events/:eventId/contact-organizer" element={<ContactForm/>} />
      <Route path="/events/:eventId/volunteer" element={<VolunteerForm/>} />
      <Route path="/organize-event" element={<EventForm />} />
      <Route path="/events/:eventId/delete" element={<EventDelete />} />
       <Route path="/events/:eventId/edit" element={<EventForm />} />
       {/* <Route path="/profile/:userId" element={<User />} /> */}
       <Route path="/profile" element={<User />} />
       <Route path="/profile/:userId/edit" element={<UserForm />} />
       <Route path="/profile/:userId/delete" element={<UserDelete />} />
       {/* <Route path="/my-events" element={<MyEvents />} /> */}
       <Route path="/notifications" element={<Notification />} />

       </>) : (
        // Redirect if not logged in
        <Navigate to="/events" />
      )}
    </Routes>
  );
};

export default ApplicationViews;
