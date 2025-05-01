FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
COPY .env.local .env.local
RUN npm install --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3003
CMD ["node", "dist/main"]