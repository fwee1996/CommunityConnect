import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UpdateUser, GetUserById } from "../../services/UserService";
import "./UserForm.css"
export const UserForm = () => {
    const { userId } = useParams();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [file, setFile] = useState(null); // State for selected file

    useEffect(() => {
        if (userId) {
            GetUserById(userId).then(user => {
                setFullName(user.fullName);
                setPassword(user.password);
                setEmail(user.email);
                setPhoneNumber(user.phoneNumber);
                setCity(user.city);
                setState(user.state);
                setProfileImage(user.profileImage || "");
            });
        }
    }, []);

    const handleFileChange = (user) => {
        const selectedFile = user.target.files[0]; // Get the selected file
        setFile(selectedFile); // Set the selected file
      
        if (selectedFile) {
          setProfileImage(URL.createObjectURL(selectedFile)); // Create a local URL for preview
        } else {
            setProfileImage(""); // Clear preview if no file is selected
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedUserId=JSON.parse(userId);

        const userData = {
        id: parsedUserId, // Always include id if editing
        fullName: fullName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        city: city,
        state: state,
        profileImage: profileImage,
        };
        

         console.log("User data:", userData);

         try {
            // Handle image upload if file is selected
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              const uploadUrl = `https://localhost:5001/api/user/upload?userId=${userId}` //edit user
          
        
              const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
              });
        
              if (!response.ok) throw new Error("Image upload failed");
              const data = await response.json();
              userData.profileImage = data.filePath; // Add the uploaded image path
            }  

         UpdateUser(userData)
        .then(() => navigate(`/profile`));

        } catch (error) {
            console.error("Error saving user:", error);
          }

    };

    return (
        <div className="user-form-background">
            <div className="container">
        <form onSubmit={handleSubmit} className="form" >
        <div className="form-content">
        
        <div className="profile-pic-container">
            <h2>Update Profile</h2>
            <div className="form-group">
                <label htmlFor="file"><strong>Profile Picture: </strong></label>
                <br/>
                <input
                    type="file"
                    onChange={handleFileChange} 
                />
            </div>
            {profileImage ? (
        <img src={profileImage.startsWith("http") ? profileImage : `https://localhost:5001/${profileImage}`} alt="Event" style={{ width: "400px", height: "400px" }} />
      ) : (
        <p>No image available</p> // Optional message if no image exists in the database
      )}
      </div>

      <div className="form-fields-container">
            <div className="form-group">
                {/* htmlFor should match id, id dont need to match value*/}
            <label htmlFor="fullName"><strong>Full Name (Individual/ Organization): </strong></label> 
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="form-control"
                    id="fullName"
                />
            </div>
            <div className="form-group">
            <label htmlFor="email"><strong>Email: </strong></label>
                <input
                type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control"
                    id="email"
                />
            </div>
            <div className="form-group">
            <label htmlFor="contact-number"><strong>Contact Number: </strong></label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="form-control"
                    id="contact-number"
                />
            </div>
            <div className="form-group">
            <label htmlFor="city"><strong>City: </strong></label>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="form-control"
                    id="city"
                />
            </div>
            <div className="form-group">
            <label htmlFor="state"><strong>State:</strong> </label>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="form-control"
                    id="state"
                />
                {/* added id, it's just for matching with label htmlFor */}
            </div>

            <button type="submit">
                Save Changes
            </button>
            <button type="button" onClick={() => navigate(`/profile`)} className="btn btn-secondary">Cancel</button>
            </div>
            

            </div>
        </form>
        </div>
        </div>
    );
};














