import React from "react";
import { Outlet } from "react-router-dom";
function Admin() {
    return (
        <div className="w-screen h-screen bg-orange-50 overflow-y-scroll">
            <Outlet />
        </div>
    );
}

export default Admin;
