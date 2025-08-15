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

## API

O aplicativo consome a API JSONPlaceholder que retorna dados de usuários fictícios:
- **Endpoint:** https://jsonplaceholder.typicode.com/users
- **Método:** GET
- **Resposta:** Array de objetos com informações de usuários

## Estados da Aplicação

1. **Carregando:** Mostra spinner e texto "Carregando usuários..."
2. **Sucesso:** Exibe lista de usuários em cards
3. **Erro:** Mostra mensagem de erro com detalhes

## Configurações do TanStack Query

- **Retry:** 2 tentativas em caso de falha
- **Stale Time:** 5 minutos (dados considerados frescos por 5 min)
- **Cache:** Automático para melhor performance
