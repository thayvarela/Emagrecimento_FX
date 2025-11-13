# Plano de Emagrecimento com IA

Este é um aplicativo que gera um plano de emagrecimento personalizado com dieta e treinos semanais. O usuário informa peso, altura e o tipo de físico desejado para receber um guia passo a passo.

## Estrutura de Pastas e Arquivos

A estrutura do projeto foi configurada para usar Vite, um moderno sistema de build que compila o código TypeScript e React para produção.

```
.
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── vite.svg (opcional)
└── src/
    ├── App.tsx
    ├── index.tsx
    ├── main.tsx
    ├── types.ts
    ├── components/
    │   ├── PlanDisplay.tsx
    │   ├── UserInputForm.tsx
    │   └── icons/
    │       ├── CutleryIcon.tsx
    │       └── DumbbellIcon.tsx
    └── services/
        └── geminiService.ts
```

### Descrição dos Arquivos

-   **`index.html`**: O arquivo HTML principal e ponto de entrada para o Vite.
-   **`package.json`**: Define os scripts do projeto (ex: `dev`, `build`) e as dependências (React, Vite, etc.).
-   **`vite.config.ts`**: Arquivo de configuração para o Vite, onde definimos plugins e o acesso a variáveis de ambiente.
-   **`tsconfig.json`**: Arquivo de configuração do TypeScript.
-   **`src/`**: Pasta contendo todo o código-fonte da aplicação.
    -   **`index.tsx` e `main.tsx`**: Ponto de entrada do React. Renderiza o componente principal `App` no DOM.
    -   **`App.tsx`**: O componente raiz da aplicação. Gerencia o estado principal e a lógica de renderização.
    -   **`types.ts`**: Define os tipos e interfaces TypeScript utilizados na aplicação.
    -   **`services/geminiService.ts`**: Módulo responsável pela comunicação com a API do Google Gemini.
    -   **`components/`**: Pasta contendo todos os componentes React reutilizáveis.
