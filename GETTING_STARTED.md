# The Cats API - Guia de Início Rápido

## Visão Geral

Este projeto contém uma aplicação completa de gerenciamento de raças e imagens de gatos, composta por:

- **Backend**: API REST com Spring Boot 3.4.1 e Java 21
- **Frontend**: Interface React 18 com Vite 5
- **Monitoramento**: Grafana e Prometheus (opcional)

## Pré-requisitos

- Java 21 ou superior
- Node.js 18 ou superior  
- Maven (incluído via wrapper)

## Iniciando a Aplicação

### 1. Backend (Spring Boot)

```bash
cd catsapi
./start-app.sh
```

A aplicação estará disponível em: http://localhost:8080

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npx vite
```

A interface estará disponível em: http://localhost:5173

## Funcionalidades

### Backend - Endpoints Principais

- `GET /api/racas` - Lista todas as raças
- `POST /api/racas/importar` - Importa raças da API externa
- `GET /api/racas/{id}/imagens` - Lista imagens de uma raça
- `POST /api/racas/{id}/imagens/importar` - Importa imagens de uma raça

### Frontend - Interface Web

- Visualização de raças em cards organizados
- Importação automática de dados
- Interface responsiva e moderna
- Integração completa com o backend

## Configurações

### CORS

O backend está configurado para aceitar requisições do frontend:
- localhost:5173 (Vite dev server)
- localhost:3000 (fallback)

### Base de Dados

- H2 Database (em memória)
- Console disponível em: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Usuário: `sa` (sem senha)

## Monitoramento (Opcional)

```bash
cd catsapi
docker-compose up grafana prometheus
```

- Grafana: http://localhost:3000
- Prometheus: http://localhost:9090

## Estrutura do Projeto

```
/
├── catsapi/              # Backend Spring Boot
│   ├── src/main/java/    # Código fonte Java
│   ├── src/test/java/    # Testes unitários
│   ├── pom.xml           # Dependências Maven
│   └── start-app.sh      # Script de inicialização
├── frontend/             # Frontend React
│   ├── src/              # Código fonte React
│   ├── package.json      # Dependências Node.js
│   └── vite.config.js    # Configuração Vite
└── Docs/                 # Documentação adicional
```

## Execução de Testes

### Backend
```bash
cd catsapi
./mvnw test
```

### Frontend
```bash
cd frontend
npm test
```

## Tecnologias Utilizadas

### Backend
- Spring Boot 3.4.1
- Spring Framework 6.2.1
- Java 21
- H2 Database
- Maven
- JUnit 5

### Frontend
- React 18.3.1
- Vite 5.4.21
- JavaScript (ES6+)
- CSS3
- Axios

## Solução de Problemas

### Backend não inicia
- Verificar se a porta 8080 está livre
- Confirmar versão do Java (21+)

### Frontend não carrega
- Verificar se a porta 5173 está livre
- Executar `npm install` se necessário

### Problemas de CORS
- Verificar se o backend está rodando
- Confirmar configuração de CORS no CorsConfig.java

## Desenvolvimento

Para contribuir com o projeto:

1. Backend: Modificar arquivos em `catsapi/src/main/java/`
2. Frontend: Modificar arquivos em `frontend/src/`
3. Executar testes após modificações
4. Seguir convenções de código existentes

## Contato

Para dúvidas ou sugestões, consulte a documentação técnica nos arquivos README específicos de cada módulo.