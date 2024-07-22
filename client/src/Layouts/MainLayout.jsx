import React, { useState} from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Components/Header";

const AdminLayout = () => {
    return (
        <div className="min-h-[100vh] pt-2 pb-28 text-neutral-600 bg-neutral-300/50 flex items-start justify-center">
            <div className="w-[1000px] bg-white">
                <Header />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
