#!/bin/sh

# Check if the seed flag is passed
SEED_FLAG=false

# Parse the arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --seed)
      SEED_FLAG=true
      ;;
  esac
  shift
done

# Run migrations to ensure the database is updated
medusa migrations run

# Run seed if the flag is true
if [ "$SEED_FLAG" = true ]; then
  echo "Seeding the database..."
  medusa seed --seed-file="./data/seed.json"
else
  echo "Skipping seed."
fi

# Start development environment
medusa develop
 