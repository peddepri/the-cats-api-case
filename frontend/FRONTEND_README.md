# Frontend - CatsAPI

Frontend minimalista em React + Vite para consumir a API CatsAPI.

## Como rodar

### Pré-requisitos

- Node.js 16+ e npm

### Instalação

```sh
cd frontend
npm install
```

### Executar em desenvolvimento

```sh
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (porta padrão do Vite).

### Build para produção

```sh
npm run build
```

### Preview da build

```sh
npm run preview
```

## Configuração

### URL do Backend

Por padrão, o frontend se conecta a `http://localhost:8080`.

Para alterar a URL base da API, defina a variável de ambiente `VITE_API_BASE`:

```sh
VITE_API_BASE=http://localhost:8080 npm run dev
```

Ou crie um arquivo `.env` na raiz do diretório `frontend`:

```
VITE_API_BASE=http://localhost:8080
```

## CORS

Se você encontrar erros de CORS ao tentar se conectar ao backend, será necessário habilitar CORS no Spring Boot.

### Opção 1: Anotação @CrossOrigin

Adicione `@CrossOrigin` nos controllers:

```java
@RestController
@RequestMapping("/racas")
@CrossOrigin(origins = "http://localhost:5173")
public class RacaController {
    // ...
}
```

### Opção 2: Configuração Global

Crie uma classe de configuração:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

## Endpoints utilizados

O frontend consome os seguintes endpoints do backend:

### Raças

- **POST /racas/importar** (com fallback para GET)  
  Importa raças da TheCatAPI para o banco H2.

- **GET /racas**  
  Lista todas as raças cadastradas.

- **GET /racas/{id}**  
  Busca raça por ID.

- **GET /racas/temperamento/{valor}**  
  Busca raças por temperamento.

- **GET /racas/origem/{valor}**  
  Busca raças por origem.

### Imagens

- **POST /imagens/importar/{categoria}**  
  Importa imagens de uma categoria (ex: chapeu, oculos).

- **GET /imagens/categoria/{categoria}**  
  Busca imagens por categoria (se implementado no backend).

## Uso

1. Certifique-se de que o backend está rodando em `http://localhost:8080`.

2. Inicie o frontend com `npm run dev`.

3. Clique em **"Importar raças"** para popular o banco H2 com dados da TheCatAPI.

4. Clique em **"Atualizar lista"** para ver as raças importadas.

5. Use o campo de categoria para importar imagens específicas (ex: "chapeu", "oculos").

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── BreedCard.jsx       # Card individual de raça
│   │   └── BreedsList.jsx      # Grade de cards de raças
│   ├── services/
│   │   └── api.js              # Funções para chamadas à API
│   ├── App.jsx                 # Componente principal
│   └── main.jsx                # Entry point
├── index.html                  # HTML base do Vite
├── package.json
├── vite.config.js
└── FRONTEND_README.md          # Este arquivo
```

## Observações

- Este é um frontend minimalista sem framework CSS. Estilos inline são usados para simplicidade.
- O componente `BreedCard` suporta tanto `imagens` quanto `images` para compatibilidade com diferentes formatos de resposta.
- A função `importBreeds` tenta POST primeiro e, se retornar 405/404, faz fallback para GET (conforme README do backend).

## Licença

MIT (mesmo do projeto principal)
