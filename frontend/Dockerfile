FROM node:20-alpine

WORKDIR /app/frontend

COPY package.json .
COPY yarn.* .

# Install dependencies
RUN yarn --network-timeout 1000000

# Add the remaining files
COPY . .

# Set the default command to run the container starts
ENTRYPOINT ["yarn", "dev"]