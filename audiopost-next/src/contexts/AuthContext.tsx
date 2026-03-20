"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode, useMemo, useCallback, useEffect } from "react";

export interface User {
    id: string;
    nome: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Aqui você pode adicionar lógica para verificar se o usuário já está autenticado, por exemplo, verificando um token no localStorage
        const storedToken = localStorage.getItem("@AudioPost:token");
        const storedUser = localStorage.getItem("@AudioPost:user");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = useCallback((token: string, user: User) => {
        localStorage.setItem("@AudioPost:token", token);
        localStorage.setItem("@AudioPost:user", JSON.stringify(user));

        setUser(user);

        router.push("/home");
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("@AudioPost:token");
        localStorage.removeItem("@AudioPost:user");
        setUser(null);

        router.push("/home");
    }, []);

    const isAuthenticated = useMemo(() => !!user, [user]);

    const value = useMemo<AuthContextType>(() => ({
        user,
        isAuthenticated,
        login,
        logout
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}