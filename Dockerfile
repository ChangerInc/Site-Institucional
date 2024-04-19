# Use Node.js base image
FROM node:latest

# Create and set working directory
WORKDIR .

# Copy package.json and package-lock.json (if available)
COPY

# Install dependencies
RUN npm install

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

RUN nvm install 21

RUN nvm use 21

RUN nvm alias default 21

RUN node --version


# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["node", "dist/server.js"]