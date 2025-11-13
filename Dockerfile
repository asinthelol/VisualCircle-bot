# Stage 1: Build TypeScript
FROM node:22 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript and generate Prisma Client
RUN npm run build

# Stage 2: Production runtime
FROM node:22

WORKDIR /app

# Copy package files
COPY --from=builder /app/package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm ci --omit=dev

# Copy generated Prisma Client from builder
COPY --from=builder /app/src/generated ./src/generated

# Copy built code from builder
COPY --from=builder /app/dist ./dist

# Create directory for saved images
RUN mkdir -p ./src/user-content/images && \
    chown -R node:node /app

# Run as non-root user
USER node

ENV NODE_ENV=production

# Start the bot
CMD ["node", "dist/index.js"]