const apiUrl = "https://localhost:5001";

export const GetAllVolunteers =()=>{
    return fetch(`${apiUrl}/api/VolunteerSignup`)
    .then((res) => res.json());
};

export const GetVolunteerById = (id) => {
    return fetch(`${apiUrl}/api/VolunteerSignup/${id}`).then(res => res.json());
};

//test:https://localhost:5001/api/volunteersignup/1
export const GetVolunteersByEventId = (eventId) => {
    return fetch(`${apiUrl}/api/VolunteerSignup/${eventId}`).then(res => res.json());
};

export const AddVolunteer = (volunteer) => {
    return fetch(`${apiUrl}/api/volunteersignup/${volunteer.eventId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(volunteer)
    })
    .then(res => {
        return res.json();
     });
    };
    //.then((volunteer) => {
    //     return volunteer.id;
    // });
    


export const DeleteVolunteer = (id) => {
    return fetch(`${apiUrl}/api/VolunteerSignup/${id}`, {
        method: "DELETE",
    });
};


// export const UpdateVolunteer = (volunteer) => {
//     return fetch(`${apiUrl}/api/VolunteerSignup/${volunteer.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(volunteer)
//     })
//     .then(res => {
//         // Handle if the response doesn't return JSON
//         return res.text().then(text => text ? JSON.parse(text) : {});
//     });
// };

