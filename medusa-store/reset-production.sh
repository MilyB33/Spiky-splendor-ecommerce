#!/bin/sh

#Run migrations to ensure the database is updated
medusa migrations run

# Populate the database
medusa build

#Start development environment
medusa start