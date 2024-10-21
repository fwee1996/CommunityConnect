import React from "react";

export default function Contact({ singleContactForm }) {
  return (
    <>
      <td>{singleContactForm.user?.fullName || "N/A"}</td>  
      <td>{singleContactForm.user?.email || "N/A"}</td> 
      <td>{singleContactForm.user?.phoneNumber || "N/A"}</td> 
      <td>{singleContactForm.subject}</td>
      <td>{singleContactForm.message}</td>
      <td>{new Date(singleContactForm.submissionDate).toLocaleString()}</td>
    </>
  );
}
