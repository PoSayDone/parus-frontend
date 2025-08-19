# Parus Frontend

This is the frontend for the Parus e-commerce platform.

## Features

- Product catalog with categories
- Blog posts
- Admin panel for managing products, categories, and posts
- Contact modal instead of buying functionality

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up the database:
   ```bash
   bunx prisma migrate dev
   ```

3. Seed the database with initial data:
   ```bash
   bun run seed
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

## Admin Panel

The admin panel is available at `/admin`. You can manage:

- Products
- Categories
- Blog posts

## Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/parus?schema=public"
```

## Deployment

The application is deployed using Docker. The Dockerfile is configured to build and run the Next.js application.