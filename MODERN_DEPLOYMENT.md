# Modern KubeLabs Deployment

This branch contains a modernized version of the KubeLabs documentation site, using Docusaurus instead of Jekyll. This README explains how to deploy and manage the site.

## Features

- **Docusaurus-based**: Modern React-based documentation framework
- **Improved Navigation**: Better sidebar, search functionality
- **Mobile-friendly**: Responsive design that works well on all devices
- **Dark Mode**: Built-in support for light and dark themes
- **Versioning Support**: Ability to maintain documentation for different versions
- **CI/CD Ready**: GitHub Actions workflow for automated builds and deployments
- **Kubernetes Deployment**: Ready-to-use Kubernetes manifests

## Local Development

```bash
# Install dependencies
cd docusaurus
npm install

# Run the migration script
node scripts/migrate-content.js

# Start the development server
npm start
```

## Deployment Options

### 1. GitHub Pages (Easiest)

The included GitHub Actions workflow will automatically build and deploy the site to GitHub Pages when changes are pushed to the main branch.

### 2. Kubernetes Deployment

To deploy to Kubernetes:

```bash
# Apply namespace
kubectl apply -f k8s/namespace.yaml

# Apply deployment, service, and ingress
kubectl apply -f k8s/
```

Make sure to update the ingress hostname in `k8s/ingress.yaml` to match your domain.

### 3. Docker Deployment

You can also run the site using Docker directly:

```bash
# Build the Docker image
docker build -t kubelabs:latest -f docusaurus/Dockerfile .

# Run the container
docker run -p 8080:80 kubelabs:latest
```

## Content Migration

The migration script (`docusaurus/scripts/migrate-content.js`) helps convert the existing Markdown files to the Docusaurus format. It:

1. Adds proper front matter
2. Fixes internal links
3. Maintains the directory structure

You can run it manually if you add new content:

```bash
cd docusaurus
node scripts/migrate-content.js
```

## Customization

- **Theme**: Edit colors in `docusaurus/src/css/custom.css`
- **Site Config**: Update `docusaurus/docusaurus.config.js`
- **Navigation**: Modify `docusaurus/sidebars.js`
- **Homepage**: Edit `docusaurus/src/pages/index.js`

## Monitoring

For production deployments, consider adding:

1. **Prometheus Metrics**: Add annotations to the Kubernetes deployment
2. **Grafana Dashboard**: For visualizing traffic and performance
3. **Uptime Monitoring**: Using a service like Pingdom or UptimeRobot
