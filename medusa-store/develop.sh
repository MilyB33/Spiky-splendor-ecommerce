#!/bin/sh

#Run migrations to ensure the database is updated
medusa migrations run

# Populate the database
medusa seed --seed-file="./data/seed.json"

#Start development environment
medusa develop