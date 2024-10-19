#!/bin/sh

# Check if enough arguments are provided
if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <db_user> <db_name>"
  exit 1
fi

# Assign arguments to variables
DB_USER="$1"
DB_NAME="$2"

# Dynamically find the PostgreSQL container name
CONTAINER_NAME=$(docker ps --filter "ancestor=postgres:16-alpine" --format '{{.Names}}')

# If container name is not found, try finding by a partial name (useful if image name isn't 'postgres')
if [ -z "$CONTAINER_NAME" ]; then
  CONTAINER_NAME=$(docker ps --filter "name=postgres" --format '{{.Names}}')
fi

# Check if the container was found and is running
if [ -n "$CONTAINER_NAME" ]; then
  echo "Entering PostgreSQL container: $CONTAINER_NAME"

  # Enter the container and connect to the database using psql
  docker exec -it "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME"
else
  echo "Error: No running PostgreSQL container found."
  exit 1
fi
