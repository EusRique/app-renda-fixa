# 📂 Estrutura de Diretórios

Abaixo está a organização de pastas do projeto e a responsabilidade de cada módulo.



```
src/
├── api/
│   └── <NAME>.ts              # Chamadas HTTP (Axios)
├── models/
│   └── <NAME>.ts              # Tipagens e interfaces
├── viewmodels/
│   └── use<NAME>ViewModel.ts  # Hooks com lógica de apresentação (MVVM)
├── screens/
│   └── <NAME>Screen.tsx       # Telas (Views)
├── components/
│   └── ...                    # Componentes reutilizáveis
├── store/
│   ├── <NAME>.ts              # Configuração do Redux Toolkit
│   └── slices/
│       └── <NAME>Slice.ts     # Reducers e actions por feature
├── queries/
│   └── query<NAME>.ts         # Hooks do React Query
├── contexts/
│   └── ...                    # Contextos globais (tema, idioma, etc.)
├── navigation/
│   └── ...                    # Configuração de rotas
└── App.tsx                    # Entry point da aplicação

```

### Responsabilidade de cada folder

- **api/** → centraliza chamadas HTTP e integrações externas.  
- **models/** → define contratos de dados (interfaces).  
- **viewmodels/** → camadas intermediárias entre dados (Model) e UI (View).  
- **screens/** → telas principais do app, que consomem ViewModels.  
- **components/** → blocos reutilizáveis de UI.  
- **store/** → estado global com Redux Toolkit (autenticação, preferências, etc.).  
- **queries/** → configuração do TanStack Query e centralização de query keys.  
- **contexts/** → estado compartilhado leve (ex: tema, idioma).  
- **navigation/** → definição da navegação.  

---


## Como a arquitetura MVVM se encaixa com Context / Redux / React Query

Model: interfaces / types (src/models/*) — formas canônicas dos dados.

ViewModel: custom hooks (src/viewmodels/useXViewModel.ts) — encapsulam:

chamadas assíncronas e cache com React Query (server state),

transformação de dados para UI (adapters/mappers),

comandos/ações que disparam Redux (global state) ou atualizações locais,

expõem loading / error / actions para a View.

View: componentes React Native (screens/components) que só consomem o hook-VM e renderizam.

Context API: bom para cross-cutting concerns (tema, idioma, configuração leve, auth tokens) — não para substituir Redux/Query.

Fluxo típico: View -> chama métodos do ViewModel (hook) -> ViewModel usa React Query / services -> quando necessário sincroniza com Redux (ex.: seleção de usuário, cache local, preferências) -> View consome os dados que o hook expõe.

🔄 Fluxo de dados

View (Screen) chama useXViewModel.

ViewModel busca dados da API via React Query (fetchUsers).

ViewModel expõe dados (users, isLoading, selectUser).

View renderiza lista de usuários (UserCard).

Ações (ex.: selecionar usuário) são disparadas pelo ViewModel via Redux (setUser).

## Boas práticas e recomendações

📌 Boas práticas

Use Redux Toolkit apenas para estado global (auth, preferências).

Use React Query para estado assíncrono/server-state (fetch/mutações).

Centralize query keys em src/queries/keys.ts.

Use ViewModels (hooks) para encapsular lógica → Views nunca chamam API diretamente.

Escreva testes unitários em cima dos ViewModels (mockando API/Redux).