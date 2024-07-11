# Use an official node image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173
# Build the React app
# RUN npm run build

# # Use an official nginx image to serve the build

# FROM nginx:alpine
# COPY --from=0 /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# Start nginx
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "dev"]
