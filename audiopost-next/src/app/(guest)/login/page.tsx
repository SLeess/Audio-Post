"use client";

import useLogin from "@/modules/auth/hooks/useLogin";

export default function LoginPage()
{
    const { 
        formData,
        handleInputChange,
        handleSubmit 
    } = useLogin();

    return (<>
        <div className="grid grid-cols-12 min-h-screen w-full">
            <section className="col-span-6 px-20 flex flex-col items-start justify-center min-h-screen bg-white">
                <div className="mb-5 text-center">
                    <i className="fas fa-headphones"></i>
                    <h1 className="text-lg font-bold text-purple-600">AudioPost</h1>
                </div>
                <div className="w-full max-w-md py-6 bg-white rounded-lg">
                    <h2 className="text-2xl font-bold text-start text-purple-600 mb-6">Entrar na sua conta</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="seu@email.com" onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                            <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="••••••••" onChange={handleInputChange}/>
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 border-[1px] border-gray-700 text-white rounded-lg hover:bg-gradient-to-r hover:from-purple-700 hover:to-black-600 transition-colors">Entrar</button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Não tem uma conta? <a href="/register" className="text-indigo-600 hover:text-indigo-400 font-medium transition-colors">Registrar-se</a>
                    </p>
                </div>
            </section>
            <aside className="col-span-6 bottom-0 bg-gradient-to-b from-[#16032c] to-[#0a0215] text-center m-1 rounded-lg overflow-hidden">
                <img src="/assets/logo_login_image.png" alt="Podcasts" className="object-cover h-full" />
                {/* <div className="h-full w-1/2 bg-black-700">

                </div> */}
            </aside>
        </div>
    </>);
}