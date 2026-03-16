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

* **Front-end:** Next.js (React), TypeScript, Tailwind CSS, React Hook Form + Zod, Sonner.
* **Back-end:** PHP, Laravel (API RESTful).
* **Banco de Dados:** MySQL.
* **Mensageria & Filas:** RabbitMQ.
* **Cache & Rate Limiting:** Redis.
* **Infraestrutura:** Docker, Docker Compose (Laravel Sail).

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
* Docker e Docker Compose instalados.
* O comando `dc` nos exemplos abaixo é um alias comum para `docker-compose` (ou `docker compose`).

### 1. Configurando o Back-end (Laravel API)
O back-end utiliza o Laravel Sail para gerenciar os containers.

1. Navegue até a pasta da API:
```bash
cd audiopost-api
```

2. Copie o arquivo de ambiente e configure suas credenciais de banco de dados:
```bash
cp .env.example .env
```

3. Suba os containers do Laravel (App, MySQL, etc) em segundo plano:
```Bash
./vendor/bin/sail up -d
```

4. Gere a chave da aplicação e rode as migrations para criar as tabelas no banco:
```Bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

A API estará rodando em http://localhost:8000.

-- 
### 2. Configurando o Front-end (Next.js)

O front-end possui seu próprio ecossistema Docker.

1. Navegue até a pasta do front-end:
```bash
cd audiopost-next
```

2. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

3. Suba o container do Next.js:
```bash
dc up -d
```

O Front-end estará acessível em http://localhost:3000.

## 📦 Como instalar pacotes no Front-end (Docker)

Para evitar conflitos de versão do Node.js com o seu sistema operacional host, **sempre instale as dependências (NPM) por dentro do container do Docker**.

### Passo 1: Descobrir o nome do container

Dentro da pasta `audiopost-next`, liste os containers ativos para descobrir o nome exato do container do front-end rodando o comando:

```bash
dc ps

```

Você verá uma saída parecida com esta:

```text
                 Name                               Command               State                    Ports                  
--------------------------------------------------------------------------------------------------------------------------
11ce7904be97_audiopost-next_next-app_1   docker-entrypoint.sh sh -c ...   Up      0.0.0.0:3000->3000/tcp,:::3000->3000/tcp

```

Neste exemplo, o nome do nosso container é `11ce7904be97_audiopost-next_next-app_1`.

### Passo 2: Executar a instalação

Use o comando `docker exec` para rodar o `npm install` dentro desse container. A sintaxe é:
`docker exec -it <NOME_DO_CONTAINER> npm install <NOME_DO_PACOTE>`

**Exemplo instalando bibliotecas de formulário e validação:**

```bash
docker exec -it 11ce7904be97_audiopost-next_next-app_1 npm install react-hook-form @hookform/resolvers zod sonner

```

> **Dica:** Os arquivos no seu `package.json` local serão atualizados instantaneamente graças ao mapeamento de volumes do Docker!