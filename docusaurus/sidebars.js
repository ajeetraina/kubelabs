/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro', 'Kubernetes_Architecture', 'kube101'],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['gke-setup', 'weave'],
    },
    {
      type: 'category',
      label: 'Pods',
      items: ['pods101/pods101_deploy-your-first-nginx-pod', 'pods101/pods101_FAQs'],
    },
    {
      type: 'category',
      label: 'ReplicaSets',
      items: ['ReplicationController101/ReplicationController101_readme'],
    },
    {
      type: 'category',
      label: 'Deployments',
      items: ['Deployment101/Deployment101_Blue-Green-Strategies', 'Deployment101/Deployment101_Rolling_Update'],
    },
    {
      type: 'category',
      label: 'Services',
      items: ['kubectl-for-docker', 'api'],
    },
    {
      type: 'category',
      label: 'ConfigMaps',
      items: ['ConfigMaps101/ConfigMaps101_what-are-configmaps', 'secerts_configmaps101/secerts_configmaps101_secrets-configmaps'],
    },
    {
      type: 'category',
      label: 'Cloud Providers',
      items: [
        'AKS101/AKS101_what-is-aks',
        'EKS101/EKS101_what-is-eks',
        'GKE101/GKE101_what-is-gke',
        'LKE101/LKE101_what-is-lke'
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        'Helm101/Helm101_what-is-helm',
        'GitOps101/GitOps101_what-is-gitops',
        'Security101/Security101_kubernetes-security',
        'Logging101/Logging101_logging-intro',
        'Observability101/Observability101_observability',
      ],
    },
  ],
};

module.exports = sidebars;