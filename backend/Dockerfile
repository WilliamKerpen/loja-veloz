# ---------------------------------------------------------
# 1) Build Stage - Install dependencies
#    1) Etapa de build - Instala dependências
# ---------------------------------------------------------
FROM node:20-slim AS build

# Set working directory
# Define o diretório de trabalho
WORKDIR /app

# Copy only dependency files
# Copia apenas arquivos de dependência
COPY package*.json ./

# Install dependencies deterministically
# Instala dependências de forma determinística
RUN npm ci

# Copy the rest of the backend (excluding .dockerignore)
# Copia o restante do backend (exceto o que está no .dockerignore)
COPY . .

# ---------------------------------------------------------
# 2) Runtime Stage - Lightweight final image
#    2) Etapa de execução - Imagem final e leve
# ---------------------------------------------------------
FROM node:20-slim

# Set working directory
# Define o diretório de trabalho
WORKDIR /app

# Create non-root user for security
# Cria usuário não-root para segurança
RUN groupadd -r nodegroup && useradd -r -g nodegroup nodeuser

# Copy only necessary files from build stage
# Copia apenas o necessário da etapa de build
COPY --from=build /app /app

# Use secure non-root user
# Usa usuário seguro não-root
USER nodeuser

# Expose API port
# Expõe a porta da API
EXPOSE 3000

# Start application
# Inicia a aplicação
CMD ["npm", "start"]
