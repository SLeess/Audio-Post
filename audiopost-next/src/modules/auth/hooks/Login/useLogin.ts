import { useState } from "react";
import { login } from "@/modules/auth/services/authService";
import { toast } from "sonner";
import { loginSchema, LoginData } from "@/modules/auth/validations/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    
    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        setIsLoading(true);

        try {
            await login(data.email, data.password);
            toast.success("Login realizado com sucesso!");

            // Redirecionar para a página inicial ou dashboard
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            toast.error(error.message || "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    return { form, onSubmit, isLoading };
}