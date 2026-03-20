"use client";

import Loading from "@/app/loading";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
            {isLoading && 
                // (<Loading/>)
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity">
                    {/* Esse é um spinner animado feito puramente com Tailwind */}
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-medium text-lg animate-pulse">Carregando...</p>
                </div>
            }
        </LoadingContext.Provider>
    );
}

// 2. Um hook customizado para facilitar a nossa vida na hora de usar
export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading deve ser usado dentro de um LoadingProvider");
    }
    return context;
}