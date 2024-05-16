FROM node:21 AS builder

RUN apt-get update && apt-get install -y maven

COPY package*.json /home/ubuntu/site-institucional
WORKDIR /home/ubuntu/site-institucional
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /home/ubuntu/site-institucional/dist /var/www/html

COPY nginx.conf /etc/nginx/sites-available/default

# Expose port 80
EXPOSE 80

# Reload Nginx
RUN nginx -s reload

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
