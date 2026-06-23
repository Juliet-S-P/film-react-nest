#!/bin/sh
set -e

echo "⏳ Waiting for Postgres..."

until pg_isready -h "$DATABASE_HOST" -p "$DATABASE_PORT" -U "$DATABASE_USERNAME"; do
  sleep 2
done

echo "✅ Postgres is ready"

echo "🚀 Running migrations..."
npm run migration:run

echo "🔍 Checking if seed needed..."

node dist/seeds/cli.js

echo "🎬 Starting app..."
node dist/main.js