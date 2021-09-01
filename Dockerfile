FROM node AS development
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn","start:client"]

FROM node AS build
ENV NODE_ENV=production
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM node:latest AS server
RUN npm install -g json-server
WORKDIR /data
COPY db.json ./data/db.json
EXPOSE 3000
CMD ["json-server", "-p", "3000", "--watch", "data/db.json"]

FROM nginx:1.21.0-alpine AS production
ENV NODE_ENV=production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]