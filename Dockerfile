# FROM node AS development
# WORKDIR /app
# COPY package.json .
# RUN yarn install
# COPY . .
# EXPOSE 3000
# CMD ["yarn","start:client"]

# FROM node AS build
# ENV NODE_ENV=production
# WORKDIR /app
# COPY package.json .
# RUN yarn install
# COPY . .
# RUN yarn build

FROM node:latest AS server
RUN npm install -g json-server
WORKDIR /data
VOLUME [ "/data" ]
COPY db.json .
CMD ["json-server", "-p", "4001", "db.json"]

# FROM nginx:1.21.0-alpine AS production
# ENV NODE_ENV=production
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]