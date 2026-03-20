export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const endpoints = {
    auth: {
        login: "/login",
        register: "/register",
        logout: "/logout",
        user: "/user",
    },
    authenticated: {
        podcasts: "/podcasts",
        podcastDetail: (id: number) => `/podcasts/${id}`,
    }
};