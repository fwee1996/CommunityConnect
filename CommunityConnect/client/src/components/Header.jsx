import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/cclogo3-removebg-preview.png';
import "./Header.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
         // Fetch unread notifications count from local storage
         const storedCount = localStorage.getItem("unreadCount");
         if (storedCount) {
             setUnreadCount(parseInt(storedCount, 10));
         }
 
         // Event listener for updating unread count
         const updateCount = () => {
             const newCount = parseInt(localStorage.getItem("unreadCount"), 10) || 0;
             setUnreadCount(newCount);
         };
 
         window.addEventListener('notificationAdded', updateCount);
 
         // Cleanup event listener on unmount--for updated count bubble
         return () => {
             window.removeEventListener('notificationAdded', updateCount);
         };
    }, []);

    const handleBellClick = () => {
        // Reset unread notifications count when bell is clicked
        setUnreadCount(0);
        localStorage.setItem("unreadCount", 0); // Store the reset count in local storage
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.clear(); // Clear user profile and other related data on logout
        navigate('/events');
    };

    return (
        <header>
            <nav>
                <div className='left-hand-side'>
                    <Link to="/events">
                        <img src={logo} width="350" height="50" alt="Community Connect" id="logo" />
                    </Link>
                </div>

                <div className='right-hand-side'>
                    {isLoggedIn ? (
                        <div>
                            <Link to="/events">Upcoming Events</Link>
                            <Link to="/organize-event">Organize Event</Link>
                            <Link to="/profile">My Profile</Link>

                            {/* Notification icon with unread count */}
                            <Link to="/notifications" onClick={handleBellClick} style={{ position: "relative" }}>
                                <i className="fas fa-bell"></i>
                                {unreadCount > 0 && <span className="notification-bubble">{unreadCount}</span>}
                            </Link>

                            {/* Logout button */}
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
