# 1. Choose a base image. Here, Node.js is used.
FROM node:lts-alpine as build-stage

# 2. Set the working directory in the Docker container
WORKDIR /app

# 3. Copy the package.json and package-lock.json. This is for efficient Docker caching.
COPY package*.json ./

# 4. Install the Vue CLI
RUN npm install -g @vue/cli

# 5. Install all project dependencies
RUN npm install

# 6. Copy the remaining project files into the Docker container
COPY . .

# 7. Build the project for production
RUN npm run build

# 8. The second stage of the build, where the server is set up
FROM nginx:stable-alpine as production-stage

# 9. Copy the compiled application from the previous stage into the Nginx server
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 10. Expose port 80 of the Docker container
EXPOSE 80

# 11. Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
