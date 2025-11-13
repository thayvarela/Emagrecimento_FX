# Plano de Emagrecimento com IA

Este é um aplicativo que gera um plano de emagrecimento personalizado com dieta e treinos semanais. O usuário informa peso, altura e o tipo de físico desejado para receber um guia passo a passo.

## Estrutura de Pastas e Arquivos

A estrutura do projeto está organizada da seguinte forma para separar responsabilidades e facilitar a manutenção.

```
.
├── App.tsx
├── components
│   ├── icons
│   │   ├── CutleryIcon.tsx
│   │   └── DumbbellIcon.tsx
│   ├── PlanDisplay.tsx
│   └── UserInputForm.tsx
├── index.html
├── index.tsx
├── metadata.json
├── services
│   └── geminiService.ts
└── types.ts
```

### Descrição dos Arquivos

-   **`index.html`**: O arquivo HTML principal, ponto de entrada da aplicação. Carrega os scripts necessários, incluindo React, TailwindCSS e o script principal da aplicação.
-   **`index.tsx`**: Ponto de entrada do React. Renderiza o componente principal `App` no DOM.
-   **`metadata.json`**: Contém metadados sobre a aplicação, como nome e descrição.
-   **`App.tsx`**: O componente raiz da aplicação. Gerencia o estado principal (plano, carregamento, erros) e a lógica de renderização condicional.
-   **`types.ts`**: Define os tipos e interfaces TypeScript utilizados em toda a aplicação (ex: `WeeklyPlan`, `TargetShape`).
-   **`services/geminiService.ts`**: Módulo responsável pela comunicação com a API do Google Gemini. Contém a lógica para gerar o plano de emagrecimento, incluindo a definição do schema JSON esperado.
-   **`components/`**: Pasta contendo todos os componentes React reutilizáveis.
    -   **`UserInputForm.tsx`**: Componente do formulário onde o usuário insere seus dados (peso, altura, objetivo).
    -   **`PlanDisplay.tsx`**: Componente responsável por exibir o plano semanal gerado de forma organizada e interativa.
    -   **`icons/`**: Pasta que contém os componentes de ícones SVG utilizados na interface.
        -   **`CutleryIcon.tsx`**: Ícone de talheres.
        -   **`DumbbellIcon.tsx`**: Ícone de haltere.
