import { useWatch } from "react-hook-form";
import useRegister from "../../hooks/Register/useRegister";
import { useEffect, useState } from "react";
import { faEyeSlash, faEye, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";

export default function FormRegister(): React.ReactNode {
    const { form, onSubmit } = useRegister();
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = form;

    const [password, password_confirmation] = useWatch({
        control,
        name: ["password", "password_confirmation"]
    });

    useEffect(() => {
        Object.values(errors).map(error => 
            toast.error(error.message, {
                duration: 5000,
            })
        );
    }, [errors]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    return (
        <section className="col-span-6 px-20 flex flex-col items-start justify-center min-h-screen bg-white">
            <div className="mb-5 text-center flex items-start">
                <FontAwesomeIcon icon={faHeadphones} className="text-2xl text-purple-600 mb-2" />
                <a className="text-lg font-bold text-purple-600" href="/">AudioPost</a>
            </div>
            <div className="w-full max-w-md py-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold text-start text-purple-600 mb-6">Criar conta</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome completo</label>
                        {/** Isso substitui o value o onChange */}
                        <input type="text" id="name" placeholder="John Doe" 
                            {...register("nome")}
                            className={` ${errors.nome ? "border-red-500" : "border-gray-300"} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"`}
                        />
                        {/* Exibe o erro do Zod em vermelho caso exista */}
                        {/* {errors.nome && <p className="text-sm text-red-500 mt-1">{errors.nome.message}</p>} */}
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de usuário</label>
                        {/** Isso substitui o value o onChange */}
                        <input type="text" id="username" placeholder="example" 
                            {...register("username")}
                            className={` ${errors.username ? "border-red-500" : "border-gray-300"} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"`}
                        />
                        {/* Exibe o erro do Zod em vermelho caso exista */}
                        {/* {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>} */}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        {/** Isso substitui o value o onChange */}
                        <input type="email" id="email" placeholder="example@example.com" 
                            {...register("email")}
                            className={` ${errors.email ? "border-red-500" : "border-gray-300"} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"`}
                        />
                        {/* Exibe o erro do Zod em vermelho caso exista */}
                        {/* {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>} */}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••" 
                                {...register("password")}
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                className={` ${errors.password ? "border-red-500" : "border-gray-300"} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"`}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 hover:text-gray-700 focus:outline-none focus:text-gray-700 hover:cursor-pointer">
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                        {/* {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>} */}
                        {password && (
                            // Lista de requisitos de senha, 12 caracteres, uma letra maiuscula, uma letra minúscula, um número e um caractere especial
                            <div className="border border-gray-300 rounded-md p-2 mt-2 bg-gray-50">
                                <p className={`text-sm mt-1 ${password?.length >= 12 ? "text-green-500" : "text-red-500"}`}>A senha deve conter pelo menos 12 caracteres</p>
                                <p className={`text-sm mt-1 ${/[A-Z]/.test(password) ? "text-green-500" : "text-red-500"}`}>A senha deve conter uma letra maiúscula</p>
                                <p className={`text-sm mt-1 ${/[a-z]/.test(password) ? "text-green-500" : "text-red-500"}`}>A senha deve conter uma letra minúscula</p>
                                <p className={`text-sm mt-1 ${/\d/.test(password) ? "text-green-500" : "text-red-500"}`}>A senha deve conter um número</p>
                                <p className={`text-sm mt-1 ${/[@$!%*?&]/.test(password) ? "text-green-500" : "text-red-500"}`}>A senha deve conter um caractere especial</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="••••••••" 
                                {...register("password_confirmation")}
                                className={` mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"`}
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 hover:text-gray-700 focus:outline-none focus:text-gray-700 hover:cursor-pointer">
                                {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                        {/* {errors.password_confirmation && <p className="text-sm text-red-500 mt-1">{errors.password_confirmation.message}</p>} */}
                        {
                            password && password_confirmation && password !== password_confirmation && (
                                <p className="text-sm text-red-500 mt-1">As senhas não coincidem</p>
                            )
                        }
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-indigo-800 disabled:opacity-50 transition-colors"
                    >
                        {isSubmitting ? "Cadastrando..." : "Criar Conta"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Já possui uma conta? <a href="/login" className="text-indigo-600 hover:text-indigo-400 font-medium transition-colors">Entrar</a>
                </p>
            </div>
        </section>
    );
}