import { useContext } from "react";
import { UserContext } from "./UserContext"; // Import the context

// Custom hook to use the UserContext
export const useUserInfo = () => {
  return useContext(UserContext); // Return the user context value (user info and setter)
};
