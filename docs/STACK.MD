# Project Tech Stack

## Overview
This document outlines the technology stack used in our project, providing developers and contributors with essential information about the tools, frameworks, and libraries we utilize.

## Core Technologies

### Frontend Framework
- **Next.js 14+** - React framework with App Router
  - Features: Server-side rendering, static site generation, API routes
  - Key packages: `next`, `next-auth`, `next-themes`

### Language
- **TypeScript** - Typed superset of JavaScript
  - Strict type checking enabled
  - ESLint and Prettier for code quality

### UI Components & Styling
- **Shadcn/UI** - Component library built on Radix UI
  - Customizable and accessible components
  - Tailwind CSS integration

### Styling
- **Tailwind CSS** - Utility-first CSS framework
  - Custom design system with CSS variables
  - Dark/light mode support

### Icons
- **Lucide React** - Beautiful & consistent icon toolkit
  - Tree-shakeable icon library
  - TypeScript support

## Backend & Database

### Database
- **PostgreSQL** - Relational database
  - Managed via **Supabase** or **Vercel Postgres**
  - Database migrations with Drizzle ORM

### ORM
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
  - Type-safe database queries
  - Migration management

### Authentication
- **Next-Auth.js** - Complete authentication solution
  - Multiple providers (Google, GitHub, email)
  - JWT and session management

## Development Tools

### Package Manager
- **pnpm** - Fast, disk space efficient package manager

### Deployment
- **Vercel** - Platform for frontend deployment
- **Vercel Postgres** or **Supabase** - Database hosting

### Testing
- **Jest** - Testing framework
- **React Testing Library** - React component testing
- **Cypress** or **Playwright** - E2E testing

### Code Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## Key Dependencies

### State Management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form management with validation
- **Zod** - TypeScript-first schema validation

### Utilities
- **date-fns** - Date manipulation
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging

### API & Data Fetching
- **TanStack Query** - Server state management
- **SWR** - Data fetching (alternative)

## Development Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- pnpm installed globally

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm db:push

# Start development server
pnpm dev