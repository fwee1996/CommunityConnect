// import { useState } from "react";

// export const EventImage = ({eventId, onImageUpload}) => {
//   const [file, setFile] = useState();

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     console.log(event.target.files[0])
 
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);
//     console.log(formData);

//     try {
//         const response = await fetch(`https://localhost:5001/api/Event/upload?eventId=${eventId}`, {
//             method: "POST",
//             body: formData,
//           });
//           if(!response.ok) throw new Error("Upload failed");
//           const data = await response.json();
//           console.log("Upload successful:", data);
//         //   window.location.reload();
//         console.log(data.filePath)
//         onImageUpload(data.filePath)

//           setFile(null);
//           event.target.reset();
//         } catch (error) {
//             console.error("Upload failed:", error)
//         }
//     }
//     return (
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} required />
//         <button type="submit">Upload image</button>
//       </form>
//     );
//   };










// import { useState } from "react";

// export const EventImage = ({ eventId, onImageUpload }) => {
//   const [file, setFile] = useState(); //change from null
// // This works
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     console.log(event.target.files[0])
//   };

// //   This is issue:
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Selected file:", file);
//     if (!file) {
//         console.error("No file selected");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     // console.log(formData);
//     console.log("FormData before upload:", formData.get("file")); // Log the file in FormData
    
//     //curl:https://localhost:5001/api/Event/upload?eventId=2
//     //"filePath": "uploads/chicken.png"

//     try {
//       const response = await fetch(`https://localhost:5001/api/Event/upload?eventId=${eventId}`, {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("Upload failed");
//       const data = await response.json();
//       console.log("Upload successful:", data);

//       console.log(data.filePath)
      
//       onImageUpload(data.filePath); // Pass the uploaded image path to parent
      
//       setFile(null); // Reset the file input
//       event.target.reset(); // Reset the form
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} required />
//       <button type="submit">Upload image</button>
//     </form>
//   );
// };









// import { useState } from "react";

// export const EventImage = ({ eventId, onImageUpload }) => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     console.log("Selected file:", selectedFile);
//   };

//   const handleImageUpload = async (event) => {
//     event.preventDefault();
//     if (!file) {
//       console.error("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(`https://localhost:5001/api/Event/upload?eventId=${eventId}`, { 
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("Upload failed");
//       const data = await response.json();
//       onImageUpload(data.filePath); // Pass the uploaded image path to the parent
//       setFile(null); // Reset the file input
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleImageUpload}>
//         <input type="file" onChange={handleFileChange} required />
//         <button type="submit">Upload Image</button>
//       </form>
//     </div>
//   );
// };













// //this works to add image to event but only if the event already exist!
// import React, { useState } from "react";

// export const EventImage = ({ eventId, onImageUpload }) => {
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     setImagePreview(URL.createObjectURL(selectedFile)); // Create a preview of the selected image
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       console.error("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(`https://localhost:5001/api/Event/upload?eventId=${eventId}`, { 
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("Upload failed");
//       const data = await response.json();
//       onImageUpload(data.filePath); // Pass the uploaded image path to the parent
//       setFile(null); // Reset the file input
//       setImagePreview(null); // Reset the image preview
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} required />
//       {imagePreview && <img src={imagePreview} alt="Selected" style={{ width: "150px", height: "150px" }} />}
//       <button type="button" onClick={handleUpload}>Upload Image</button>
//     </div>
//   );
// };







// import React, { useState } from "react";

// export const EventImage = ({ onImageSelect }) => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     onImageSelect(selectedFile); // Pass the selected file to the parent
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} required />
//       {file && <p>Selected file: {file.name}</p>} {/* Show selected file name */}
//     </div>
//   );
// };
