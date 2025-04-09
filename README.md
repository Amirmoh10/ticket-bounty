# Ticket Bounty

## Description

A platform that allows users to create tickets/tasks with bounties attached. Users can earn money by completing tickets posted by others, creating an incentive-based task marketplace.

## Technology Stack

- Next.js 15.2
- React 19
- TypeScript
- PostgreSQL with Prisma ORM
- Zod
- Shadcn/ui

## Implemented Features

- Full ticket lifecycle management (create, read, update, delete) with status tracking (Open, In Progress, Done)
- Modern, responsive UI with dark/light theme support and clean card-based interface
- Multiple rendering patterns including SSR, SSG, ISR, and React Server Components for optimal performance
- Advanced caching strategies with request memoization and data revalidation
- Type safety with TypeScript and Zod validation for forms and API responses
- PostgreSQL database with Prisma ORM for type-safe database operations
- Component-based architecture with error boundaries and efficient state management
- Performance optimization with suspense, streaming, and loading states
- Clean, well-structured codebase with feature-based organization and consistent coding standards
- Accessibility-focused design with responsive layouts and modern UI components from shadcn/ui

## Development Status

Note: Some features are still in development, including authentication, sorting, pagination, password reset, email integration, and the core bounty payout feature.

## Running the Project

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
