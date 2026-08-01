# ---------------------------------------------------------
# 1) Build Stage - Instala dependências
#    Build Stage - Install dependencies
# ---------------------------------------------------------
FROM node:20-alpine AS build

# Define o diretório de trabalho
# Set working directory
WORKDIR /app

# Copia apenas package.json e package-lock.json
# Copy only package.json and package-lock.json
COPY package*.json ./

# Instala dependências de forma determinística
# Install dependencies deterministically (faster & reproducible)
RUN npm ci

# Copia o restante do código da aplicação (exceto o que está no .dockerignore)
# Copy the rest of the application code (except what's in .dockerignore)
COPY . .

# ---------------------------------------------------------
# 2) Runtime Stage - Imagem final e leve
#    Runtime Stage - Final lightweight image
# ---------------------------------------------------------
FROM node:20-alpine

# Define o diretório de trabalho
# Set working directory
WORKDIR /app

# Cria usuário não-root para segurança
# Create non-root user for security
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Copia apenas o necessário da imagem de build
# Copy only necessary files from build stage
COPY --from=build /app /app

# Usa usuário seguro
# Use secure non-root user
USER nodeuser

# Expõe a porta da API
# Expose API port
EXPOSE 8080

# Comando final para iniciar a aplicação
# Final command to start the application
CMD ["npm", "start"]
