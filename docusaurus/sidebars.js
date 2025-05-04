/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'kube101',
        'Kubernetes_Architecture',
        'gke-setup',
        'weave',
        'kubectl-for-docker',
        'api',
        'detect'
      ]
    },
    {
      type: 'category',
      label: 'Core Kubernetes Concepts',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Pods',
          items: [
            'pods101_pods101_deploy-your-first-nginx-pod',
            'pods101_labels-and-selectors_pods101_labels-and-selectors_README',
            'pods101_tools_pods101_tools_kubetail'
          ]
        },
        {
          type: 'category',
          label: 'ReplicaSets',
          items: [
            'replicaset101_replicaset101_README'
          ]
        },
        {
          type: 'category',
          label: 'Deployments',
          items: [
            'Deployment101_Deployment101_README',
            'Deployment101_Deployment101_Blue-Green-Strategies',
            'Deployment101_Deployment101_Rolling_Update'
          ]
        },
        {
          type: 'category',
          label: 'Services',
          items: [
            'Services101_Services101_README'
          ]
        },
        {
          type: 'category',
          label: 'ConfigMaps & Secrets',
          items: [
            'ConfigMaps101_ConfigMaps101_what-are-configmaps',
            'secerts_configmaps101_secerts_configmaps101_secrets-configmaps'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Workload Controllers',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'StatefulSets',
          items: [
            'StatefulSets101_StatefulSets101_README'
          ]
        },
        {
          type: 'category',
          label: 'DaemonSets',
          items: [
            'DaemonSet101_DaemonSet101_README'
          ]
        },
        {
          type: 'category',
          label: 'Jobs',
          items: [
            'Jobs101_Jobs101_README'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Scheduling & Resource Management',
      collapsible: true,
      collapsed: true,
      items: [
        'Scheduler101_Scheduler101_README',
        'Scheduler101_node_affinity',
        'Scheduler101_Anti-Node-Affinity',
        'Scheduler101_Nodes_taints_and_tolerations',
        {
          type: 'category',
          label: 'Autoscaling',
          items: [
            'Autoscaler101_Autoscaler101_what-are-autoscalers',
            'Autoscaler101_Autoscaler101_autoscaler-lab',
            'Autoscaler101_Autoscaler101_helpers'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Networking',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Cluster Networking',
          items: [
            'ClusterNetworking101_ClusterNetworking101_README'
          ]
        },
        {
          type: 'category',
          label: 'Network Policies',
          items: [
            'Network_Policies101_Network_Policies101_README',
            'Network_Policies101_Network_Policies101_First_Network_Policy',
            'Network_Policies101_Network_Policies101_how_can_we_fine-tune_network_policy_using_selectors',
            'Network_Policies101_Network_Policies101_Deny_ingress_traffic_that_has_no_rules',
            'Network_Policies101_Network_Policies101_Deny_egress_traffic_that_has_no_rules',
            'Network_Policies101_Network_Policies101_allow_all_ingress_traffic_exclusively',
            'Network_Policies101_Network_Policies101_allow_all_egress_traffic_exclusively'
          ]
        },
        {
          type: 'category',
          label: 'Ingress',
          items: [
            'Ingress101_Ingress101_README',
            'Ingress101_Ingress101_ingress-eks'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Security & Access Control',
      collapsible: true,
      collapsed: true,
      items: [
        'RBAC101_RBAC101_README',
        'Security101_Security101_devsecops',
        'Security101_Security101_kubernetes-security',
        'Security101_Security101_auth-intro'
      ]
    },
    {
      type: 'category',
      label: 'Observability',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Monitoring',
          items: [
            'Monitoring101_Monitoring101_README'
          ]
        },
        {
          type: 'category',
          label: 'Logging',
          items: [
            'Logging101_Logging101_logging-intro',
            'Logging101_Logging101_what-is-elasticsearch',
            'Logging101_Logging101_fluentd',
            'Logging101_Logging101_fluentd-kube',
            'Logging101_Logging101_fluentdbit',
            'Logging101_Logging101_elk-on-kubernetes'
          ]
        },
        'Observability101_Observability101_observability'
      ]
    },
    {
      type: 'category',
      label: 'Package Management',
      collapsible: true,
      collapsed: true,
      items: [
        'Helm101_Helm101_what-is-helm',
        'Helm101_Helm101_installing-a-chart',
        'Helm101_Helm101_helm-charts',
        'Helm101_Helm101_chart-hooks',
        'Helm101_Helm101_test-charts',
        'Helm101_Helm101_chart-repos',
        'ServiceCatalog101_ServiceCatalog101_what-is-service-catalog',
        'ServiceCatalog101_ServiceCatalog101_Create-Service-Catalog',
        'ServiceCatalog101_ServiceCatalog101_Install-Service-Catalog-Helm'
      ]
    },
    {
      type: 'category',
      label: 'GitOps & CI/CD',
      collapsible: true,
      collapsed: true,
      items: [
        'GitOps101_GitOps101_what-is-gitops',
        'GitOps101_GitOps101_argocd',
        'GitOps101_GitOps101_argocd-eks',
        {
          type: 'category',
          label: 'CI/CD Tools',
          items: [
            'GitLab101_GitLab101_what-is-gitlab',
            'GitLab101_GitLab101_kubernetes-with-gitlab',
            'GitLab101_GitLab101_runner-on-kubernetes',
            'Jenkins101_Jenkins101_jenkins-on-kubernetes',
            'Jenkins101_Jenkins101_jenkins-ci'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Cloud Providers',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'AWS EKS',
          items: [
            'EKS101_EKS101_what-is-eks',
            'Terraform101_Terraform101_terraform-eks-lab',
            'Karpenter101_Karpenter101_what-is-karpenter',
            'Karpenter101_Karpenter101_karpenter-lab'
          ]
        },
        {
          type: 'category',
          label: 'Azure AKS',
          items: [
            'AKS101_AKS101_what-is-aks',
            'AKS101_AKS101_aks-networking',
            'AKS101_AKS101_aks-iam',
            'AKS101_AKS101_aks-storage',
            'AKS101_AKS101_aks-service-mesh',
            'AKS101_AKS101_aks-keda'
          ]
        },
        {
          type: 'category',
          label: 'Google GKE',
          items: [
            'GKE101_GKE101_what-is-gke',
            'GKE101_GKE101_cloud-run',
            'GKE101_GKE101_gke-service-mesh'
          ]
        },
        {
          type: 'category',
          label: 'Linode LKE',
          items: [
            'LKE101_LKE101_what-is-lke'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Development & Operations Tools',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Development',
          items: [
            'Kubezoo_Kubezoo_what-is-kubezoo',
            'Kubezoo_Kubezoo_kubezoo-lab',
            'DevSpace101_DevSpace101_what-is-devspace',
            'DevSpace101_DevSpace101_devspace-lab',
            'nodejs'
          ]
        },
        {
          type: 'category',
          label: 'Operations',
          items: [
            'Loft101_Loft101_what-is-loft',
            'Loft101_Loft101_loft-lab',
            'Shipa101_Shipa101_what-is-shipa',
            'Shipa101_Shipa101_shipa-lab',
            'KubeSphere_KubeSphere_what-is-kubesphere',
            'KubeSphere_KubeSphere_kubesphere-lab'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'KEDA',
          items: [
            'Keda101_Keda101_what-is-keda',
            'Keda101_Keda101_keda-lab',
            'Keda101_Keda101_keda-prometheus'
          ]
        },
        {
          type: 'category',
          label: 'Strimzi (Kafka)',
          items: [
            'Strimzi101_Strimzi101_kafka',
            'Strimzi101_Strimzi101_kafka-on-kubernetes'
          ]
        },
        {
          type: 'category',
          label: 'Disaster Recovery',
          items: [
            'DisasterRecovery101_DisasterRecovery101_what-is-dr',
            'DisasterRecovery101_DisasterRecovery101_dr-lab'
          ]
        },
        {
          type: 'category',
          label: 'Managed Kubernetes',
          items: [
            'ManagedKubernetes_ManagedKubernetes_readme'
          ]
        },
        {
          type: 'category',
          label: 'Client Libraries',
          items: [
            'JavaClient101_JavaClient101_intro',
            'python_python_README',
            'golang_golang_README'
          ]
        },
        'ai_ai_README'
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: true,
      collapsed: true,
      items: [
        'Cheat Sheets_Cheat Sheets_Kubernetes Cheat Sheet',
        'Cheat Sheets_Cheat Sheets_Helm Cheat Sheet'
      ]
    }
  ],
};

module.exports = sidebars;