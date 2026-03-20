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

export async function fetchApi<T>(
    endpoint: string, options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        credentials: "include", // Para enviar cookies de autenticação
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
        throw new Error(errorData?.message || "Erro na requisição");
    }

    return response.json();
}