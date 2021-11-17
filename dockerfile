FROM node:lts-alpine3.11

RUN apk update && apk upgrade && \
  apk add --no-cache bash

RUN mkdir ./api
COPY . ./api

WORKDIR /api

EXPOSE 3000
CMD ["./init.sh"]