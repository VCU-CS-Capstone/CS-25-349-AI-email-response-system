import React, { createContext, useState, useEffect } from "react";

// Create a context for user information
export const UserContext = createContext();

// UserContext Provider component to wrap around your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // state to store user info

  // load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Initialize state from localStorage
    }
  }, []);

  // Function to update user info and sync with localStorage
  const saveUser = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo)); // Update localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
