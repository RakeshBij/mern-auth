import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

// <AuthorizeUser><Profile /></AuthorizeUser>
// in the aboce example the childre is <Profile />
export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // replace true means that replace the url
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  // useAuthStore.getState() this returns the current state
  // we will only have the username when the user first enter it before comming to the password page
  const username = useAuthStore.getState().auth.username;
  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
