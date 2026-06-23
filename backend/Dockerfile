FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

# PostgreSQL client нужен для wait / диагностики
RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm ci --omit=dev

# только runtime артефакты
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# entrypoint должен быть в dist-safe режиме (ВАЖНО)
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

CMD ["/entrypoint.sh"]