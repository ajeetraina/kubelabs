FROM node:18-alpine as builder

WORKDIR /app

# Copy the entire repository
COPY . /tmp/repo

# Install dependencies
COPY docusaurus/package*.json ./
RUN npm ci

# Install additional required dependencies
RUN npm install --save @docusaurus/plugin-ideal-image @docusaurus/plugin-client-redirects

# Copy docusaurus config and content
COPY docusaurus/ ./

# Create the docs directory
RUN mkdir -p /app/docs

# Copy markdown files from repository root
COPY README.md /app/docs/intro.md

# Run the content migration script if it exists
RUN if [ -f scripts/migrate-content.js ]; then \
      node scripts/migrate-content.js; \
    else \
      echo "Migration script not found"; \
    fi

# Run flattening script if it exists
RUN if [ -f scripts/flatten-docs.js ]; then \
      node scripts/flatten-docs.js; \
    else \
      echo "Flatten script not found"; \
    fi

# Run fix titles script if it exists
RUN if [ -f scripts/fix-titles.js ]; then \
      node scripts/fix-titles.js; \
    else \
      echo "Fix titles script not found"; \
    fi

# Build the static site
RUN npm run build

# Use Nginx to serve the static site
FROM nginx:alpine

# Copy the built site from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY docusaurus/nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]