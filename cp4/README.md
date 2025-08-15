# CP4 - Aplicativo React Native com TanStack Query

Este é um aplicativo React Native que demonstra o uso do TanStack Query para consumir uma API de usuários.

## Funcionalidades

- ✅ Lista de usuários obtida da API JSONPlaceholder
- ✅ Estados de carregamento com indicador visual
- ✅ Tratamento de erros
- ✅ Interface moderna e responsiva
- ✅ Cache inteligente com TanStack Query

## Tecnologias Utilizadas

- React Native (com Expo)
- TanStack Query (@tanstack/react-query)
- API pública: https://jsonplaceholder.typicode.com/users

## Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o aplicativo:**
   ```bash
   npm start
   ```

3. **Executar no dispositivo/emulador:**
   - Pressione `a` para Android
   - Pressione `i` para iOS
   - Pressione `w` para Web

## Estrutura do Projeto

```
cp4/
├── components/
│   └── UserList.js          # Componente principal da lista de usuários
├── App.js                   # Componente raiz com configuração do TanStack Query
├── package.json             # Dependências do projeto
└── README.md               # Este arquivo
```

## Componentes

### UserList
- Utiliza o hook `useQuery` do TanStack Query
- Exibe nome, email e cidade de cada usuário
- Mostra estados de carregamento e erro
- Interface com cards estilizados

### App
- Configura o `QueryClient` e `QueryClientProvider`
- Define opções padrão para queries (retry, staleTime)
- Renderiza o componente UserList


