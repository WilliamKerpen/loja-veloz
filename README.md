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
