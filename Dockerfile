FROM node:21-alpine AS build

WORKDIR /home/ubuntu/Site-institucional/

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /home/ubuntu/Site-institucional/dist .

COPY default /etc/nginx/sites-available/

EXPOSE 80

EXPOSE 443

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]