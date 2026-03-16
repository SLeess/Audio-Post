"use client";

export default function Home() {
  return (
    
    <main className="p-5 pt-0 w-full mx-auto min-h-screen bg-[var(--background)] text-gray-50 flex flex-col">
      
      <nav className="flex justify-between border-b border-gray-700 bg-[var(--nav-bar)] mx-auto py-5 px-10 w-full max-w-4xl rounded-lg mb-10">
        <div>
          <a href="#" className="text-lg font-bold text-indigo-400">AudioPost</a>
        </div>
        <ul className="flex gap-8 justify-center">
          <li>
            <a href="#" className="hover:text-indigo-400 font-semibold transition-colors">Início</a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-400 font-semibold transition-colors">Podcasts</a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-400 font-semibold transition-colors">Preços</a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-400 font-semibold transition-colors">Sobre</a>
          </li>
        </ul>
        <ul className="flex gap-4">
          <li>
            <a href="/login" className="text-sm hover:text-indigo-400 font-semibold transition-colors">Entrar</a>
          </li>
          <li>
            <a href="/register" className="text-sm hover:text-indigo-400 font-semibold transition-colors">Registrar</a>
          </li>
        </ul>
      </nav>

      <div className="w-full text-center flex flex-col items-center justify-start py-10 flex-1">
        <h1 className="text-4xl font-bold text-white mb-4">Crie seus registros de áudio</h1>
        <h2 className="text-4xl font-bold text-white mb-4">Com o <span className="text-indigo-400">AudioPost</span></h2>
        <p className="text-lg text-gray-300">Transforme suas ideias em áudio de qualidade com o AudioPost.</p>
        <div className="mt-6 flex gap-4">
          <a href="#" className="px-6 py-2 bg-gradient-to-r from-black-600 to-purple-700 border-[1px] border-gray-700 text-white rounded-lg hover:bg-gradient-to-r hover:from-purple-700 hover:to-black-600 transition-colors">Comece Agora</a>
          <a href="#" className="px-6 py-2 border-[1px] border-gray-700 text-gray-300 rounded-lg hover:border-gray-300 hover:text-gray-300 transition-colors">Saiba Mais</a>
        </div>
      </div>
      
    </main>
  );
}