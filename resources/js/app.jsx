import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import VerifyEmail from "@/pages/auth/verify-email";
import ForgetPassword from "@/pages/auth/forget-password";
import ResetPassword from "./pages/auth/reset-password";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <>  
            <main className="main-content border-radius-lg">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </main>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>,
);
