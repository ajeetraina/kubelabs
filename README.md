# Get Started with Kubernetes | Ultimate Hands-on Labs and Tutorials

![stars](https://img.shields.io/github/stars/collabnix/kubelabs)
![forks](https://img.shields.io/github/forks/collabnix/kubelabs)
![issues](https://img.shields.io/github/issues/collabnix/kubelabs)
![GitHub contributors](https://img.shields.io/github/contributors/collabnix/kubelabs)
![Twitter](https://img.shields.io/twitter/follow/collabnix?style=social)

## 🚀 Modernized Website with Improved Navigation!

KubeLabs is now organized with a better user experience:
- **Left Sidebar**: Browse through categorized Kubernetes labs and tutorials
- **Right Sidebar**: Navigate through the content of the current page
- **Interactive Content**: Hands-on labs with step-by-step instructions

Visit [kubelabs.collabnix.com](https://kubelabs.collabnix.com) to explore the improved experience.

## About KubeLabs

A Curated List of Kubernetes Labs and Tutorials

- A $0 Learning Platform for All Levels - from the ground Up
- Over 500+ Highly Interactive Docker Tutorials and Guides
- Well tested on Kubernetes Cluster and can be run on Browser (no Infrastructure required)

# 📝 Join our Community

- Join 9000+ DevOps Engineers today via [Community Slack](https://launchpass.com/collabnix)
- Join our [Discord Server](https://discord.gg/QEkCXAXYSe)
- Fork, Contribute & Share via [Kubelabs GITHUB Repository](https://github.com/collabnix/kubelabs)
- Click and Follow us over Twitter [![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/fold_left.svg?style=social&label=Follow%20%40collabnix)](https://twitter.com/collabnix)
- Access [500+ blogs](https://collabnix.com) on Docker, Kubernetes and Cloud-Native Technology

## Deployment

### Local Development

```bash
# Install dependencies
cd docusaurus
npm install

# Run the content migration script
node scripts/migrate-content.js

# Start the development server
npm start
```

### Building for Production

```bash
cd docusaurus
npm install
node scripts/migrate-content.js
npm run build
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t kubelabs:latest -f docusaurus/Dockerfile .

# Run the container
docker run -p 8080:80 kubelabs:latest
```

### Kubernetes Deployment

```bash
# Apply namespace
kubectl apply -f k8s/namespace.yaml

# Apply all resources
kubectl apply -f k8s/
```

# Labs and Tutorials Categories

## Getting Started
- [Introductory Slides](https://collabnix.github.io/kubelabs/Kubernetes_Intro_slides-1/Kubernetes_Intro_slides-1.html) 
- [Deep Dive into Kubernetes Architecture](./Kubernetes_Architecture.md) 
- [Preparing 5-Node Kubernetes Cluster](./kube101.md)
- [Setting up GKE Cluster](./gke-setup.md)
- [Setting up Kubernetes on AWS using Kops](./dockerdesktopformac/README.md)
- [Setting up Kubernetes on Ubuntu](https://github.com/collabnix/kubelabs/blob/master/install/ubuntu/README.md)
- [Using Kubectl](./kubectl-for-docker.md)

## Core Kubernetes Concepts
- [Pods](./pods101/deploy-your-first-nginx-pod.md)
- [ReplicaSets](./replicaset101/README.md)
- [Deployments](./Deployment101/README.md)
- [Services](./Services101/README.md)
- [ConfigMaps](./ConfigMaps101/what-are-configmaps.md)
- [Scheduler](./Scheduler101/README.md)

## Workload Controllers
- [StatefulSets](./StatefulSets101/README.md)
- [DaemonSets](./DaemonSet101/README.md)
- [Jobs](./Jobs101/README.md)

## Networking
- [Network Policies](./Network_Policies101/README.md)
- [Ingress](./Ingress101/README.md)
- [Cluster Networking](./ClusterNetworking101/README.md)

## Security & Access Control
- [RBAC](./RBAC101/README.md)
- [Security Best Practices](./Security101/kubernetes-security.md)

## Observability
- [Monitoring](./Monitoring101/README.md)
- [Logging](./Logging101/logging-intro.md)

## Cloud Providers
- [AWS EKS](./EKS101/what-is-eks.md)
- [Azure AKS](./AKS101/what-is-aks.md)
- [Google GKE](./GKE101/what-is-gke.md)
- [Linode LKE](./LKE101/what-is-lke.md)

## Advanced Topics
- [Helm](./Helm101/what-is-helm.md)
- [GitOps](./GitOps101/what-is-gitops.md)
- [Service Mesh](./AKS101/aks-service-mesh.md)
- [KEDA](./Keda101/what-is-keda.md)
- [Disaster Recovery](./DisasterRecovery101/what-is-dr.md)
- [AI with Kubernetes](./ai/README.md)

## Reference
- [Kubernetes Cheat Sheet](./Cheat%20Sheets/Kubernetes%20Cheat%20Sheet.md)
- [Helm Cheat Sheet](./Cheat%20Sheets/Helm%20Cheat%20Sheet.md)

# Contributors

- [Ajeet Singh Raina](https://twitter.com/ajeetsraina)
- [Sangam Biradar](https://twitter.com/BiradarSangam)
- [Mewantha Bandara](http://linkedin.com/in/mewantha-bandara)
- [Rachit Mehrotra](https://www.linkedin.com/in/rachit-mehrotra-08a92819/?originalSubdomain=in)
- [Saiyam Pathak](https://twitter.com/SaiyamPathak)
- [Divyajeet Singh](https://www.linkedin.com/in/divyajeet-singh)
- [Apurva Bhandari](https://www.linkedin.com/in/apurvabhandari-linux)

## Workshop Video

[![YouTube](https://github.com/collabnix/kubelabs/blob/master/k8sworkshop.png)](https://www.youtube.com/embed/i0d5ta83c-k)

[Click Here](https://www.youtube.com/embed/i0d5ta83c-k) if the link is not working for you.

## Contribution Guidelines

## Step 1. Clone the repository

```
git clone https://github.com/collabnix/kubelabs
```

## Step 2. Add _config_dev.yml

Add the following entry for local access

```
url: http://127.0.0.1:4000
```

## Step 3. Run the container

```
docker run --rm \
  -v "$PWD:/srv/jekyll" \
  -e BUNDLE_PATH="/srv/jekyll/.bundles_cache" \
  -p 4000:4000 \
  jekyll/builder:3.8 \
  bash -c "gem install bundler && bundle install && bundle exec jekyll serve --host 0.0.0.0 --verbose --config _config.yml,_config_dev.yml"
```

# Further References:

- [Kubetools](https://kubetools.collabnix.com)

[Next:  Kubernetes201](https://github.com/collabnix/kubelabs/blob/master/201/README.md)