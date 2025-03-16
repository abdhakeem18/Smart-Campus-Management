import axios from "axios";

const baseURLs = {
    auth: import.meta.env.VITE_ENDPOINT_AUTH,
    admin: import.meta.env.VITE_ENDPOINT_ADMIN,
    staff: import.meta.env.VITE_ENDPOINT_STAFF,
    student: import.meta.env.VITE_ENDPOINT_STUDENT,
};

const API = (version) => {
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
                pageNavigation("/login");
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
