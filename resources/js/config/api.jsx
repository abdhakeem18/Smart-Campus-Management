import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const baseURLs = {
    web: "http://127.0.0.1:8000/",
    auth: import.meta.env.VITE_ENDPOINT_AUTH,
    admin: import.meta.env.VITE_ENDPOINT_ADMIN,
    staff: import.meta.env.VITE_ENDPOINT_STAFF,
    student: import.meta.env.VITE_ENDPOINT_STUDENT,
};

const API = (version) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const v = version;

    const apiCall = async (url, method = "GET", data = null, type) => {
        setLoading(true);
        setError(null);
        if (url === "/login") {
            version = "web";
        } else {
            version = v;
        }
        const api = axios.create({
            baseURL: baseURLs[version],
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Add a request interceptor
        api.interceptors.request.use(
            (config) => {
                const user = JSON.parse(
                    window.localStorage.getItem("user-data"),
                );

                if (user && version != "auth") {
                    config.headers.Authorization = `Bearer ${user.userDetails.token}`;
                }
                return config;
            },
            (error) => {
                setLoading(false);
                setError(error);
                return Promise.reject(error);
            },
        );

        try {
            const response = await api({
                method,
                url,
                data,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            if (error.response?.status === 401) {
                console.log(url);
                if (url != "/login") {
                    localStorage.removeItem("user-data");
                    navigate("/login", {
                        state: {
                            errorMessage:
                                error.response?.data.message ||
                                "Unauthorized access. Please login.",
                        },
                    });
                } else {
                    setError(error.response?.data || error.message);
                }
            } else {
                setError(error.response?.data || error.message);
            }
        }
    };

    return { apiCall, loading, error };
};

export default API;
