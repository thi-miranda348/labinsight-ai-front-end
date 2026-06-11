# LabInsight AI


![Next JS](https://img.shields.io/badge/Next-black.svg?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)r

> A high-performance, containerized clinical dashboard built to manage and analyze AI-powered diagnostic lab results.

## Overview

LabInsight AI is a frontend architecture prototype designed to demonstrate production-ready data handling, secure routing, and responsive UI design. It simulates a provider portal where clinicians can securely log in, search patient records, and review complex metabolic and hematology panels using an AI diagnostic assistant.

<img width="2880" height="2994" alt="labinsight-ai-front-end vercel app_" src="https://github.com/user-attachments/assets/ef5674f9-43b1-4d4c-844f-2fe9604b199c" />

## Core Architecture & Features

### Secure Authentication & Routing

- **Client-Side Route Guards:** Implemented strict route protection preventing unauthenticated access to the main application shell.
- **Schema Validation:** Engineered robust login and registration flows utilizing **React Hook Form** and **Zod** to ensure type-safe, airtight user input validation prior to submission.
- **Global State Management:** Utilized **Zustand** to maintain secure, global user state across the application lifecycle without unnecessary prop-drilling.

### Advanced Data Management

- **Complex Data Grids:** Integrated **TanStack Table (React Table)** to handle highly responsive, sortable, and filterable diagnostic panels.
- **Stateful Data Fetching:** Implemented **TanStack Query (React Query)** to handle asynchronous data fetching, caching, and state synchronization.

### Quality Assurance & DevOps

- **Automated Testing:** Wrote unit tests using **Jest** and **React Testing Library** to verify authentication logic and complex UI state changes (e.g., dynamic table filtering).
- **Containerization:** Configured a multi-stage **Docker** build utilizing Next.js `standalone` output mode to create a lightweight, optimized, and cloud-ready production container.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & shadcn/ui
- **Data Layer:** TanStack Query & TanStack Table
- **Forms & State:** React Hook Form, Zod, Zustand
- **DevOps:** Docker, Jest

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Navigate to http://localhost:3000

## Docker Deploymnet

Build and run the highly optimized production container:

    ```bash
    docker build -t labinsight-ai .
    docker run -p 3000:3000 labinsight-ai
    ```

## Running tests

Execute the Jest test suite to verify component logic:
`bash
    npm run test
    `
