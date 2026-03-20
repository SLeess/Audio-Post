import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../../validations/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { register } from "../../services/authService";
import { toast } from "sonner";
import { useLoading } from "@/contexts/LoadingContext";
import { useAuth } from "@/contexts/AuthContext";
import { log } from "console";
import { useAuthService } from "../../services/authService";

export default function useRegister()
{
    const { login } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const { register: registerService } = useAuthService();

    const form = useForm<RegisterData>({
        resolver: zodResolver(registerSchema)
    });
  
    const onSubmit = async (data: RegisterData) => {
        showLoading();
        try {
            const result = await registerService(data);
            
            if(result.data.token && result.data.user) {
                login(result.data.token, result.data.user);
                toast.success("Login realizado com sucesso!");
            }
        } catch (error: any) {
            console.log(error);
            console.error("Erro ao fazer login:", error);
            toast.error(error.message || "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
        } finally {
            hideLoading();
        }
    };

    return {
        form, onSubmit
    };
}