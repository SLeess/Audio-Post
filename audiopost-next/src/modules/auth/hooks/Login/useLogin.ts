import { useState } from "react";
import { login } from "@/modules/auth/services/authService";
import { toast } from "sonner";

export default function useLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string> | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors(null);

        try {
            await login(formData.email, formData.password);
            toast.success("Login realizado com sucesso!");

            // Redirecionar para a página inicial ou dashboard
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            toast.error(error.message || "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");

            setErrors(errors);
        } finally {
            setIsLoading(false);
        }
    }

    return { formData, handleInputChange, handleSubmit, errors, isLoading };
}