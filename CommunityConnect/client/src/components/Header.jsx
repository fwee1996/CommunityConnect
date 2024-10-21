// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css'; // Import the CSS file
// import { GetNotificationsByUserId } from '../services/NotificationService';

// export default function Header({ isLoggedIn, setIsLoggedIn }) {
//   const [notifications, setNotifications] = useState([]);
//   const [hasNewNotifications, setHasNewNotifications] = useState(false);


//   useEffect(() => {
//     const fetchNotifications = async () => {
//         // Check if userProfile exists in localStorage
//         const userProfile = JSON.parse(localStorage.getItem("userProfile"));
// console.log("User Profile:" , userProfile);
//         const userId = parseInt(userProfile.id);
//         console.log(userId);
//         const notifications=GetNotificationsByUserId(userId);
//         setNotifications(notifications);
//         // try {
//         //     const response = await fetch(`/api/notification/${userId}`);
//         //     if (!response.ok) {
//         //         throw new Error("Failed to fetch notifications");
//         //     }
//         //     const data = await response.json();
//         //     setNotifications(data);

//         //     // Check for unread notifications
//         //     setHasNewNotifications(data.some(notification => !notification.isRead));
//         // } catch (error) {
//         //     console.error("Error fetching notifications:", error);
//         // }
//     };

//     fetchNotifications();
// }, []);



//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.clear(); // Clear user profile on logout
//   };

//   return (
//     <header>
//       <nav>
//         <Link to="/events">Home</Link>
//         {isLoggedIn ? (
//           <>
//             <Link to="/events">Events</Link>
//             <Link to="/organize-event">Organize Event</Link>
//             <Link to="/profile">My Profile</Link>
//             <Link to="/my-events">My Events</Link>
//             <Link to="/notifications/" className="notification-icon">
//                 <i className="fas fa-bell"></i>
//                 {hasNewNotifications && <span className="notification-bubble">!</span>}
//             </Link>
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }












import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/cclogo3-removebg-preview.png';
import "./Header.css"

export default function Header({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.clear(); // Clear user profile when logout
        navigate('/events');
    };
    
    return (
        <header>
            <nav>
                <div className='left-hand-side'>
                <Link to="/events"><img src={logo} width="350" height="50" alt="Community Connect" id="logo"/>
                </Link>
                </div>

                <div className='right-hand-side'>
                {isLoggedIn ? (
                    <>
                        <Link to="/events">Upcoming Events</Link>
                        <Link to="/organize-event">Organize Event</Link>
                        <Link to="/profile">My Profile</Link>
                        {/* <Link to="/my-events">My Events</Link> */}

                        {/* Notification icon */}
                        <Link to="/notifications" className="notification-icon">
                            <i className="fas fa-bell"></i>
                            {/* {hasNewNotifications && <span className="notification-bubble">!</span>} */}
                        </Link>

                        {/* Logout button */}
                        <button onClick={handleLogout}>Logout</button>
                    </>
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

