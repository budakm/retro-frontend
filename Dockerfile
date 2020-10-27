FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm install && npm run build


FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

