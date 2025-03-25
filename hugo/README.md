# KubeLabs Hugo Implementation

This directory contains the Hugo implementation of the KubeLabs documentation site.

## Local Development

```bash
# Install Hugo (macOS)
brew install hugo

# Install Hugo (Linux)
sudo apt-get install hugo

# Run the content migration script
node scripts/migrate.js

# Run the Hugo server
hugo server
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Docker Deployment

```bash
# Build the Docker image
docker build -t kubelabs:latest -f Dockerfile .

# Run the container
docker run -p 8080:80 kubelabs:latest
```

## Structure

- `config.toml` - Hugo configuration file
- `content/` - Content directory (generated from markdown files)
- `static/` - Static files (CSS, JS, images)
- `scripts/` - Migration scripts

## Theme

We're using the [Learn theme](https://github.com/matcornic/hugo-theme-learn) with a custom Kubernetes color scheme.
