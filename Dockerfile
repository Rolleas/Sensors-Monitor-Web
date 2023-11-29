FROM node:18 AS builder

WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY .htaccess /usr/share/nginx/html

COPY --from=builder /app/dist/sensors-web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
