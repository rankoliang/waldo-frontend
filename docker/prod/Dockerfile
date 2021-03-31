FROM node:15.12.0-alpine3.13 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY ./ /app

RUN yarn build

FROM nginx:1.19.9-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
