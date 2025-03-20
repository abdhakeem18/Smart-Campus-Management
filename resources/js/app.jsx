import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "@/pages/dashboard";
import SchedulePage from "@/pages/Schedule";
import Users from "@/pages/users";

import Login from "@/pages/auth/LoginPage";
// import Profile from "./pages/profile";
import Register from "@/pages/auth/RegisterPage";
import VerifyEmail from "@/pages/auth/VerifyEmailPage";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import CourseRegister from "@/pages/auth/CourseRegister";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "@/config/AppContext";

function App() {
    const [contextData, setContextData] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        let defaultContextValue = {
            userDetails: true,
            roles: ["auth", "admin", "staff", "student"],
        };

        if (window.localStorage.getItem("user-data")) {
            defaultContextValue = JSON.parse(
                window.localStorage.getItem("user-data"),
            );
        }

        setContextData(defaultContextValue);
    }, []);

    function redirectTo(path) {
        navigate(path);
        setContextData((prevState) => ({
            ...prevState,
            step: "",
        }));
    }

    return (
        <>
            <AppContext.Provider value={[contextData, setContextData]}>
                <main className="main-content border-radius-lg">
                    {contextData?.step === "next" && redirectTo("/")}
                    {contextData?.step === "verify" ? (
                        <VerifyEmail />
                    ) : contextData?.step === "register" ? (
                        <CourseRegister />
                    ) : (
                        <Routes>
                            {/* Page collection */}
                            <>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/schedule"
                                    element={<SchedulePage />}
                                />
                                <Route path="/users" element={<Users />} />
                            </>

                            {/* <Route path="/profile" element={<Profile />} /> */}
                            {/* Auth Collection */}

                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgetPassword />}
                            />
                            <Route
                                path="/reset-password"
                                element={<ResetPassword />}
                            />
                        </Routes>
                    )}
                </main>
            </AppContext.Provider>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>,
);
