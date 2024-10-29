const apiUrl = "https://localhost:5001";

export const GetAllEvents =()=>{
    return fetch(`${apiUrl}/api/Event`)
    .then((res) => res.json());
};

export const GetEventById = (eventId) => {
    return fetch(`${apiUrl}/api/Event/${eventId}`).then(res => res.json());
};

export const AddEvent = (event) => {
    return fetch(`${apiUrl}/api/Event`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event) 
    })
    .then(res => {
        return res.json();
    })
};

export const DeleteEvent = (id) => {
    return fetch(`${apiUrl}/api/Event/${id}`, {
        method: "DELETE",
    });
};


export const UpdateEvent = (id,event) => {
    return fetch(`${apiUrl}/api/Event/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
    .then(res => {
        // Handle if the response doesn't return JSON
        return res.text().then(text => text ? JSON.parse(text) : {});
    });
};

// For deleting user: delete their events first!
// Get events by user ID
export const GetEventsByUserId = (userId) => {
    return fetch(`${apiUrl}/api/Event/user/${userId}`)
        .then(res => res.json());
};

// Delete all events associated with a user
export const DeleteEventsByUserId = (userId) => {
    return fetch(`${apiUrl}/api/Event/user/${userId}`, {
        method: "DELETE",
    });
};




