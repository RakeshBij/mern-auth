import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root routes
const router = createBrowserRouter([
  { path: "/", element: <div>Route route</div> },
  { path: "/register", element: <div>Register route</div> },
]);

function App() {
  return (
    // changed div to main
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
