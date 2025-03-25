# Build stage
FROM klakegg/hugo:latest-alpine AS builder

WORKDIR /src

# Copy Hugo config and content
COPY hugo/ /src/
COPY README.md /src/content/_index.md

# Download the theme
RUN mkdir -p themes/learn && \
    wget -qO- https://github.com/matcornic/hugo-theme-learn/archive/refs/heads/master.tar.gz | \
    tar -xz --strip-components=1 -C themes/learn

# Build the site
RUN hugo --minify

# Final stage
FROM nginx:alpine

# Copy the built site
COPY --from=builder /src/public /usr/share/nginx/html

# Copy custom Nginx configuration
COPY hugo/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]