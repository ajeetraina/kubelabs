FROM node:18-alpine as builder

WORKDIR /app

# Install dependencies
COPY docusaurus/package*.json ./
RUN npm ci

# Copy docusaurus config and content
COPY docusaurus/ ./
COPY README.md ./docs/intro.md

# Build the static site
RUN npm run build

# Use Nginx to serve the static site
FROM nginx:alpine

# Copy the built site from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY docusaurus/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]