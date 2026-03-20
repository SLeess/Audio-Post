import { useAuthService } from "@/modules/auth/services/authService";
import { toast } from "sonner";
import { loginSchema, LoginData } from "@/modules/auth/validations/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/contexts/LoadingContext";
import { useAuth } from "@/contexts/AuthContext";

export default function useLogin() {
    const { showLoading, hideLoading } = useLoading();
    const { login: contextLogin } = useAuth();
    
    const { login } = useAuthService();

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        showLoading();

        try {
            const response = await login(data);

            if (response?.data?.token && response?.data?.user) {
                const token = response?.data?.token;
                const user = response?.data?.user;

                contextLogin(token, user);
            }

            toast.success("Bem-vindo de volta! 🎧");
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            toast.error(error.message || "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
        } finally {
            hideLoading();
        }
    }

    return { form, onSubmit };
}