// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { GetUserById, DeleteUser } from "../../services/UserService";

// export const UserDelete = () => {
//     const { userId } = useParams();
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         GetUserById(userId).then(data => {
//             setUser(data);
//         })
//     }, [userId]);

//     const handleDelete = () => {
//         DeleteUser(userId).then(() => {
//             navigate(`/user/${userId}`);
//         });
//     };

//     if (!user) {
//         return <p>No users to show</p>; 
//     }

//     return (
//         <div>
//             <h2>Delete User</h2>
//             <p>Are you sure you want to delete the following user?</p>
//             <h1>{user.fullName}</h1>
//             <img src={user.profileImage} alt={user.fullName} />
//             <p>phoneNumber: {user.phoneNumber}</p>
//             <p>email: {user.email}</p>
//             <p>Location: {user.city}, {user.state}</p>
    
//             <button onClick={handleDelete} className="btn btn-danger">Delete</button>
//             <button onClick={() => navigate(`/users/${userId}`)} className="btn btn-secondary">Cancel</button>
//         </div>
//     );
// };




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetUserById, DeleteUser } from "../../services/UserService";
import { GetEventsByUserId, DeleteEventsByUserId } from "../../services/EventService";
import Modal from './Modal';
import "./UserDelete.css"

export const UserDelete = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        GetUserById(userId).then(data => {
            setUser(data);
        });
        GetEventsByUserId(userId).then(eventData => {
            console.log("Fetched events:", eventData); // Make sure array of events
            // setEvents(eventData);
            setEvents(Array.isArray(eventData) ? eventData : []);
        });
    }, [userId]);

    const handleDelete = () => {
        // First delete all events associated with the user
        DeleteEventsByUserId(userId).then(() => {
            // Then delete the user
            DeleteUser(userId).then(() => {
                navigate(`/events`); // Navigate after deletion
            });
        });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (!user) {
        return <p>No users to show</p>; 
    }

    return (
        <div className="delete-container">
            <h2>Delete Profile</h2>
            <p id="delete-alert-msg">Are you sure you want to delete your profile?</p>
            <h1 id="delete-profile-fullName">{user.fullName}</h1>
            <img src={`https://localhost:5001/${user.profileImage}`} style={{ width: "200px", height: "auto" }} alt={user.fullName}/>
            <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Location: </strong>{user.city}, {user.state}</p>
    
            <button onClick={handleOpenModal} className="btn btn-danger">Delete</button>
            <button onClick={() => navigate(`/profile`)} className="btn btn-secondary">Cancel</button>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleDelete}
                eventNames={events} // Pass event names to modal
            />
        </div>
    );
};




