import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Admin from "./components/Admin.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddQuestion from "./components/AddQuestion.jsx";
import UpdateQuestion from "./components/UpdateQuestion.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "/admin/register",
                element: <Register />,
            },
            {
                path: "/admin/login",
                element: <Login />,
            },
            {
                path: "/admin",
                element: <Dashboard />,
            },
            {
                path: "/admin/add-question",
                element: <AddQuestion />,
            },
            {
                path: "/admin/update-question/:id",
                element: <UpdateQuestion />,
            },
        ],
    },
]);
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
