# Use node:21 as the base image for building
FROM node:21 AS builder

# Update and install maven
RUN apt-get update && apt-get install -y maven

# Set the working directory
WORKDIR /home/ubuntu/site-institucional

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

RUN pwd

# Clean npm cache and remove node_modules and package-lock.json if exists
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Use nginx:alpine as the base image for the final stage
FROM nginx:alpine

RUN rm -rf /var/www/html/*

# Copy the built project from the builder stage to the nginx html directory
COPY --from=builder /home/ubuntu/site-institucional/dist /var/www/html

# Copy the nginx configuration file
COPY default /etc/nginx/sites-available/

# Expose port 80
EXPOSE 8080

EXPOSE 443

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
