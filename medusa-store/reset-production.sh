#!/bin/sh

medusa migrations run

medusa seed --seed-file="./data/seed.json"

medusa start