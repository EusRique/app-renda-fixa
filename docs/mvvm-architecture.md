# 🏛 Arquitetura MVVM adaptada ao React

A arquitetura MVVM é composta por três camadas:

- **Model**  
  - Representa os dados do domínio (tipos/interfaces TS).  
  - Simples, sem lógica de negócio.  
  - Exemplo: `User.ts`.

- **ViewModel**  
  - Implementada como **custom hooks**.  
  - Encapsula lógica de negócio e operações assíncronas.  
  - Conecta Models à View.  
  - Exemplo: `useUsersViewModel.ts`.

- **View**  
  - São os componentes/telas React Native.  
  - Consomem os dados e funções expostas pelo ViewModel.  
  - Não contêm lógica de negócio.  
  - Exemplo: `UsersScreen.tsx`.

### Benefícios do MVVM adaptado
- Separação clara de responsabilidades.  
- Fácil de testar (ViewModels podem ser testados isoladamente).  
- Reaproveitamento de lógica em múltiplas Views.  
- Copilot entende melhor a função de cada camada.  

---
