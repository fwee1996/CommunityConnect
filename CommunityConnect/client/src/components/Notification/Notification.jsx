// import React, { useEffect, useState } from 'react';
// import "./Notification.css"

// const NotificationList = () => {//{ userId }
//     const [notifications, setNotifications] = useState([]);
//     const userProfile = JSON.parse(localStorage.getItem("userProfile"));
//     const userId = parseInt(userProfile.id, 10);
//     useEffect(() => {
//         const fetchNotifications = async () => {
//             const response = await fetch(`https://localhost:5001/api/notification/${userId}`); //make sure put which local host
//                 const data = await response.json();
//                 setNotifications(data);
//         };
//         fetchNotifications();
//     }, [userId]);

//     const markAsRead = async (notificationId) => {
//         const response = await fetch(`/api/notification/${notificationId}`, { method: 'PUT' });
//         if (response.ok) {
//             setNotifications(prev =>
//                 prev.map(notification => 
//                     notification.id === notificationId ? { ...notification, isRead: true } : notification
//                 )
//             );
//         }
//     };

// //     return (
// //         <div id="notification-container">
// //             <h2>Your Notifications</h2>
// //             {notifications.sort((a, b) => new Date(b.notificationDate) - new Date(a.notificationDate)).map(notification => (
// //                 <div key={notification.id} onClick={() => markAsRead(notification.id)} style={{ fontWeight: !notification.isRead ? 'bold' : 'normal' }}>
// //                     <p>{notification.message}</p>
// //                     <span>{new Date(notification.notificationDate).toLocaleString()}</span>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };



// // return (
// //     <div id="notification-container" className="libre-baskerville-regular">
// //         <h2 className="libre-baskerville-bold">Notifications</h2>
// //         <table className="notification-table">
// //             <thead>
// //                 <tr>
// //                     <th>Notification</th>
// //                     <th>Timestamp</th>
// //                 </tr>
// //             </thead>
// //             <tbody>
// //                 {notifications
// //                     .sort((a, b) => new Date(b.notificationDate) - new Date(a.notificationDate))
// //                     .map((notification, index) => (
// //                         <tr
// //                             key={notification.id}
// //                             onClick={() => markAsRead(notification.id)}
// //                             style={{ fontWeight: !notification.isRead ? 'bold' : 'normal' }}
// //                             className={index % 2 === 0 ? 'even' : 'odd'} // Apply striped class
// //                         >
// //                             <td>{notification.message}</td>
// //                             <td>{new Date(notification.notificationDate).toLocaleString('en-US', { timeZone: 'America/New_York' })}</td>
// //                         </tr>
// //                     ))}
// //             </tbody>
// //         </table>
// //     </div>
// // );


// return (
//     <div id="notification-container" className="libre-baskerville-regular">
//         <h2 className="libre-baskerville-bold">Notifications</h2>
//         <table className="notification-table">
//             <thead>
//                 <tr>
//                     <th>Notification</th>
//                     <th>Timestamp</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {notifications
//                     .sort((a, b) => new Date(b.notificationDate) - new Date(a.notificationDate))
//                     .map((notification, index) => {
//                         // Parse the date as UTC and then convert to local time
//                         const localDate = new Date(notification.notificationDate).toLocaleString('en-US', { timeZone: 'America/New_York' });

//                         return (
//                             <tr
//                                 key={notification.id}
//                                 onClick={() => markAsRead(notification.id)}
//                                 style={{ fontWeight: !notification.isRead ? 'bold' : 'normal' }}
//                                 className={index % 2 === 0 ? 'even' : 'odd'}
//                             >
//                                 <td>{notification.message}</td>
//                                 <td>{localDate}</td> {/* Display the local date */}
//                             </tr>
//                         );
//                     })}
//             </tbody>
//         </table>
//     </div>
// );
// }

// export default NotificationList;






















import React, { useEffect, useState } from 'react';
import "./Notification.css";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const userId = parseInt(userProfile.id, 10);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch(`https://localhost:5001/api/notification/${userId}`);
            const data = await response.json();
            setNotifications(data);
        };
        fetchNotifications();
    }, [userId]);

    // const markAsRead = async (notificationId) => {
    //     const response = await fetch(`/api/notification/${notificationId}`, { method: 'PUT' });
    //     if (response.ok) {
    //         setNotifications(prev =>
    //             prev.map(notification => 
    //                 notification.id === notificationId ? { ...notification, isRead: true } : notification
    //             )
    //         );
    //     }
    // };

    return (
        <div id="notification-container" className="libre-baskerville-regular">
            <h2 className="libre-baskerville-bold">Notifications</h2>
            {notifications.length>0?

            <table className="notification-table">
                <thead>
                    <tr>
                        <th>Notification</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications
                        .sort((a, b) => new Date(b.notificationDate) - new Date(a.notificationDate))
                        // <div key={notification.id} onClick={() => markAsRead(notification.id)} style={{ fontWeight: !notification.isRead ? 'bold' : 'normal' }}>
                        // <p>{notification.message}</p>
                        // <span>{new Date(notification.notificationDate).toLocaleString()}</span>
                        //</div>
                        .map((notification, index) => {
                            const utcDate = new Date(notification.notificationDate + 'Z'); // my UTC date missing Z
                            const localDate = utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
    
                            return (
                                <tr key={notification.id} 
                                className={index % 2 === 0 ? 'even' : 'odd'}
                                // onClick={() => markAsRead(notification.id)}
                                // style={{ fontWeight: !notification.isRead ? 'bold' : 'normal' }}
                                >
                                    <td>{notification.message}</td>
                                    <td>{localDate}</td>
                                </tr>
                            );
                        })
                        }
                </tbody>
            </table>

            : "Nothing to show."}
        </div>
    );
    
}

export default NotificationList;













