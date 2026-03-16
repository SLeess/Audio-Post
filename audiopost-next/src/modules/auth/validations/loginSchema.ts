import { z } from "zod";

export const loginSchema = {
    email: z.string().min(3, "O email deve conter pelo menos 3 caracteres").email("Formato de email inválido"),
    password: z.string().min(20, "A senha deve conter pelo menos 20 caracteres").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{20,}$/, 
        "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    ),
};

// Extraímos o tipo TypeScript direto do Zod! (Mágica pura)
export type LoginData = z.infer<typeof loginSchema>;