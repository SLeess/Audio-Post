import { fetchApi, endpoints } from "@/lib/api";

export async function login(email: string, password: string) {
    return fetchApi(endpoints.auth.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function register(name: string, email: string, password: string) {
    return fetchApi(endpoints.auth.register, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
}

export async function logout() {
    return fetchApi(endpoints.auth.logout, {
        method: "POST",
    });
}

export async function getCurrentUser() {
    return fetchApi(endpoints.auth.user);
}