import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const baseURLs = {
    auth: import.meta.env.VITE_ENDPOINT_AUTH,
    admin: import.meta.env.VITE_ENDPOINT_ADMIN,
    staff: import.meta.env.VITE_ENDPOINT_STAFF,
    student: import.meta.env.VITE_ENDPOINT_STUDENT,
};

const API = (version) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const apiCall = async (url, method = "GET", data = null) => {
        setLoading(true);
        setError(null);
        const api = axios.create({
            baseURL: baseURLs[version],
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Add a request interceptor
        api.interceptors.request.use(
            (config) => {
                const user = JSON.parse(window.localStorage.getItem("user-data"));

                if (user && version != "auth"){
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
        }
    };

    return { apiCall, loading, error };
};

export default API;
