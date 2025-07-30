# High Level Architecture

## Technical Summary

The AI/MLOps consultancy website will be built as a simple, decoupled architecture with a FastAPI backend handling form submissions and data storage, and a Next.js frontend deployed to Vercel for optimal performance. The backend will be self-hosted using Docker Compose, providing PostgreSQL for data persistence and FastAPI for API endpoints. This approach keeps complexity minimal while allowing for easy local development and future scaling.
Platform and Infrastructure Choice
Platform: Hybrid Approach

Frontend: Vercel (Next.js hosting)
Backend: Self-hosted with Docker Compose (FastAPI + PostgreSQL)
Development: Local Docker environment

## Key Services:

Vercel: Next.js hosting and CDN
Docker Compose: Local/self-hosted backend
PostgreSQL: Form submissions and content storage
FastAPI: REST API for form handling

## Deployment Host:

Frontend: Vercel's global CDN
Backend: My own VPS/server

## Repository Structure

Structure: Single Repository (Simple Monolith)
Organization:
project-root/
├── frontend/ # Next.js application
├── backend/ # FastAPI application
├── docker-compose.yml # Full stack local development
└── README.md # Setup instructions

## High Level Architecture Diagram

mermaidgraph TD
subgraph "Client"
A[Browser]
end

    subgraph "Frontend - Vercel"
        A --> B[Next.js App]
        B --> C[Static Pages]
        B --> D[React Components]
    end

    subgraph "Backend - Self Hosted"
        B --> E[FastAPI Server]
        E --> F[PostgreSQL DB]
    end

    B -.-> G[API Calls for Forms]
    G --> E

## Architectural Patterns

Simple Client-Server: Traditional REST API with separate frontend - Rationale: Easy to understand, develop, and debug
Static Generation: Pre-render marketing pages for performance - Rationale: Best SEO and page speed for content pages
API-First Backend: FastAPI handles all dynamic operations - Rationale: Clear separation of concerns
Container-Based Development: Docker Compose for consistent environments - Rationale: Easy setup for any developer
CORS-Enabled API: Allow frontend-backend communication - Rationale: Necessary for decoupled architecture
