# Use a multi-stage build for efficiency
FROM node:20-alpine3.18 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build stage
FROM base AS builder
COPY . .
RUN npm run build

# Production image
FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
CMD ["npm", "start"]
