FROM node:20-alpine

WORKDIR /app/medusa

COPY . .

RUN yarn --network-timeout 1000000 && \ 
    yarn global add @medusajs/medusa-cli typescript && \
    yarn build

COPY . .

EXPOSE 9000
EXPOSE 7001

ENTRYPOINT ["./reset.sh"]