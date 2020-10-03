FROM node:12.6-alpine

WORKDIR /app

COPY ./* /app

EXPOSE 3000

RUN apk update && \
    apk add git && \
    yarn install && \
    yarn start