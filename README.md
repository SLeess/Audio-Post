# 🎙️ AudioPost

**AudioPost** é uma plataforma SaaS (Software as a Service) full-stack que transforma textos longos — como artigos, roteiros e materiais de estudo — em áudio natural (formato podcast) e gera resumos inteligentes em tópicos utilizando Inteligência Artificial.

O foco arquitetural do projeto é a **alta escalabilidade e resiliência**, utilizando processamento assíncrono em segundo plano para lidar com a geração pesada de áudios sem comprometer a experiência e a fluidez do usuário no front-end.

### 🚀 Principais Funcionalidades

* **Text-to-Speech (TTS) com IA:** Conversão de textos em áudios humanizados integrando a API do ElevenLabs.
* **Resumos Inteligentes:** Análise de textos longos para geração automática de *bullet points* integrando LLMs via OpenRouter.
* **Processamento Assíncrono:** Gerenciamento de filas de geração de áudio garantindo que o servidor web não fique bloqueado durante as requisições às APIs externas.
* **Rate Limiting & Performance:** Controle de limite de uso por usuário e otimização de consultas utilizando cache em memória.
* **Validação Front-to-Back:** Garantia de integridade dos dados com validações rigorosas desde a interface até o banco de dados.

### 🛠️ Stack Tecnológica

* **Front-end:** Next.js (React), TypeScript, Tailwind CSS, React Hook Form + Zod.
* **Back-end:** PHP, Laravel (API RESTful).
* **Banco de Dados:** MySQL.
* **Mensageria & Filas:** RabbitMQ.
* **Cache & Rate Limiting:** Redis.
* **Infraestrutura:** Docker, Docker Compose (Laravel Sail).
