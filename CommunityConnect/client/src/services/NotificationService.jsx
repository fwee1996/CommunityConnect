const apiUrl = "https://localhost:5001";

// Params are passed down from NotificationForm component 
export const sendNotification = async (userId, eventId, eventName, volunteerName, organizerUserId) => {
   
    // Create notification for the volunteer when they sign up for an event
    const volunteerMessage = `You signed up for ${eventName}`;
    await fetch(`${apiUrl}/api/notification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            eventId: eventId,
            message: volunteerMessage,
            isRead: false,
            notificationDate: new Date().toISOString(),
        })
    });

    // Create notification for the organizer when someone signs up for their event
    const organizerMessage = `${volunteerName} has signed up for your event, ${eventName}.`;
    await fetch(`${apiUrl}/api/notification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: organizerUserId, // Ensure this is the organizer's User ID
            eventId: eventId,
            message: organizerMessage,
            isRead: false,
            notificationDate: new Date().toISOString(),
        })
    });
};

export const sendContactNotification = async (userId, eventId, eventName, inquirerName, organizerUserId) => {
    // Create notification for the contact form submitter (user)
    const volunteerMessage = `You contacted the organizer about ${eventName}.`;
    console.log("Organizer User ID before notification:", organizerUserId);
    console.log("Inquirer Name before notification:", inquirerName);
    console.log("User Profile ID before notification:", userId); // Use userId instead of userProfile.id
    console.log("Organizer User ID:", organizerUserId); // Check the value

    console.log("Sending notification for user:", { userId, eventId, message: volunteerMessage });

    await fetch(`${apiUrl}/api/notification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            eventId: eventId,
            message: volunteerMessage,
            isRead: false,
            notificationDate: new Date().toISOString(),
        })
    });

    // Create notification for the organizer
    const organizerMessage = `${inquirerName} contacted you about ${eventName}.`;
    console.log("Sending notification to organizer:", { userId: organizerUserId, eventId, message: organizerMessage });
    
    await fetch(`${apiUrl}/api/notification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: parseInt(organizerUserId), // Ensure this is the organizer's User ID
            eventId: parseInt(eventId),
            message: organizerMessage,
            isRead: false,
            notificationDate: new Date().toISOString(),
        })
    });
};

export const GetNotificationsByUserId = (userId) => {
    return fetch(`${apiUrl}/api/notification/${userId}`)
        .then(res => res.json());
};
