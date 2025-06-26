FROM node:20-alpine

WORKDIR /app/frontend

COPY . .

RUN yarn --network-timeout 1000000 && yarn cache clean

ENTRYPOINT ["yarn", "dev"]