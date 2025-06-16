# The Cats API

API REST para gerenciamento de raças e imagens de gatos, integrando com [TheCatAPI](https://thecatapi.com/).

## Funcionalidades

- Importação de raças de gatos e suas imagens a partir da TheCatAPI.
- Importação de imagens por categoria (ex: gatos de chapéu, óculos).
- Consulta de raças por temperamento, origem ou ID.
- Exposição de endpoints REST para manipulação e consulta dos dados.
- Banco de dados em memória (H2) para desenvolvimento e testes.
- Pronto para monitoramento com Prometheus e Grafana.

## Endpoints

### Raças

- `POST /racas/importar`  
  Importa todas as raças e imagens da TheCatAPI.

- `GET /racas`  
  Lista todas as raças cadastradas.

- `GET /racas/{id}`  
  Busca raça pelo ID.

- `GET /racas/temperamento/{valor}`  
  Busca raças por temperamento.

- `GET /racas/origem/{valor}`  
  Busca raças por origem.

### Imagens

- `POST /imagens/importar/chapeu`  
  Importa imagens de gatos com chapéu.

- `POST /imagens/importar/oculos`  
  Importa imagens de gatos com óculos.

## Como rodar

### Pré-requisitos

- Java 21+
- Maven

### Executando localmente

```sh
./mvnw spring-boot:run
```

Acesse o H2 Console em:  
`http://localhost:8080/h2-console`  
(JDBC URL: `jdbc:h2:mem:cats`, usuário: `sa`, senha: em branco)

### Docker

Para rodar com Docker Compose (app, H2, Prometheus, Grafana):

Imagem disponibilizada no DockerHub.

```sh
docker pull ppedde/catsapi:0.0.1
```

## Docker Hub

O namespace de usuário [`ppedde`](https://hub.docker.com/u/ppedde) no Docker Hub possui três repositórios públicos:

- **catsapi-grafana**
- **catsapi-prometheus**
- **catsapi**

Cada repositório contém imagens Docker, com o último envio realizado há cerca de 11 horas. Todos possuem visibilidade pública.

A interface do Docker Hub permite fácil navegação entre repositórios, colaborações, configurações, faturamento, uso, pulls e armazenamento, proporcionando um ambiente profissional e organizado para o gerenciamento das imagens.

```sh
docker-compose up --build
```

A aplicação estará em `http://localhost:8080`. 
Precisamos popular o BD H2. Use a collection do Insomnia para isso. Método POST (importar racas).
Após poderá rodar no insomnia o método GET para testar as API.

## Configuração

Veja [src/main/resources/application.yml](src/main/resources/application.yml) para configurações de banco, JPA e endpoints de monitoramento.

## Monitoramento

- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000`
- Usuário padrão do Grafana admin e senha admin. Primeiro acesso irá solicitar a troca da senha.
- Dashboard já criado e configurado.

## Estrutura do Projeto

- [`com.priscila.catsapi.controller`](src/main/java/com/priscila/catsapi/controller) — Controllers REST
- [`com.priscila.catsapi.service`](src/main/java/com/priscila/catsapi/service) — Serviços de negócio
- [`com.priscila.catsapi.model`](src/main/java/com/priscila/catsapi/model) — Entidades JPA
- [`com.priscila.catsapi.repository`](src/main/java/com/priscila/catsapi/repository) — Repositórios Spring Data

---

##  Estratégia de Testes

🔹 **1. Testes de Unidade (Unit Tests)**  
**Objetivo:** Testar métodos isoladamente, sem dependências externas.  
**Como aplicar:** Usando JUnit e Mockito.  
**Exemplo:** Testar o método `importarRacas()` da `RacaServiceImpl`, simulando as chamadas da API externa com Mockito.  
**Benefício:** Garante que cada pedaço da lógica funciona corretamente e permite refatorações seguras.

🔹 **2. Testes Integrados (Integration Tests)**  
**Objetivo:** Testar se os componentes funcionam juntos (ex: serviço + repositório + banco).  
**Como aplicar:** Com `@SpringBootTest` e banco em memória H2.  
**Exemplo:** Verificar se uma requisição à `/racas` persiste corretamente os dados no banco.  
**Benefício:** Valida o comportamento do sistema como um todo, incluindo persistência.

🔹 **3. Testes de Regressão**  
**Objetivo:** Garantir que novas mudanças não quebrem funcionalidades já existentes.  
**Como aplicar:** Automatizando testes de unidade e integração, e executando-os em cada build (CI/CD com GitHub Actions, por exemplo).  
**Exemplo:** Testes da `ImagemService` e `RacaService` executados automaticamente após push no repositório.  
**Benefício:** Dá confiança em cada alteração feita no código.

🔹 **4. Testes de Performance**  
**Objetivo:** Avaliar tempo de resposta e consumo de recursos sob carga.  
**Como aplicar:** Com ferramentas como JMeter, Gatling ou Spring Actuator + Micrometer + Prometheus + Grafana.  
**Exemplo:** Medir o tempo de resposta da API `/racas/importar` sob 100 requisições simultâneas.  
**Benefício:** Garante que a aplicação se comporta bem mesmo com muitos usuários.

🔹 **5. Testes de Resiliência**  
**Objetivo:** Avaliar como o sistema reage a falhas externas.  
**Como aplicar:** Simulando falhas com Mockito (ex: erro na API externa), ou usando ferramentas como Chaos Monkey for Spring Boot.  
**Exemplo:** Simular falha no RestTemplate e verificar se a aplicação trata a exceção corretamente e retorna erro amigável.  
**Benefício:** Aumenta a robustez da aplicação, prevenindo falhas em produção.

🔹 **6. Testes de Cobertura (Code Coverage)**  
**Objetivo:** Verificar o quanto do seu código foi testado.  
**Como aplicar:** Usando Jacoco.  
**Exemplo:** Acompanhar a porcentagem de cobertura de pacotes como controller, service, aop etc.  
**Benefício:** Ajuda a identificar trechos de código não testados.

🔹 **7. Testes Manuais com Pós-condições e Casos de Uso**  
**Objetivo:** Validar casos que exigem análise visual ou humana.  
**Como aplicar:** Criando um roteiro de testes com fluxos manuais (ex: cadastro de raça, consulta de imagens).  
**Exemplo:** Verificar se o JSON de retorno traz todos os campos esperados, testando via Postman.  
**Benefício:** Detecta problemas que automatizações podem não captar.

**Bônus: Testes Automatizados com Selenium (para interfaces web)**  
Se sua aplicação tiver frontend, você pode usar Selenium para validar cliques, campos, e comportamento visual.

##  Documentação da API CatsAPI

### Endpoints Disponíveis

#### 1. Raças de Gatos

- **GET `/racas/importar`**  
  Importa raças da API externa TheCatAPI e persiste no banco de dados.

- **GET `/racas/{id}`**  
  Retorna uma raça específica por ID.

- **GET `/racas/temperamento/{valor}`**  
  Lista raças com o temperamento informado.

- **GET `/racas/origem/{valor}`**  
  Lista raças pela origem.

#### 2. Imagens de Gatos

- **GET `/imagens/categoria/{categoria}`**  
  Busca imagens da categoria desejada na API externa.

#### 3. Métricas e Redirect

- **GET `/`**  
  Redireciona para `/actuator/prometheus`.

- **GET `/teste-aop/ok`**  
  Retorna "Sucesso!" (teste de AOP).

- **GET `/teste-aop/erro`**  
  Gera exceção simulada (usado para medir métricas).

---

### Aplicação de SOLID e Clean Architecture

#### S – Single Responsibility Principle
Cada classe possui uma única responsabilidade:  
- `RacaServiceImpl` trata apenas da lógica de raças.  
- `ImagemServiceImpl` cuida apenas de imagens.  
- `MetricsAspect` trata apenas da lógica de métricas.

#### O – Open/Closed Principle
A classe `MetricsAspect` está aberta para extensão com anotações como `@MetricAndLog`, mas fechada para modificação direta.

#### L – Liskov Substitution Principle
O uso de interfaces como `RacaRepository` e `ImagemRepository` permite substituição por implementações mockadas nos testes.

#### I – Interface Segregation Principle
Os serviços implementam apenas as interfaces necessárias, e os DTOs separam a lógica de transferência de dados.

#### D – Dependency Inversion Principle
O Spring injeta dependências via `@Autowired`, desacoplando as classes de suas implementações concretas.

---

### Aplicação de Clean Architecture

| Camada         | Componentes                                 | Responsabilidade                                 |
| -------------- | ------------------------------------------- | ------------------------------------------------ |
| Controller     | RacaController, ImagemController            | Entrada da aplicação, expõe endpoints REST       |
| Service        | RacaServiceImpl, ImagemServiceImpl          | Regras de negócio, manipulação de dados          |
| Domain (Model) | Raca, Imagem, RacaDto                       | Entidades centrais e DTOs                        |
| Infrastructure | MetricsAspect, RestTemplate, API TheCatAPI  | Integração com Prometheus e APIs externas        |

---

###  Aplicação de Testes

- **Teste de Unidade:**  
  `RacaServiceImplTest`, `ImagemServiceImplTest` validam os métodos de negócio.

- **Teste de Integração:**  
  `RacaControllerTest`, `ImagemControllerTest` testam os endpoints REST.

- **Teste de AOP e Métricas:**  
  `MetricsAspectTest` testa o interceptor de métricas via `@MetricAndLog`.

- **Cobertura com JaCoCo:**  
  Projetada para cobertura >80%. Verificada em `target/site/jacoco/index.html`.


## Licença

MIT

---
Inspirado por [TheCatAPI](https://thecatapi.com/).
