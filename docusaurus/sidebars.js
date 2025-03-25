/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'kube101',
    'Kubernetes_Architecture',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['gke-setup', 'weave', 'weave-pwk', 'kubectl-for-docker', 'api', 'detect']
    },
    {
      type: 'category',
      label: 'Pods',
      items: ['pods101_pods101_deploy-your-first-nginx-pod', 'pods101_pods101_FAQs', 'pods101_tools_pods101_tools_kubetail'] 
    },
    {
      type: 'category',
      label: 'ConfigMaps',
      items: ['ConfigMaps101_ConfigMaps101_what-are-configmaps', 'secerts_configmaps101_secerts_configmaps101_secrets-configmaps']
    },
    {
      type: 'category',
      label: 'Deployments',
      items: ['Deployment101_Deployment101_Blue-Green-Strategies', 'Deployment101_Deployment101_Rolling_Update']
    },
    {
      type: 'category',
      label: 'Cloud Providers',
      items: [
        'AKS101_AKS101_what-is-aks',
        'EKS101_EKS101_what-is-eks',
        'GKE101_GKE101_what-is-gke',
        'LKE101_LKE101_what-is-lke'
      ]
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        'Helm101_Helm101_what-is-helm',
        'GitOps101_GitOps101_what-is-gitops',
        'Security101_Security101_kubernetes-security',
        'Logging101_Logging101_logging-intro',
        'Observability101_Observability101_observability'
      ]
    },
  ],
};

module.exports = sidebars;