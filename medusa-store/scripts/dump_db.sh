#!/bin/sh

# Check if enough arguments are provided
if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <db_user> <db_name>"
  exit 1
fi

# Assign arguments to variables
DB_USER="$1"
DB_NAME="$2"
BACKUP_FILE="${DB_NAME}_schema_$(date +%Y%m%d_%H%M%S).sql"

# Dynamically find the PostgreSQL container name
CONTAINER_NAME=$(docker ps --filter "ancestor=postgres:16-alpine" --format '{{.Names}}')

# If container name is not found, try finding by a partial name (useful if image name isn't 'postgres')
if [ -z "$CONTAINER_NAME" ]; then
  CONTAINER_NAME=$(docker ps --filter "name=postgres" --format '{{.Names}}')
fi

# Check if the container was found and is running
if [ -n "$CONTAINER_NAME" ]; then
  echo "Dumping schema of PostgreSQL database: $DB_NAME from container: $CONTAINER_NAME"
  
  # Perform the schema-only dump using pg_dump inside the container
  docker exec -t "$CONTAINER_NAME" pg_dump -U "$DB_USER" -d "$DB_NAME" --schema-only > "$BACKUP_FILE"
  
  if [ $? -eq 0 ]; then
    echo "Schema backup successful: $BACKUP_FILE"
  else
    echo "Error: Schema backup failed."
    exit 1
  fi
else
  echo "Error: No running PostgreSQL container found."
  exit 1
fi
