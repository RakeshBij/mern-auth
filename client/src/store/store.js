import create from "zustand";

// Create a custom store for managing authentication-related state
// create function creates a central store in the react application, we can access the central store variable in any react component
// set variable is used to set new value to the store
export const useAuthStore = create((set) => ({
  // Initial state containing authentication information
  auth: {
    username: "",
    active: false,
  },

  // Action function to update the username in the auth object
  setUsername: (name) =>
    set((state) => ({
      auth: {
        ...state.auth, // Copy existing auth properties
        username: name, // Update the username
      },
    })),
}));
