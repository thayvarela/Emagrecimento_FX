# Plano de Emagrecimento com IA

Este é um aplicativo web que gera um plano de emagrecimento e condicionamento físico personalizado, utilizando a API do Google Gemini. A aplicação permite que usuários se cadastrem, insiram seus dados físicos e objetivos, e recebam um plano semanal detalhado com dietas e treinos. Os planos gerados podem ser salvos na conta do usuário.

## Estrutura do Projeto

A estrutura do projeto foi configurada para usar Vite com React e TypeScript, focando em uma organização clara e modular.

```
.
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                 # Componente principal que gerencia o estado e as rotas/visualizações
    ├── index.tsx               # Ponto de entrada da aplicação React
    ├── types.ts                # Definições de tipos e interfaces TypeScript
    ├── components/
    │   ├── Auth.tsx            # Componente para login e cadastro de usuários
    │   ├── HomePage.tsx        # Página inicial de apresentação da ferramenta
    │   ├── Navbar.tsx          # Barra de navegação para usuários logados
    │   ├── PlanDisplay.tsx     # Exibe o plano semanal gerado pela IA
    │   ├── SavedPlans.tsx      # Lista os planos salvos pelo usuário
    │   ├── UserInputForm.tsx   # Formulário para o usuário inserir seus dados
    │   └── icons/              # Ícones SVG como componentes React
    │       ├── BrainCircuitIcon.tsx
    │       ├── ClipboardListIcon.tsx
    │       ├── CutleryIcon.tsx
    │       ├── DumbbellIcon.tsx
    │       └── TargetIcon.tsx
    └── services/
        ├── authService.ts      # (SIMULAÇÃO) Lógica de autenticação no frontend (localStorage)
        ├── geminiService.ts    # Lógica de comunicação com a API Gemini
        └── planService.ts      # (SIMULAÇÃO) Lógica para salvar/buscar planos no frontend (localStorage)
```

## Descrição das Telas e Funcionalidades

A aplicação é dividida em várias telas (ou "views") para proporcionar uma experiência de usuário fluida.

1.  **Página Inicial (`HomePage.tsx`)**
    -   **Função:** É a porta de entrada para usuários não logados.
    -   **Detalhes:** Apresenta os principais benefícios da ferramenta (planos personalizados com IA, detalhamento, etc.) e possui um botão de "Call to Action" que direciona o usuário para a tela de autenticação.

2.  **Autenticação (`Auth.tsx`)**
    -   **Função:** Gerencia o cadastro e o login dos usuários.
    -   **Detalhes:** Um formulário único que alterna entre os modos de "Login" e "Cadastro". Também inclui um botão para uma futura implementação de "Login com Google". Atualmente, a autenticação é **simulada** usando o `localStorage` do navegador.

3.  **Criação de Plano (`UserInputForm.tsx`)**
    -   **Função:** Tela principal para usuários logados, onde o processo de personalização começa.
    -   **Detalhes:** O usuário insere suas informações: peso (kg), altura (cm), idade e o objetivo de forma física desejado (Emagrecer, Definir, etc.). Após o envio, a aplicação se comunica com a API do Gemini para gerar o plano.

4.  **Exibição do Plano (`PlanDisplay.tsx`)**
    -   **Função:** Apresenta o plano semanal completo gerado pela IA.
    -   **Detalhes:** Mostra uma navegação por abas para cada dia da semana. Para o dia selecionado, exibe detalhadamente as refeições (com horários) e os treinos (com exercícios, séries e repetições). Nesta tela, o usuário tem a opção de salvar o plano em sua conta.

5.  **Planos Salvos (`SavedPlans.tsx`)**
    -   **Função:** Permite ao usuário visualizar todos os planos que ele salvou.
    -   **Detalhes:** Exibe uma lista de planos salvos, mostrando a data de criação e o objetivo. O usuário pode clicar para ver os detalhes completos de qualquer plano salvo, que o levará de volta à tela `PlanDisplay`.

---

## Guia para Implementação do Backend

Atualmente, o projeto **simula** o comportamento de um backend usando o `localStorage` do navegador. Para uma aplicação de produção, a lógica dos `services` (`authService.ts`, `planService.ts`) e a chamada à API Gemini (`geminiService.ts`) devem ser movidas para um backend seguro.

A seguir, um guia detalhado para a construção deste backend.

### Arquitetura Recomendada

-   **Framework:** Node.js com Express.js ou um framework serverless (Vercel Serverless Functions, AWS Lambda).
-   **Banco de Dados:** PostgreSQL (com um ORM como o Prisma) ou um banco de dados NoSQL como MongoDB ou Firestore.
-   **Autenticação:** Baseada em JSON Web Tokens (JWT).

### 1. Autenticação (Substituir `authService.ts`)

#### Endpoints da API:

-   **`POST /api/auth/register`**
    -   **Corpo da Requisição:** `{ "email": "user@example.com", "password": "securepassword123" }`
    -   **Lógica:**
        1.  Validar os dados de entrada.
        2.  Verificar se o email já existe no banco de dados.
        3.  **Gerar um hash da senha** usando uma biblioteca como `bcrypt`. **Nunca armazene senhas em texto plano.**
        4.  Criar um novo registro de usuário na tabela `Users`.
        5.  Gerar um JWT contendo o ID do usuário.
    -   **Resposta:** `{ "token": "jwt_token_aqui" }`

-   **`POST /api/auth/login`**
    -   **Corpo da Requisição:** `{ "email": "user@example.com", "password": "securepassword123" }`
    -   **Lógica:**
        1.  Encontrar o usuário pelo email.
        2.  Se encontrado, comparar a senha fornecida com o hash armazenado usando `bcrypt.compare()`.
        3.  Se a senha corresponder, gerar um novo JWT.
    -   **Resposta:** `{ "token": "jwt_token_aqui" }` (ou erro 401 em caso de falha).

-   **`GET /api/auth/google` (Início do fluxo OAuth)**
    -   **Lógica:** Redirecionar o usuário para a tela de consentimento do Google. Use bibliotecas como `passport.js` com a estratégia `passport-google-oauth20`.

-   **`GET /api/auth/google/callback` (Callback do Google)**
    -   **Lógica:**
        1.  O Google redireciona para este endpoint com um código de autorização.
        2.  O backend troca esse código por um token de acesso e obtém as informações do perfil do usuário do Google.
        3.  Verifique se um usuário com este email do Google já existe no banco. Se não, crie um novo.
        4.  Gere um JWT para a sessão do usuário e redirecione-o de volta para o frontend.

### 2. Geração de Planos (Mover `geminiService.ts` para o backend)

É crucial que a chave da API do Gemini **não** seja exposta no frontend.

-   **`POST /api/generate-plan` (Rota Protegida)**
    -   **Middleware de Autenticação:** Esta rota deve ser protegida. Verifique a validade do JWT enviado no cabeçalho `Authorization: Bearer <token>`.
    -   **Corpo da Requisição:** `{ "weight": 70, "height": 175, "age": 30, "shape": "Emagrecer" }`
    -   **Lógica:**
        1.  Receber os dados do usuário do corpo da requisição.
        2.  Construir o prompt para a API Gemini, assim como é feito hoje no `geminiService.ts`.
        3.  Fazer a chamada para a API Gemini a partir do servidor, usando a `API_KEY` armazenada como uma variável de ambiente no backend.
        4.  Receber e validar a resposta JSON da IA.
    -   **Resposta:** O objeto `WeeklyPlan` gerado, pronto para ser exibido no frontend.

### 3. Gerenciamento de Planos (Substituir `planService.ts`)

-   **`POST /api/plans` (Rota Protegida)**
    -   **Middleware:** Requer autenticação JWT para obter o `userId`.
    -   **Corpo da Requisição:** O objeto completo do `WeeklyPlan` gerado.
    -   **Lógica:** Salvar o plano no banco de dados, associando-o ao `userId` extraído do token.
    -   **Resposta:** O plano salvo, incluindo o ID do banco de dados (`201 Created`).

-   **`GET /api/plans` (Rota Protegida)**
    -   **Middleware:** Requer autenticação JWT.
    -   **Lógica:** Buscar no banco de dados todos os planos associados ao `userId` do usuário autenticado.
    -   **Resposta:** Um array de objetos `WeeklyPlan`.

### 4. Modelo de Dados Sugerido (Schema do Banco de Dados)

#### Tabela `Users`
-   `id` (UUID, Chave Primária)
-   `email` (String, Único, Não nulo)
-   `passwordHash` (String)
-   `googleId` (String, Opcional, Único) - Para login com Google
-   `createdAt` (Timestamp)
-   `updatedAt` (Timestamp)

#### Tabela `Plans`
-   `id` (UUID, Chave Primária)
-   `userId` (UUID, Chave Estrangeira para `Users.id`)
-   `planData` (JSONB) - Armazena o array `plan` com os dias, refeições e treinos.
-   `userInput` (JSONB) - Armazena o objeto `{ weight, height, age, shape }` usado para gerar o plano.
-   `createdAt` (Timestamp)
