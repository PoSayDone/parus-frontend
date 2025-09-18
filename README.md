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

For file uploads in production, you can use either AWS S3 or any S3-compatible provider:

### AWS S3 (default)
```
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-aws-bucket-name
```

### Other S3 Providers (MinIO, DigitalOcean Spaces, etc.)
```
S3_ACCESS_KEY_ID=your_s3_access_key_id
S3_SECRET_ACCESS_KEY=your_s3_secret_access_key
S3_REGION=us-east-1
S3_BUCKET=your-bucket-name
S3_ENDPOINT=https://your-s3-provider-endpoint.com
S3_FORCE_PATH_STYLE=false
S3_PUBLIC_URL=https://your-public-url.com
```

## Deployment

The application is deployed using Docker. The Dockerfile is configured to build and run the Next.js application.