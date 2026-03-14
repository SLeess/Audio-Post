"use client"; // Isso diz ao Next.js que esse componente roda no navegador (necessário para formulários)

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. O "Contrato" do Zod: Aqui você define as regras de validação do front-end
const podcastSchema = z.object({
  title: z.string().min(5, "O título precisa ter pelo menos 5 letras."),
  content: z.string().min(50, "O texto é muito curto para um podcast! Mínimo de 50 caracteres."),
});

// 2. TypeScript Mágico: Ele extrai a tipagem direto do Zod, você não precisa escrever duas vezes!
type PodcastForm = z.infer<typeof podcastSchema>;

export default function Home() {
  // 3. Conectando o React Hook Form com o Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PodcastForm>({
    resolver: zodResolver(podcastSchema),
  });

  // 4. Função que só executa se passar em todas as validações do Zod
  const onSubmit = (data: PodcastForm) => {
    console.log("Passou na validação! Dados prontos pro Laravel:", data);
    // No futuro, é aqui que faremos o fetch() para enviar pro backend
  };

  return (
    <main className="p-10 max-w-2xl mx-auto bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Criar novo AudioPost</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white p-6 rounded shadow">
        
        {/* Campo de Título */}
        <div>
          <label className="block mb-1 font-semibold">Título do Podcast</label>
          <input
            {...register("title")} // O register "conecta" o input ao Hook Form
            className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ex: Resumo sobre Clean Code"
          />
          {/* Mostra o erro do Zod, se existir */}
          {errors.title && <span className="text-red-500 text-sm mt-1 block">{errors.title.message}</span>}
        </div>

        {/* Campo de Texto */}
        <div>
          <label className="block mb-1 font-semibold">Texto para converter em Áudio</label>
          <textarea
            {...register("content")}
            className="w-full border p-2 rounded h-40 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Cole aqui o texto longo que a IA vai ler..."
          />
          {errors.content && <span className="text-red-500 text-sm mt-1 block">{errors.content.message}</span>}
        </div>

        <button 
          type="submit" 
          className="bg-indigo-600 text-white font-bold p-3 rounded hover:bg-indigo-700 transition-colors mt-2"
        >
          Gerar Podcast com IA
        </button>
      </form>
    </main>
  );
}