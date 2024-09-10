FROM node:20-alpine

WORKDIR /app/medusa

COPY package.json .
COPY develop.sh .
COPY yarn.* .

# Install dependencies
RUN yarn --network-timeout 1000000

# Install medusa CLI
RUN yarn global add @medusajs/medusa-cli

# Add the remaining files
COPY . .

# Set the default command to run the container starts
ENTRYPOINT "./develop.sh" 