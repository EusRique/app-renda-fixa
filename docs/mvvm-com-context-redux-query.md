# 🔌 Como o MVVM se encaixa com Context / Redux / React Query

O padrão MVVM foi adaptado ao ecossistema React Native da seguinte forma:

### 1. React Query (TanStack Query)
- Gerencia **server-state** (dados vindos de API).  
- Cache, refetch, sincronização em tempo real.  
- Utilizado dentro dos ViewModels (hooks).  

### 2. Redux Toolkit
- Gerencia **client-state/global-state** (ex: autenticação, preferências, seleção atual).  
- Usado para estados que precisam ser acessados globalmente.  
- Actions são disparadas via ViewModel.  

### 3. Context API
- Usado para **cross-cutting concerns** (ex: tema, idioma, configurações leves).  
- Não substitui Redux ou Query, mas complementa.  

### Integração no MVVM
- **Model** → tipos/dados.  
- **ViewModel** → hooks que consomem React Query (server-state) e disparam Redux (client-state).  
- **View** → renderiza UI, consumindo apenas o hook do ViewModel.  
- **Context** → fornece configurações adicionais para Views.  

---
