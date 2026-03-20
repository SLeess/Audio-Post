import { fetchApi, endpoints } from "@/lib/api";
import { RegisterData } from "../validations/registerSchema";
import { User } from "@/contexts/AuthContext";

export async function login({ email, password }: { email: string, password: string }) : Promise<{ data: { token: string, user: User } }>
{
    return fetchApi(endpoints.auth.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function register(data: RegisterData) : Promise<{ data: { token: string, user: User } }> {
    return fetchApi(endpoints.auth.register, {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function logout() : Promise<{ data: { token: string } }> {
    return fetchApi(endpoints.auth.logout, {
        method: "POST",
    });
}

export async function getCurrentUser() : Promise<{ data: { token: string, user: User } }> {
    return fetchApi(endpoints.auth.user);
}