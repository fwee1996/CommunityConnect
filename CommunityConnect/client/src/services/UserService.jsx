const apiUrl = "https://localhost:5001";
const userBase = `${apiUrl}/api/user`; // Updated to match Users table API

// Update login function to include error handling
export const login = (userObject) => {
  return fetch(`${userBase}/getbyemail?email=${userObject.email}`)
    .then((r) => {
      if (!r.ok) {
        throw new Error("Login failed"); // Added error handling for response
      }
      return r.json();
    })
    .then((userProfile) => {
      if (userProfile.id) {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile;
      } else {
        return undefined; // This handles cases where userProfile is not found
      }
    });
};

export const logout = () => {
  localStorage.clear(); // Clears the user profile on logout
};

export const register = (userObject) => {
  return fetch(userBase, { // Updated to match Users table API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),// Include password in body if needed
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Registration failed"); // Added error handling for registration
      }
      return response.json();
    });
    // .then((savedUserProfile) => {
    //   localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
    // });
};

// UserProfileContext provider setup remains the same
export const getAllUsers = async () => {
  const response = await fetch(userBase);
  return await response.json();
};

// return (
//   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register }}>
//      {props.children}
//   </UserProfileContext.Provider>
// );


export const GetUserById = (id) => {
    return fetch(`${userBase}/${id}`).then(res => res.json());
};

export const AddUser = (user) => {
    return fetch(userBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json();
    }).then((user) => {
        return user.id;
    });
};


export const DeleteUser = (id) => {
    return fetch(`${userBase}/${id}`, {
        method: "DELETE",
    });
};

// No need to pass user Id as a param like (userId,updatedUser):user ID in the URL,and updatedUser contain all the info needed incld userId
export const UpdateUser = (user) => {
    return fetch(`${userBase}/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
};

