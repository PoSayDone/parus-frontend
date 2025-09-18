FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
	openssl \
	&& rm -rf /var/lib/apt/lists/*

# Accept build args and set them as environment variables
ARG DATABASE_URL
ARG REVALIDATE_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV REVALIDATE_SECRET=$REVALIDATE_SECRET

# Install dependencies
FROM base AS deps
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ARG DATABASE_URL
ARG REVALIDATE_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV REVALIDATE_SECRET=$REVALIDATE_SECRET

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
