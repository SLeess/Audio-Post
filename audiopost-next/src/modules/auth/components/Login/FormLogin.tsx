import { UseFormReturn, useWatch } from "react-hook-form";
import { LoginData } from "@/modules/auth/validations/loginSchema";

interface FormLoginProps{
    form: UseFormReturn<LoginData>;
    onSubmit: (data: LoginData) => Promise<void>;
}

export default function FormLogin({ form, onSubmit }: FormLoginProps): React.ReactNode
{
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = form;

    const emailVal = useWatch({
        control,
        name: 'email',
        defaultValue: ''
    });

    return (
        <section className="col-span-6 px-20 flex flex-col items-start justify-center min-h-screen bg-white">
            <div className="mb-5 text-center">
                <i className="fas fa-headphones"></i>
                <h1 className="text-lg font-bold text-purple-600">AudioPost</h1>
            </div>
            <div className="w-full max-w-md py-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold text-start text-purple-600 mb-6">Entrar na sua conta</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        {/** Isso substitui o value o onChange */}
                        {/* value={formData?.email}
                            onChange={handleInputChange} **/}
                        <input type="email" id="email" placeholder="example@example.com" 
                            {...register("email")} 
                            className="mt-1 block w-full px-3 py-2 bord\er border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Exibe o erro do Zod em vermelho caso exista */}
                        {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                        {String(emailVal).includes('example@example.com') && (
                            <div>
                                <span className="text-yellow-500 text-xs mt-1 block">Pelo amor de Deus, não inventa esse email não!!</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                        <input type="password" id="password" placeholder="••••••••" 
                            {...register("password")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* Exibe o erro do Zod em vermelho caso exista */}
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-indigo-800 disabled:opacity-50 transition-colors"
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Não tem uma conta? <a href="/register" className="text-indigo-600 hover:text-indigo-400 font-medium transition-colors">Registrar-se</a>
                </p>
            </div>
        </section>
    );
}