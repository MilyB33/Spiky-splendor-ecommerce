#!/bin/sh

#Run migrations to ensure the database is updated
medusa migrations run

# Copy static folder to dist folder
cp -R ./static ./dist

# Remove all contents of uploads folder
rm -rf ./uploads/*

# Populate the database
medusa seed --seed-file="./data/seed.json"

#Start development environment
medusa develop