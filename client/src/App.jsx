import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// importing all the usernames
import Username from "./components/Username";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

// root routes
const router = createBrowserRouter([
  { path: "/", element: <Username /> },
  { path: "/register", element: <Register /> },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  { path: "/recovery", element: <Recovery /> },
  { path: "/reset", element: <Reset /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    // changed div to main
    // The main element is used in React to mark the main content of a page. It is typically used to wrap the root component of a React application. In the code you provided, the main element is used to wrap the RouterProvider component. This is because the RouterProvider component is the root component of a React application that uses the React Router library. The main element is not required in React, but it is a good practice to use it.
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
