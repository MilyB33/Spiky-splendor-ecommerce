FROM node:20-alpine

WORKDIR /app/medusa

COPY . .

RUN apk update && apk add --no-cache postgresql-client bash

RUN yarn --network-timeout 1000000 && \ 
    yarn global add @medusajs/medusa-cli typescript && \
    yarn build

EXPOSE 9000
EXPOSE 7001

ENTRYPOINT ["./reset.sh"]