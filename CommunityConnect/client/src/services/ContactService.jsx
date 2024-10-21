const apiUrl = "https://localhost:5001";

export const GetAllContactForms =()=>{
    return fetch(`${apiUrl}/api/ContactFormSubmission`)
    .then((res) => res.json());
};

export const GetContactFormsById = (id) => {
    return fetch(`${apiUrl}/api/ContactFormSubmission/${id}`).then(res => res.json());
};

//test:https://localhost:5001/api/contactformsubmission/1
export const GetContactFormsByEventId = (eventId) => {
    return fetch(`${apiUrl}/api/ContactFormSubmission/${eventId}`).then(res => res.json());
};

export const AddContactForm = (contactForm) => {
    return fetch(`${apiUrl}/api/ContactFormSubmission/${contactForm.eventId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactForm)
    })
    .then(res => {
        return res.json();
    });
    // .then((contactForm) => {
    //     return contactForm.id;
    // });
};

export const DeleteContactForms = (id) => {
    return fetch(`${apiUrl}/api/ContactFormSubmission/${id}`, {
        method: "DELETE",
    });
};


// export const UpdateContactForms = (volunteer) => {
//     return fetch(`${apiUrl}/api/ContactFormSubmission/${volunteer.id}`, {
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

