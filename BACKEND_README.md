# Cats API - Backend Spring Boot

## 🚀 Versão Atualizada

Esta versão foi atualizada para:
- **Spring Boot 3.4.1** (upgrade do Spring Framework para 6.2.1)
- **Java 21**
- **Hibernate 6.6.4**
- **Tomcat 10.1.34**

## 🔧 Configurações

### CORS
O backend está configurado para aceitar requisições de:
- `http://localhost:3000` (React dev server padrão)
- `http://localhost:5173` (Vite dev server padrão)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

### Banco de Dados
- **H2 Database** em memória
- Console H2 disponível em: http://localhost:8080/h2-console
- Configuração: `jdbc:h2:mem:cats`, usuário: `sa`, senha: (vazia)

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Status da aplicação
- `GET /api/info` - Informações sobre a API e endpoints disponíveis

### Raças de Gatos
- `GET /racas` - Listar todas as raças
- `POST /racas/importar` - Importar raças da API externa
- `GET /racas/importar` - Importar raças da API externa (alternativo)
- `GET /racas/{id}` - Buscar raça por ID
- `GET /racas/temperamento/{valor}` - Buscar raças por temperamento
- `GET /racas/origem/{valor}` - Buscar raças por origem

### Imagens
- `GET /imagens` - Listar todas as imagens
- `POST /imagens/importar/{categoria}` - Importar imagens por categoria
- `GET /imagens/importar/{categoria}` - Importar imagens por categoria (alternativo)
- `GET /imagens/categoria/{categoria}` - Buscar imagens por categoria
- `POST /imagens/importar/chapeu` - Importar imagens de chapéu (compatibilidade)
- `POST /imagens/importar/oculos` - Importar imagens de óculos (compatibilidade)

### Monitoramento
- `GET /actuator/health` - Health check do Spring Actuator
- `GET /actuator/metrics` - Métricas da aplicação
- `GET /actuator/prometheus` - Métricas em formato Prometheus

## 🚀 Como Executar

### Pré-requisitos
- Java 21+
- Maven 3.8+

### Comandos
```bash
# Compilar
mvn clean compile

# Executar testes
mvn test

# Executar aplicação
mvn spring-boot:run
```

A aplicação será iniciada em: http://localhost:8080

## 🔗 Integração com Frontend

O backend está totalmente preparado para integração com o frontend React:

1. **CORS configurado** para permitir requisições do Vite/React
2. **Endpoints flexíveis** com suporte a POST e GET para importação
3. **Respostas em JSON** com mensagens de sucesso
4. **Error handling** global para APIs REST
5. **Health checks** para verificação de status

### Exemplo de uso com o frontend:

```javascript
// Verificar status da API
const healthCheck = await fetch('http://localhost:8080/api/health');

// Importar raças (com fallback)
try {
  const response = await fetch('http://localhost:8080/racas/importar', {
    method: 'POST'
  });
} catch (error) {
  // Fallback para GET
  const response = await fetch('http://localhost:8080/racas/importar');
}

// Listar raças
const racas = await fetch('http://localhost:8080/racas');

// Importar imagens por categoria
const response = await fetch('http://localhost:8080/imagens/importar/fofa', {
  method: 'POST'
});
```

## 🛠️ Melhorias Implementadas

1. **CORS Global**: Configuração centralizada para aceitar requisições do frontend
2. **Endpoints Duplos**: Suporte a POST e GET para importação (compatibilidade)
3. **Respostas Melhoradas**: Retorno de mensagens de sucesso em vez de void
4. **Health Checks**: Endpoints para verificação de status da aplicação
5. **Documentação da API**: Endpoint `/api/info` com lista de todos os endpoints
6. **Configuração Flexível**: Propriedades CORS externalizadas no application.yml
7. **Testes Atualizados**: Compatibilidade com Spring Boot 3.4.1
8. **Deprecations Resolvidas**: Uso de APIs modernas do Spring

## 📈 Monitoramento

A aplicação inclui métricas e monitoramento via:
- **Spring Boot Actuator**
- **Micrometer com Prometheus**
- **Aspectos AOP** para logging e métricas customizadas
- **JaCoCo** para cobertura de testes

## 🔍 Logs

Os logs estão configurados com padrão colorido e níveis específicos:
- **DEBUG** para pacotes da aplicação (`com.priscila.catsapi`)
- **WARN** para Spring Framework
- **INFO** para outros componentes

## 🧪 Testes

```bash
# Executar todos os testes
mvn test

# Executar testes com cobertura
mvn clean test jacoco:report

# Gerar relatório de cobertura
# Relatório disponível em: target/site/jacoco/index.html
```

## 🎯 Próximos Passos

Para finalizar a integração com o frontend:

1. ✅ Backend pronto com CORS configurado
2. ✅ Endpoints compatíveis com POST/GET
3. ✅ Health checks implementados
4. 🔄 Frontend React com Vite (em desenvolvimento no PR)
5. 🔄 Deploy conjunto (backend + frontend)

O backend está totalmente preparado para funcionar com o frontend React que você desenvolveu!