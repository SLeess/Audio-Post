import { endpoints } from "@/lib/endpoints"; // ajuste o caminho se precisar
import { useApiClient } from "@/lib/api";
import { RegisterData } from "../validations/registerSchema";
import { User } from "@/contexts/AuthContext";

interface AuthResponse {
    message?: string;
    success?: boolean;
    data?: {
        token: string;
        user: User;
    }
}

export function useAuthService() {
    // Agora é perfeitamente legal usar o hook aqui!
    const { fetchApi } = useApiClient();

    const login = async ({ email, password }: { email: string, password: string }): Promise<{message: string, success: boolean, data: { token: string, user: User }}> => {
        return fetchApi(endpoints.auth.login, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    }

    const register = async (data: RegisterData): Promise<{message: string, success: boolean, data: { token: string, user: User }}> => {
        return fetchApi(endpoints.auth.register, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    const logout = async (): Promise<{ message?: string }> => {
        return fetchApi(endpoints.auth.logout, {
            method: "POST",
        });
    }

    const getCurrentUser = async (): Promise<{ user: User }> => {
        return fetchApi(endpoints.auth.user);
    }

    // Retorna as funções armadas e prontas para uso
    return { login, register, logout, getCurrentUser };
}