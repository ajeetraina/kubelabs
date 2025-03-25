/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['kube101', 'gke-setup', 'weave'],
    },
    {
      type: 'category',
      label: 'Pods',
      items: ['pods101/deploy-your-first-nginx-pod', 'pods101/labels-and-selectors'],
    },
    {
      type: 'category',
      label: 'ReplicaSets',
      items: ['replicaset101/readme'],
    },
    {
      type: 'category',
      label: 'Deployments',
      items: ['Deployment101/readme'],
    },
    {
      type: 'category',
      label: 'Services',
      items: ['Services101/readme'],
    },
    // Add more categories as needed based on existing content
  ],
};

module.exports = sidebars;