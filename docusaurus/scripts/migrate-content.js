#!/usr/bin/env node

/**
 * This script helps migrate markdown content from the Jekyll format to Docusaurus
 * It handles things like:
 * - Adding front matter
 * - Converting relative links
 * - Ensuring proper image paths
 */

const fs = require('fs');
const path = require('path');

// Directories
const ROOT_DIR = path.resolve(__dirname, '../..');
const DOCS_DIR = path.resolve(__dirname, '../docs');

// Track all generated document IDs for sidebar generation
let allDocuments = [];

// Create docs directory if it doesn't exist
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

// Get all markdown files
const findMarkdownFiles = (dir) => {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'docusaurus' && file !== '_site') {
      results.push(...findMarkdownFiles(filePath));
    } else if (file.endsWith('.md') && !file.includes('README')) {
      results.push(filePath);
    }
  }
  
  return results;
};

// Generate a docusaurus-friendly ID from a file path
const generateDocId = (filePath) => {
  const relativePath = path.relative(ROOT_DIR, filePath);
  
  // Replace slashes with underscores and remove .md extension
  return relativePath
    .replace(/\.md$/, '')
    .replace(/\//g, '_');
};

// Process the special README.md file separately as intro.md
const processReadme = () => {
  const readmePath = path.join(ROOT_DIR, 'README.md');
  if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // Add front matter
    content = '---\nid: intro\ntitle: "Introduction to KubeLabs"\nsidebar_position: 1\n---\n\n' + content;
    
    // Fix relative links
    content = content.replace(/\]\(\.\//g, '](/');
    content = content.replace(/\]\((\/[^)]+)\.md/g, ']($1');
    
    fs.writeFileSync(path.join(DOCS_DIR, 'intro.md'), content);
    console.log('\u2705 Processed README.md as intro.md');
    
    // Add to our documents list for sidebar generation
    allDocuments.push({
      id: 'intro',
      title: 'Introduction to KubeLabs',
      path: 'intro.md',
      category: 'Introduction'
    });
  }
};

// Extract title from content or generate a default title
const extractTitle = (content, filePath) => {
  // Try to get the first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }
  
  // Fall back to generating a title from the filename
  const basename = path.basename(filePath, '.md');
  return basename
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Process a markdown file for Docusaurus
const processMarkdownFile = (filePath) => {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const docId = generateDocId(filePath);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const title = extractTitle(content, filePath);
  
  // Determine category from path
  const pathParts = relativePath.split('/');
  const category = pathParts[0] === '_site' ? (pathParts[1] || 'Uncategorized') : (pathParts[0] || 'Uncategorized');
  
  // Add front matter
  content = `---\nid: ${docId}\ntitle: "${title}"\n---\n\n${content}`;
  
  // Fix relative links
  content = content.replace(/\]\(\.\//g, '](/');
  content = content.replace(/\]\((\/[^)]+)\.md/g, ']($1');
  
  // Ensure docs directory structure exists
  const targetDir = path.dirname(path.join(DOCS_DIR, relativePath));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Write the processed file
  fs.writeFileSync(path.join(DOCS_DIR, relativePath), content);
  console.log(`\u2705 Processed ${relativePath} with ID: ${docId}`);
  
  // Add to our documents list for sidebar generation
  allDocuments.push({
    id: docId,
    title: title,
    path: relativePath,
    category: category
  });
};

// Generate a simple sidebar configuration
const generateSidebar = () => {
  const sidebar = {
    tutorialSidebar: [
      'intro', // Always include intro as the first item
    ]
  };

  // Create a simple hand-crafted sidebar
  const sidebarConfig = `/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
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

module.exports = sidebars;`;

  // Write the sidebar configuration
  fs.writeFileSync(path.join(__dirname, '../sidebars.js'), sidebarConfig);
  console.log('\u2705 Generated hardcoded sidebars.js configuration');
  
  // Additionally, write a file with all document IDs for debugging
  const allDocIds = allDocuments.map(doc => doc.id).sort();
  fs.writeFileSync(path.join(__dirname, '../all-doc-ids.txt'), allDocIds.join('\n'));
  console.log('\u2705 Generated all-doc-ids.txt for debugging');
};

// Main execution
const main = () => {
  console.log('\ud83d\ude80 Starting markdown migration to Docusaurus format...');
  
  // Process README first
  processReadme();
  
  // Process all other markdown files
  const markdownFiles = findMarkdownFiles(ROOT_DIR);
  markdownFiles.forEach(processMarkdownFile);
  
  // Generate the sidebar configuration
  generateSidebar();
  
  console.log(`\n\u2728 Successfully processed ${markdownFiles.length + 1} files!`);
};

main();