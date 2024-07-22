import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
    return (
        <div className="min-h-[100vh] pt-2 text-neutral-600 bg-neutral-300/50 flex items-center justify-center">
            <Outlet />
        </div>
    );
};

export default GuestLayout;
