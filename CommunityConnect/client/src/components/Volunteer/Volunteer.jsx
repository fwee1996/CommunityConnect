import React from "react";
// import { Link } from "react-router-dom";
// import { EditPencil, TrashcanDelete } from "../Icons";

export default function Volunteer({ singleVolunteer }) {
  return (
    <>
    {/* note: lowercase bcs check console tab what case the data recieved*/}
      <td>{singleVolunteer.user?.fullName}</td> 
      <td>{singleVolunteer.user?.email}</td> 
      <td>{singleVolunteer.user?.phoneNumber}</td> 
      <td>{singleVolunteer.comment}</td>
      <td>{singleVolunteer.signupDate}</td>
      {/* <td>
        <Link
          to={`/volunteers/edit/${volunteer.id}`}
          className="btn btn-outline-primary mx-1 text-primary"
          title="Edit"
        >
          <EditPencil size={20} />
        </Link>
        <Link
          to={`/volunteers/delete/${volunteer.id}`}
          className="btn btn-outline-danger mx-1"
          title="View"
        >
          <TrashcanDelete color="#b91c1c" size={20} />
        </Link>
      </td> */}
    </>
  );
}
