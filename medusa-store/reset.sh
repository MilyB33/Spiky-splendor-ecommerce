#!/bin/sh

set -a ; . ./.env ; set +a

DB_USER=$DATABASE_USERNAME
DB_NAME=$DATABASE_NAME
DB_HOST=$DATABASE_HOST
DB_PORT=$DATABASE_PORT
DB_PASSWORD=$DATABASE_PASSWORD

export PGPASSWORD="$DB_PASSWORD"

medusa migrations run

cp -R ./static ./dist

rm -rf ./uploads/*

DB_EXISTS=$(psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1)

if [ $? -eq 0 ]; then
  echo "Database $DB_NAME exists."
  
  PRODUCT_COUNT=$(psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$DB_NAME" -tAc "SELECT COUNT(*) FROM product")

  if [ "$PRODUCT_COUNT" -gt 0 ]; then
    echo "The product table has records."
  else
    echo "The product table has no records."
    medusa seed --seed-file="./data/seed.json"
  fi
else
  echo "Database $DB_NAME does not exist."
fi

medusa develop