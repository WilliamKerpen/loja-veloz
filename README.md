# loja-veloz

[English](#english-en) | [Português](#português-pt-br)

---

# English - EN

## Summary
- About the Project
- Architecture
- Technologies
- How to Run
- CI/CD Pipeline
- Kubernetes Deployment
- Observability
- Project Structure
- Docker Images vs Docker Compose (API + PostgreSQL)

---

## About the Project

This repository was created for a DevOps course project.
The objective is to deliver a complete microservices-inspired ordering platform, evolving from local development with Docker Compose to a production-ready Kubernetes environment, including CI/CD, observability, security, and deployment strategies.

The project demonstrates:

- Containerization with Docker
- Local orchestration with Docker Compose
- Production orchestration with Kubernetes
- Secrets and configuration management
- Automated deployments
- Horizontal autoscaling
- Logging, metrics, and tracing foundations

---

## Architecture

The system follows a modular architecture.
Although implemented as a single Node.js API, the internal structure is divided into independent modules:

- Products
- Categories
- Users
- Orders
- Cart
- Payments
- Admin
- Email
- Logs
- Reports
- Returns
- Support
- Healthcheck

### High-Level Architecture

Local environment:
- Docker Compose (API + PostgreSQL)

Production environment:
- Kubernetes (Deployment, Service, StatefulSet, Ingress, HPA, Secrets, ConfigMaps, Jobs)

---

## Technologies

- Node.js 20
- Express.js
- PostgreSQL 15
- Docker
- Docker Compose
- Kubernetes
- GitHub Actions
- Stripe
- SMTP
- Prometheus (proposed)
- Grafana (proposed)
- OpenTelemetry (proposed)

---

## How to Run

### 1. Local Development (without Docker)

Install dependencies:

npm install

Start the API:

npm run dev

### 2. Local Environment with Docker Compose

Start all services:

docker compose up --build

Stop:

docker compose down

### 3. Environment Variables

Copy the example file:

cp .env.example .env

Fill in the required values:

- Database credentials
- Stripe secret key
- SMTP credentials
- Email configuration

### 4. Running Migrations and Seeds

Inside the API container:

docker exec -it loja_veloz_api npm run migrate
docker exec -it loja_veloz_api npm run seed

---

## CI/CD Pipeline

The CI/CD pipeline (GitHub Actions) performs:

1. Code checkout
2. Dependency installation
3. Linting and tests
4. Docker image build
5. Optional security scanning
6. Push to container registry
7. Deployment to Kubernetes cluster

Secrets are stored securely in GitHub Actions secrets.

---

## Kubernetes Deployment

The Kubernetes environment includes:

### Core Manifests

- Deployment for API
- Service (ClusterIP)
- Ingress
- StatefulSet for PostgreSQL
- Service for PostgreSQL
- ConfigMap
- Secret
- Horizontal Pod Autoscaler (HPA)
- Job for database seeds
- Namespace isolation

### Deployment Strategy

The project uses Rolling Update by default.
Alternative strategies include Blue/Green and Canary releases.

### Security Considerations

- Non-root containers
- Secrets stored in Kubernetes Secret
- Resource limits and requests
- Pod Security Admission compatibility

---

## Observability

### Logging

- Application logs via Express middleware
- Kubernetes logs via kubectl logs
- Proposal: Loki + Promtail + Grafana

### Metrics

- Proposal: Prometheus scraping API metrics
- HPA based on CPU utilization

### Tracing

- Proposal: OpenTelemetry instrumentation
- Jaeger or Tempo for distributed tracing

---

## Project Structure

backend/
│
├── src/
│   ├── modules/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── users/
│   │   ├── orders/
│   │   ├── cart/
│   │   ├── payments/
│   │   ├── admin/
│   │   ├── emails/
│   │   ├── logs/
│   │   ├── reports/
│   │   ├── returns/
│   │   ├── support/
│   │   └── health/
│   └── server.js
│
├── Dockerfile
├── docker-compose.yml
├── k8s/
│   ├── api-deployment.yaml
│   ├── api-service.yaml
│   ├── api-ingress.yaml
│   ├── db-statefulset.yaml
│   ├── db-service.yaml
│   ├── secret.yaml
│   ├── configmap.yaml
│   ├── hpa.yaml
│   ├── api-seeds-job.yaml
│   └── namespace.yaml
│
├── .env.example
└── README.md

---
## Docker Images vs Docker Compose (API + PostgreSQL)

In this project, the API and the PostgreSQL database are separate services, each with its own Docker image. This separation follows best practices for containerized architectures.

API Image (published to Docker Hub)

The API is built from the project's Dockerfile and published to Docker Hub:

wkerpen/loja-veloz-api:latest

This image contains:

Node.js runtime

Application source code

Dependencies

Migrations and seeds scripts

PostgreSQL Image (NOT published to Docker Hub)

The database is not part of the API image. Instead, Docker Compose pulls the official PostgreSQL image:

postgres:15-alpine

This image is maintained by the PostgreSQL team and is not built or published by this project.

Why the database is not inside the API image

Containers follow the single responsibility principle.

The API and the database must be independent services.

Each service can be updated, scaled, or replaced individually.

Production environments (Kubernetes) require separate resources:

Deployment for API

StatefulSet for PostgreSQL

What Docker Compose actually does

When running:

docker compose up --build

Docker Compose:

Builds the API image locally (or pulls it from Docker Hub)

Pulls the official PostgreSQL image

Creates the internal network (loja_veloz_net)

Creates the persistent volume (postgres_data)

Starts both containers

Ensures the API waits for the database (depends_on)

Injects environment variables from .env

Important Clarification

Running:

docker pull wkerpen/loja-veloz-api

only pulls the API image. It does not pull PostgreSQL, because the database is defined as a separate service in docker-compose.yml.

To bring both services up together, you must use:

docker compose up
---

# Português - PT-BR

## Sumário

- Sobre o Projeto
- Arquitetura
- Tecnologias
- Como executar
- Pipeline de CI/CD
- Implantação no Kubernetes
- Observabilidade
- Estrutura do projeto
- Imagens Docker vs. Docker Compose (API + PostgreSQL)

---

## Sobre o Projeto

Repositório criado para entrega de projeto da disciplina de DevOps.
O objetivo é demonstrar um fluxo completo de entrega contínua de uma plataforma de pedidos baseada em microsserviços, passando por:

- Docker
- Docker Compose
- Kubernetes
- CI/CD
- Observabilidade
- Estratégias de deploy
- Segurança

---

## Arquitetura

A aplicação segue uma arquitetura modular, com cada funcionalidade isolada em seu próprio módulo dentro da API Node.js.

Ambiente local:
- Docker Compose (API + PostgreSQL)

Ambiente de produção:
- Kubernetes (Deployment, Service, StatefulSet, Ingress, HPA, Secrets, ConfigMaps, Jobs)

---

## Tecnologias

- Node.js 20
- Express.js
- PostgreSQL 15
- Docker
- Docker Compose
- Kubernetes
- GitHub Actions
- Stripe
- SMTP
- Prometheus (proposta)
- Grafana (proposta)
- OpenTelemetry (proposta)

---

## Como executar

### 1. Ambiente local sem Docker

npm install
npm run dev

### 2. Ambiente local com Docker Compose

docker compose up --build

### 3. Variáveis de ambiente

cp .env.example .env

Preencha com suas credenciais.

### 4. Migrações e seeds

docker exec -it loja_veloz_api npm run migrate
docker exec -it loja_veloz_api npm run seed

---

## Pipeline de CI/CD

O pipeline automatiza:

- Instalação de dependências
- Lint e testes
- Build da imagem Docker
- Scan opcional
- Publicação da imagem
- Deploy no cluster Kubernetes

Secrets são armazenados no GitHub Actions.

---

## Implantação no Kubernetes

Inclui:

- Deployment da API
- Service
- Ingress
- StatefulSet do PostgreSQL
- Secrets
- ConfigMaps
- HPA
- Job de seeds
- Namespace dedicado

Estratégia de deploy padrão: Rolling Update.

---

## Observabilidade

### Logs

- Logs da aplicação
- Logs dos pods via Kubernetes

### Métricas

- Proposta: Prometheus + Grafana
- HPA baseado em CPU

### Tracing

- Proposta: OpenTelemetry + Jaeger

---

## Estrutura do projeto

backend/
├── src/
│   ├── modules/
│   └── server.js
├── Dockerfile
├── docker-compose.yml
├── k8s/
├── .env.example
└── README.md

---

## Imagens Docker vs. Docker Compose (API + PostgreSQL)

Neste projeto, a API e o banco de dados PostgreSQL são serviços separados, cada um com sua própria imagem Docker. Essa separação segue as melhores práticas para arquiteturas conteinerizadas.

Imagem da API (publicada no Docker Hub)

A API é construída a partir do Dockerfile do projeto e publicada no Docker Hub:

wkerpen/loja-veloz-api:latest

Esta imagem contém:

Runtime do Node.js

Código-fonte da aplicação

Dependências

Scripts de migração e *seeds*

Imagem do PostgreSQL (NÃO publicada no Docker Hub)

O banco de dados não faz parte da imagem da API. Em vez disso, o Docker Compose baixa a imagem oficial do PostgreSQL:

postgres:15-alpine

Essa imagem é mantida pela equipe do PostgreSQL e não é construída nem publicada por este projeto.

Por que o banco de dados não está dentro da imagem da API

Containers seguem o princípio de responsabilidade única.

A API e o banco de dados devem ser serviços independentes.

Cada serviço pode ser atualizado, escalado ou substituído individualmente.

Ambientes de produção (Kubernetes) exigem recursos separados:

Deployment para a API

StatefulSet para o PostgreSQL

O que o Docker Compose realmente faz

Ao executar:

docker compose up --build

O Docker Compose:

Constrói a imagem da API localmente (ou a baixa do Docker Hub)

Baixa a imagem oficial do PostgreSQL

Cria a rede interna (loja_veloz_net)

Cria o volume persistente (postgres_data)

Inicia ambos os containers

Garante que a API aguarde o banco de dados (depends_on)

Injeta variáveis ​​de ambiente a partir do arquivo .env

Esclarecimento importante

Executar:

docker pull wkerpen/loja-veloz-api

baixa apenas a imagem da API. Isso não baixa o PostgreSQL, pois o banco de dados está definido como um serviço separado no arquivo docker-compose.yml.

Para iniciar ambos os serviços juntos, você deve usar:

docker compose up