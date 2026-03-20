import { API_BASE_URL, endpoints } from "./endpoints";

import { useAuth } from "@/contexts/AuthContext";
import { useCallback } from "react";
import { toast } from "sonner";

export { endpoints };

export function useApiClient() {
    const { user, logout } = useAuth();


    const fetchApi = useCallback(async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
        const url = `${API_BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include", // Para enviar cookies de autenticação
        });

        if(response.status === 401 && user) {
            logout();
            toast.error("Sessão expirada. Por favor, faça login novamente.");
            throw new Error("Não autenticado. Por favor, faça login novamente.");
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
            throw new Error(errorData?.message || "Erro na requisição");
        }

        return response.json();
    }, [API_BASE_URL, logout, toast]);

    return { fetchApi };
}