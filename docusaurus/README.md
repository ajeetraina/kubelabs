# KubeLabs Docusaurus Site

This directory contains the Docusaurus-based website for KubeLabs, a comprehensive collection of Kubernetes labs and tutorials.

## Website Structure

The website is organized with:

- Left sidebar: Organized list of all Kubernetes labs categorized by topic
- Right sidebar: Table of contents for the current page
- Center: The main content area showing the selected lab or tutorial

## Local Development

To start the development server locally:

```bash
# Install dependencies
cd docusaurus
npm install

# Run the content migration script
node scripts/migrate-content.js

# Start the development server
npm start
```

Your browser should automatically open to http://localhost:3000

## Building for Production

To build the website for production:

```bash
cd docusaurus
npm install
node scripts/migrate-content.js
npm run build
```

This will generate the static content in the `docusaurus/build` directory.

## Docker Deployment

You can also use Docker to build and run the site:

```bash
# Build the Docker image
docker build -t kubelabs:latest -f docusaurus/Dockerfile .

# Run the container
docker run -p 8080:80 kubelabs:latest
```

Then visit http://localhost:8080 in your browser.

## Kubernetes Deployment

To deploy to Kubernetes:

```bash
# Apply namespace
kubectl apply -f k8s/namespace.yaml

# Apply all resources
kubectl apply -f k8s/
```

## Structure of Content

The content is organized as follows:

1. **Getting Started** - Basic introduction to Kubernetes
2. **Core Kubernetes Concepts** - Fundamentals like Pods, ReplicaSets, Deployments
3. **Workload Controllers** - StatefulSets, DaemonSets, Jobs
4. **Scheduling & Resource Management** - Node affinity, taints, tolerations, autoscaling
5. **Networking** - Cluster networking, network policies, ingress
6. **Security & Access Control** - RBAC, security best practices
7. **Observability** - Monitoring, logging
8. **Package Management** - Helm, Service Catalog
9. **GitOps & CI/CD** - ArgoCD, GitLab, Jenkins
10. **Cloud Providers** - AWS EKS, Azure AKS, Google GKE, Linode LKE
11. **Development & Operations Tools** - Developer-focused and operator-focused tools
12. **Advanced Topics** - KEDA, Strimzi, Disaster Recovery, etc.
13. **Reference** - Cheat sheets and quick references

## Adding New Content

1. Add new markdown files in the appropriate directory under `docs/`
2. Update `sidebars.js` to include the new content in the navigation
3. Re-run the build process

## Customizing the Site

- `docusaurus.config.js` - Main configuration file
- `sidebars.js` - Navigation structure 
- `src/css/custom.css` - Custom CSS styles
- `static/` - Static assets like images

## Troubleshooting

If you encounter any issues with the content migration script:

1. Check the output in the terminal for error messages
2. Ensure all markdown files are properly formatted
3. Verify that all linked assets (images, etc.) exist

For other issues, refer to the [Docusaurus documentation](https://docusaurus.io/docs).

## Contributing

We welcome contributions to improve the docs, fix bugs, or add new content! Please see our main repository's contributing guidelines.
