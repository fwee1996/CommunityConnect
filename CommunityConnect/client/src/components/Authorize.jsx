import React from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './Login'; 
import Register from './Register'
import EventList from "./Event/EventList";
import EventDetails from "./Event/EventDetails";



export default function Authorize({setIsLoggedIn}) {

    return(
         <Routes>
         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
         <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
         {/* <Route path="*" element={<Navigate to="/login" />} /> */}
         <Route path="/" element={<Navigate to="/events" />}/>
         <Route path="*" element={<Navigate to="/events" />} />
         <Route path="/events" element={<EventList />}/>
         <Route path="/events/:id" element={<EventDetails />} />
         
         </Routes>
      );
    
   }