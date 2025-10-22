#!/bin/bash

# Script para compilar e executar a aplicação Spring Boot
# Cats API - Backend

echo "Cats API - Iniciando aplicação..."
echo ""

# Verificar se o Java está disponível
if ! command -v java &> /dev/null; then
    echo "ERRO: Java não encontrado. Instale Java 21 ou superior."
    exit 1
fi

# Mostrar versão do Java
echo "Versão do Java:"
java -version
echo ""

# Ir para o diretório do projeto
cd "$(dirname "$0")"

echo "Diretório atual: $(pwd)"
echo ""

# Verificar se o Maven está disponível
if command -v mvn &> /dev/null; then
    echo "Usando Maven instalado no sistema..."
    MVN_CMD="mvn"
elif [ -f "./mvnw" ]; then
    echo "Usando Maven Wrapper..."
    chmod +x ./mvnw
    MVN_CMD="./mvnw"
else
    echo "ERRO: Maven não encontrado. Instale Maven ou certifique-se que mvnw está presente."
    exit 1
fi

echo ""
echo "Compilando projeto..."
$MVN_CMD clean compile -q

if [ $? -ne 0 ]; then
    echo "ERRO: Erro na compilação"
    exit 1
fi

echo "Compilação concluída"
echo ""

echo "Gerando JAR executável..."
$MVN_CMD package -DskipTests -q

if [ $? -ne 0 ]; then
    echo "ERRO: Erro ao gerar JAR"
    exit 1
fi

echo "JAR gerado com sucesso"
echo ""

# Encontrar o JAR gerado
JAR_FILE=$(find target -name "*.jar" -not -name "*sources.jar" -not -name "*javadoc.jar" | head -1)

if [ -z "$JAR_FILE" ]; then
    echo "ERRO: JAR não encontrado"
    exit 1
fi

echo "Iniciando aplicação..."
echo "JAR: $JAR_FILE"
echo ""
echo "Aplicação estará disponível em:"
echo "   - Backend API: http://localhost:8080"
echo "   - H2 Console: http://localhost:8080/h2-console"
echo "   - Health Check: http://localhost:8080/api/health"
echo "   - API Info: http://localhost:8080/api/info"
echo ""
echo "Para parar a aplicação, pressione Ctrl+C"
echo ""

# Executar a aplicação
java -jar "$JAR_FILE"