import axios from "axios";
import { showModel } from "../components/common/helper";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const baseURLs = {
    admin: process.env.ENDPOINT,
    staff: process.env.ENDPOINT_STAFF,
    student: process.env.ENDPOINT_STUDENT,
};

const API = (version, showLoginModal = true) => {
    const APICALL = axios.create({
        baseURL: baseURLs[version],
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Add a request interceptor
    APICALL.interceptors.request.use(
        (config) => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user)
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            return config;
        },
        (error) => Promise.reject(error),
    );

    APICALL.interceptors.response.use(
        (response) => response,
        async (error) => {
            // // console.log("error", error);
            if (error.response?.status === 401) {
                // localStorage.clear();
                if (showLoginModal) {
                    navigate("/login");
                }
                return Promise.reject(error.response?.data);
            }

            if (error.response?.status !== 401) {
                return Promise.reject(error.response?.data);
            }
        },
    );

    return APICALL;
};
export default API;
