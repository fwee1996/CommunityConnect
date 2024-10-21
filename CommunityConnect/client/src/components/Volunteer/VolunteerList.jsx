// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { GetVolunteersByEventId } from "../../services/VolunteerService";
// import { GetEventById } from "../../services/EventService";
// import Volunteer from "./Volunteer";
// import { GetUserById } from '../../services/UserService';
// // import VolunteerPageHeader from "./VolunteerPageHeader";

// export default function VolunteerList() {
//   const [volunteers, setVolunteers] = useState([]);
//   //now for getting event name as the link back to that event details
//   const { eventId }= useParams();
//   const [eventName, setEventName]=useState('');

//   // useEffect(() => {
//   //   callGetVolunteersByEventId();
//   //   fetchEventName(); // Fetch event name
//   // }, [eventId]); //rerender when eventId changes

//   // const callGetVolunteersByEventId = async () => {
//   //   const volunteers = await GetVolunteersByEventId(eventId); // passing the correct eventId
//   //   console.log(volunteers);// log to see casing/what is being received for url for Volunteer.jsx info to render
//   //   setVolunteers(volunteers);
//   // };

//   // const fetchEventName = ()=>{
//   //   const eventData = GetEventById(eventId);
//   //   setEventName(eventData.name);// Store event name
//   // }



//   useEffect(() => {
//     const fetchVolunteers = async () => {
//       try {
//         // Fetch volunteers for the event
//         const volunteers = await GetVolunteersByEventId(eventId);
//         console.log("Fetched Volunteers: ", volunteers); // Log the data

//         setVolunteers(volunteers);
        
//         // Fetch the event name
//         const eventData = await GetEventById(eventId);
//         setEventName(eventData.name);

//         // Fetch user details for each volunteersignup form
//         const volunteersWithUserDetails = await Promise.all(volunteers.map(async (volunteer) => {
//           const user = await GetUserById(volunteer.userId);
//           return { ...volunteer, user }; // Include user data
//         }));

//         setVolunteers(volunteersWithUserDetails);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
      
//     };

//     fetchVolunteers();
//   }, [eventId]);


//   return (
//     <>
//       {/* <VolunteerPageHeader title="Volunteers" /> */}

//       <div className="container pt-5">
//         <div className="container d-flex align-items-center justify-content-between w-100">
//           <h1 className="p-4">All Volunteers for {eventName}</h1>  {/* Update header to include event name */}
         
//           {/* Link back to the event details page */}
//           <Link to={`/events/${eventId}`} className="btn btn-outline-secondary">
//                         Back to Event Details
//          </Link>
//         </div>

//         {volunteers.length === 0 ? (
//           <div className="alert alert-info">
//             <h2>No volunteers for this event yet.</h2>
//           </div>
//         ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Comment</th>
//               <th>Signup Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {volunteers &&
//               volunteers.length > 0 &&
//               volunteers.map((singleVolunteer) => {
//                 return (
//                   <tr key={singleVolunteer.id}>
//                     <Volunteer singleVolunteer={singleVolunteer} />
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//         )}
//       </div>
//     </>
//   );
// }






import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GetVolunteersByEventId } from "../../services/VolunteerService";
import { GetEventById } from "../../services/EventService";
import Volunteer from "./Volunteer";
import { GetUserById } from '../../services/UserService';
import './VolunteerList.css';


export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const { eventId } = useParams();
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        // Fetch volunteers for the event
        const response = await GetVolunteersByEventId(eventId);

        // If no volunteers exist, response will be an empty array 
        //RMBR TO INCLD THAT LOGIC IN BACKEND:
        // if ( volunteerSignup == null || !volunteerSignup.Any())
        //   {
        //       // Return an empty array if no volunteers are found
        //       return Ok(new List<VolunteerSignup>());
        //   }
        if (response.length === 0) {
          setVolunteers([]);  // Set an empty array when no volunteers are found
        } else {
          setVolunteers(response);  // Set volunteers when data is found
          
          // Fetch user details for each volunteer if any exist
          const volunteersWithUserDetails = await Promise.all(
            response.map(async (volunteer) => {
              const user = await GetUserById(volunteer.userId);
              return { ...volunteer, user };
            })
          );
          setVolunteers(volunteersWithUserDetails);
        }

        // Fetch event name
        const eventData = await GetEventById(eventId);
        setEventName(eventData.name);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVolunteers();
  }, [eventId]);

  return (
    <div className="volunteer-list-container" >
      <div  id="container-vol">
        <div  id="all-vol">
          {/* make event name clickable to go back to event details */}
          <h1 className="p-4"> All Volunteers for 
            <Link 
                  to={`/events/${eventId}`} 
                  style={{ textDecoration: 'none', color: 'black', marginLeft: '10px' }} 
                  onMouseEnter={(e) => e.target.style.color = 'blue'}
                  onMouseLeave={(e) => e.target.style.color = 'black'}
                >
                    {eventName}
            </Link>
         </h1>
        </div>

        {/* If no volunteers, show a custom message */}
        {volunteers.length === 0 ? (
          <div className="content">
            <h2>No volunteers for this event yet. </h2>
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Comment</th>
                <th>Signup Date</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((singleVolunteer) => (
                <tr key={singleVolunteer.id}>
                  <Volunteer singleVolunteer={singleVolunteer} />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
