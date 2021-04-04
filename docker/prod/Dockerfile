FROM node:15.12.0-alpine3.13

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY public/ public/
COPY src/ src/

RUN yarn build
