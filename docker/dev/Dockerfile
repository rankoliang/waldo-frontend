FROM node:15.12.0-alpine3.13

WORKDIR /waldo_client

COPY package.json yarn.lock ./
RUN yarn install

CMD ["yarn", "start"]

EXPOSE 3000
