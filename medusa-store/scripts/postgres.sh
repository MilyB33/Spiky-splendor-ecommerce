#!/bin/sh

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <db_user> <db_name>"
  exit 1
fi

DB_USER="$1"
DB_NAME="$2"

CONTAINER_NAME=$(docker ps --filter "ancestor=postgres:16-alpine" --format '{{.Names}}')

if [ -z "$CONTAINER_NAME" ]; then
  CONTAINER_NAME=$(docker ps --filter "name=postgres" --format '{{.Names}}')
fi

if [ -n "$CONTAINER_NAME" ]; then
  echo "Entering PostgreSQL container: $CONTAINER_NAME"

  docker exec -it "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME"
else
  echo "Error: No running PostgreSQL container found."
  exit 1
fi
