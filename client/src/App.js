import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from './Components/RequireAuth';
import GuestLayout from './Layouts/GuestLayout';
import LoginPage from './Pages/LoginPage';
import PersistLogin from './Components/PersistLogin';
import NotFoundPage from './Pages/NotFoundPage';
import MainLayout from './Layouts/MainLayout';
import Index from "./Pages/Index";

function App() {
  return (
    <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<MainLayout />} >
              <Route index element={<Index />} />
            </Route>
          </Route>
        </Route>

          <Route element={<GuestLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
      
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
  );
}

export default App;
