import { z } from "zod";

export const registerSchema = z.object({
    nome: z.string().regex(/[A-Z][a-z].* [A-Z][a-z].*/, "Apenas letras e espaços em branco são permitidos no nome").min(3, "O seu nome deve conter pelo menos 3 letras"),
    username: z.string().min(4, "O nome de usuário deve conter pelo menos 4 caracteres").nonempty("O nome de usuário não pode ser vazio."),
    email: z.email("Formato de email inválido"),
    // Lista de requisitos de senha, 12 caracteres, uma letra maiuscula, uma letra minúscula, um número e um caractere especial
    password: z.string().min(12, "A senha deve conter pelo menos 12 caracteres").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, 
        "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    ).nonempty("A senha é obrigatória"),
    password_confirmation: z.string().min(12, "A senha deve conter pelo menos 12 caracteres").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, 
        "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    ).nonempty("A confirmação de senha é obrigatória")
}).refine(({password, password_confirmation}) => password == password_confirmation, {
    message: 'As senhas não são iguais',
    path: ['password_confirmation']
});

export type RegisterData = z.infer<typeof registerSchema>;