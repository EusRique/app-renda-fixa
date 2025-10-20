# 📱 MeuApp - Arquitetura MVVM com React Native

Este projeto é um boilerplate para aplicações React Native utilizando **Expo + TypeScript**, adaptando o padrão **MVVM (Model-View-ViewModel)** ao ecossistema React.  
O objetivo é oferecer uma **arquitetura escalável, testável e fácil de manter**.

---

## 🔧 Stack Utilizada

- **Expo SDK 54** – Estável, recomendado pela comunidade em 2025
- **React Native** – Interface cross-platform
- **TypeScript** – Tipagem estática
- **Redux Toolkit** – Estado global client-side
- **TanStack Query (React Query)** – Gerenciamento de estado server-side (cache, sincronização com API)
- **Axios** – Cliente HTTP
- **React Navigation** – Navegação entre telas
- **Context API** – Para cross-cutting concerns como tema, idioma, etc.

---

## 🔄 Fluxo de Dados (MVVM Adaptado)

```plaintext
View (Screen)
  ↓ chama
useXViewModel()
  ↓ usa React Query (fetchUsers) para buscar dados da API
ViewModel
  ↑ expõe dados como:
    - users
    - isLoading
    - selectUser
  ↓ dispara ações (ex.: setUser via Redux)
View (Screen)
  ↑ renderiza dados com componentes (ex.: <UserCard />)
```

## 🚀 Como Rodar o Projeto

📦 **Pré-requisitos**

Node.js v20.19.x
Use o NVM
 para gerenciar versões.

Expo CLI
Será instalado automaticamente via npx.

# 1. Clone o repositório
git clone https://github.com/seu-usuario/meuapp.git
cd meuapp

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npx expo start
