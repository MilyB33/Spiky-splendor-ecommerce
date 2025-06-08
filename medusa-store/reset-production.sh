#!/bin/sh

medusa migrations run

# medusa seed --seed-file="./data/seed-production.json" - Commented out to only populate data once

medusa start