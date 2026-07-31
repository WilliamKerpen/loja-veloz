# ============================
# STAGE 1 — Build
# Etapa 1 — Construção
# ============================
FROM node:20-alpine AS build

WORKDIR /app

# Copy only the files needed to install dependencies
# Copia apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Install dependencies deterministically (faster & reproducible)
# Instala dependências de forma determinística (mais rápido e reproduzível)
RUN npm ci

# Copy the rest of the application code
# Copia o restante do código da aplicação
COPY . .

# ============================
# STAGE 2 — Runtime
# Etapa 2 — Execução
# ============================
FROM node:20-alpine

WORKDIR /app

# Create a non-root user for security
# Cria um usuário não-root para segurança
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Copy only the built application from the previous stage
# Copia apenas a aplicação construída no estágio anterior
COPY --from=build /app /app

# Remove development dependencies to reduce image size
# Remove dependências de desenvolvimento para reduzir o tamanho da imagem
RUN npm prune --production

# Adjust permissions so the non-root user can access the app
# Ajusta permissões para que o usuário não-root possa acessar a aplicação
RUN chown -R nodeuser:nodegroup /app

# Switch to the non-root user
# Troca para o usuário não-root
USER nodeuser

# Expose the application port
# Expõe a porta da aplicação
EXPOSE 3000

# Healthcheck to ensure the container is healthy
# Healthcheck para garantir que o container está saudável
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget