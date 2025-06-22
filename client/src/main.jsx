import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> }, // Reusing Login component for signup
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
