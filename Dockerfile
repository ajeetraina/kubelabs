FROM ruby:3.2-alpine as builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache build-base gcc cmake git

# Copy Gemfiles and install dependencies
COPY Gemfile* ./
RUN gem install bundler && \
    bundle install

# Copy the rest of the application
COPY . .

# Build the Jekyll site
RUN bundle exec jekyll build

# Use Nginx to serve the static site
FROM nginx:alpine

# Copy the built site from the builder stage
COPY --from=builder /app/_site /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
