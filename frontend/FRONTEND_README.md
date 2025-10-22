# Cats API - Frontend

Frontend React + Vite para a aplicação Cats API.

## Funcionalidades

- Verificação de status da API backend
- Importação de raças de gatos da API externa
- Listagem de raças com informações detalhadas
- Importação de imagens por categoria
- Interface responsiva e amigável
- Fallback automático de POST para GET nas importações

## Tecnologias Utilizadas

- React 18.3.1
- Vite 5.4.10
- Axios 1.7.7
- CSS in JS (inline styles)

## Configuração do Ambiente

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Backend da aplicação rodando em http://localhost:8080

### Instalação

```bash
# Entrar no diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Ou usar yarn
yarn install
yarn dev
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto frontend (opcional):

```env
VITE_API_BASE=http://localhost:8080
```

Se não especificado, o padrão será `http://localhost:8080`.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── BreedCard.jsx      # Card individual de raça
│   │   └── BreedsList.jsx     # Lista de raças
│   ├── services/
│   │   └── api.js             # Configuração e funções da API
│   ├── App.jsx                # Componente principal
│   └── main.jsx               # Ponto de entrada
├── index.html                 # Template HTML
├── package.json               # Dependências e scripts
└── vite.config.js            # Configuração do Vite
```

## Integração com Backend

O frontend está configurado para funcionar com o backend Spring Boot:

### Endpoints Utilizados

- `GET /api/health` - Verificação de status
- `POST/GET /racas/importar` - Importar raças (com fallback)
- `GET /racas` - Listar raças
- `POST/GET /imagens/importar/{categoria}` - Importar imagens

### CORS

O backend está configurado para aceitar requisições do frontend nas portas:
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (React dev server alternativo)

## Como Usar

1. **Iniciar Backend**: Certifique-se que o backend está rodando em http://localhost:8080
2. **Iniciar Frontend**: Execute `npm run dev` e acesse http://localhost:5173
3. **Verificar API**: Clique em "Verificar API" para testar a conexão
4. **Importar Dados**: Use "Importar raças" para popular o banco de dados
5. **Visualizar**: Use "Atualizar lista" para ver as raças importadas
6. **Imagens**: Importe imagens por categoria usando os botões específicos

## Funcionalidades da Interface

### Status da API
- Indicador visual de conexão com o backend
- Verificação automática ao carregar a página

### Gestão de Raças
- Importação com fallback automático (POST → GET)
- Listagem responsiva em grid
- Cards informativos com dados da raça
- Contadores de raças encontradas

### Gestão de Imagens
- Importação por categoria
- Visualização de até 3 imagens por raça
- Contador de imagens adicionais

### Feedback ao Usuário
- Mensagens de sucesso/erro automáticas
- Estados de loading durante operações
- Timeouts configurados para requests

## Desenvolvimento

### Estrutura de Componentes

- **App.jsx**: Componente principal com estado e lógica
- **BreedsList.jsx**: Renderização da lista de raças
- **BreedCard.jsx**: Card individual com dados da raça

### Serviços

- **api.js**: Configuração do Axios e funções de API
- Fallback automático de métodos HTTP
- Tratamento de erros centralizado
- Timeouts configurados

### Estilização

- CSS-in-JS com inline styles
- Design responsivo
- Paleta de cores consistente
- Estados visuais para feedback

## Build e Deploy

```bash
# Gerar build de produção
npm run build

# Arquivos gerados em ./dist/
# Servir com qualquer servidor web estático
```

## Troubleshooting

### API Offline
- Verifique se o backend está rodando em http://localhost:8080
- Teste http://localhost:8080/api/health no navegador

### Problemas de CORS
- Verifique se o backend tem CORS configurado
- Confirme se as portas estão corretas na configuração

### Dependências
- Execute `npm install` para garantir dependências atualizadas
- Verifique compatibilidade de versões do Node.js

O frontend está totalmente funcional e integrado com o backend Spring Boot atualizado!