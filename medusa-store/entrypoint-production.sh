#!/bin/sh

#Run migrations to ensure the database is updated
medusa migrations run

#Build medusa
medusa build

#Start environment
medusa start