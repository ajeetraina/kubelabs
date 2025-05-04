#!/usr/bin/env node

/**
 * This script helps migrate markdown content from the Jekyll format to Docusaurus
 * It handles things like:
 * - Adding front matter
 * - Converting relative links
 * - Ensuring proper image paths
 * - Organizing content into category-based directories
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

// Content categories for organizing files
const contentCategories = {
  'pods101': 'core-kubernetes/pods',
  'replicaset101': 'core-kubernetes/replicasets',
  'Deployment101': 'core-kubernetes/deployments',
  'Services101': 'core-kubernetes/services',
  'ConfigMaps101': 'core-kubernetes/configmaps',
  'StatefulSets101': 'workloads/statefulsets',
  'DaemonSet101': 'workloads/daemonsets',
  'Jobs101': 'workloads/jobs',
  'Scheduler101': 'scheduling',
  'Network_Policies101': 'networking/policies',
  'Ingress101': 'networking/ingress',
  'ClusterNetworking101': 'networking/cluster',
  'RBAC101': 'security',
  'Security101': 'security',
  'Monitoring101': 'observability/monitoring',
  'Logging101': 'observability/logging',
  'Helm101': 'package-management',
  'GitOps101': 'gitops',
  'EKS101': 'cloud-providers/aws',
  'AKS101': 'cloud-providers/azure',
  'GKE101': 'cloud-providers/gcp',
  'LKE101': 'cloud-providers/linode',
  'Keda101': 'advanced-topics/keda',
  'Autoscaler101': 'scheduling/autoscaling',
  'Terraform101': 'advanced-topics/terraform',
  'DisasterRecovery101': 'advanced-topics/dr',
  'KubeSphere': 'tools/kubesphere',
  'Loft101': 'tools/loft',
  'Shipa101': 'tools/shipa',
  'DevSpace101': 'tools/devspace',
  'Kubezoo': 'tools/kubezoo',
  'Karpenter101': 'cloud-providers/aws/karpenter',
  'ServiceCatalog101': 'package-management/service-catalog',
  'ManagedKubernetes': 'cloud-providers/managed',
  'GitLab101': 'gitops/gitlab',
  'Jenkins101': 'gitops/jenkins',
  'Strimzi101': 'advanced-topics/strimzi',
  'JavaClient101': 'development/java-client',
  'python': 'development/python',
  'golang': 'development/golang',
  'ai': 'advanced-topics/ai',
  'Observability101': 'observability',
  'Cheat Sheets': 'reference'
};

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

// Process READMEs in each directory
const findReadmeFiles = (dir) => {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'docusaurus' && file !== '_site') {
      const readmePath = path.join(filePath, 'README.md');
      if (fs.existsSync(readmePath)) {
        results.push(readmePath);
      }
      results.push(...findReadmeFiles(filePath));
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

// Determines the category for a file based on its path
const determineCategory = (filePath) => {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const pathParts = relativePath.split('/');
  
  // Check if the path matches any of our predefined categories
  for (const [category, targetDir] of Object.entries(contentCategories)) {
    if (pathParts[0] === category || relativePath.startsWith(category)) {
      return targetDir;
    }
  }
  
  // Default to uncategorized
  return 'uncategorized';
};

// Process the special ROOT README.md file as intro.md
const processRootReadme = () => {
  const readmePath = path.join(ROOT_DIR, 'README.md');
  if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // Add front matter
    content = '---\nid: intro\ntitle: "Introduction to KubeLabs"\nsidebar_position: 1\nslug: /\n---\n\n' + content;
    
    // Fix relative links
    content = content.replace(/\]\(\.\//g, '](');
    content = content.replace(/\]\(([^)]+)\.md/g, ']($1');
    
    // Fix image paths
    content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, imgPath) => {
      if (imgPath.startsWith('http')) {
        return match; // External images don't need to be fixed
      }
      // Adjust the path
      return `![${alt}](${imgPath})`;
    });
    
    fs.writeFileSync(path.join(DOCS_DIR, 'intro.md'), content);
    console.log('\u2705 Processed ROOT README.md as intro.md');
    
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

// Determine sidebar position based on content or filename
const determineSidebarPosition = (content, filePath) => {
  // You could implement logic here to determine the order
  // For now, we'll return a default value
  return 1;
};

// Process a markdown file for Docusaurus
const processMarkdownFile = (filePath) => {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const docId = generateDocId(filePath);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const title = extractTitle(content, filePath);
  const sidebarPosition = determineSidebarPosition(content, filePath);
  
  // Determine proper category and target directory
  const category = determineCategory(filePath);
  
  // Add front matter
  content = `---
id: ${docId}
title: "${title}"
sidebar_position: ${sidebarPosition}
---

${content}`;
  
  // Fix relative links
  content = content.replace(/\]\(\.\//g, '](../');
  content = content.replace(/\]\(([^)]+)\.md/g, ']($1');
  
  // Fix image paths
  content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, imgPath) => {
    if (imgPath.startsWith('http')) {
      return match; // External images don't need to be fixed
    }
    // Adjust the path based on the category depth
    const categoryDepth = category.split('/').length;
    const prefix = '../'.repeat(categoryDepth);
    return `![${alt}](${prefix}${imgPath})`;
  });
  
  // Ensure target directory structure exists
  const targetDir = path.join(DOCS_DIR, category);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Get basename of the file
  const basename = path.basename(filePath);
  
  // Write the processed file
  fs.writeFileSync(path.join(targetDir, basename), content);
  console.log(`\u2705 Processed ${relativePath} into ${category}/${basename} with ID: ${docId}`);
  
  // Add to our documents list for sidebar generation
  allDocuments.push({
    id: docId,
    title: title,
    path: `${category}/${basename}`,
    category: category
  });
};

// Process a README.md file specially, using the directory name as the basename
const processReadmeFile = (filePath) => {
  const dirPath = path.dirname(filePath);
  const dirName = path.basename(dirPath);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const title = extractTitle(content, filePath);
  
  const docId = generateDocId(filePath);
  const category = determineCategory(filePath);
  
  // Add front matter
  content = `---
id: ${docId}
title: "${title}"
sidebar_position: 1
---

${content}`;
  
  // Fix relative links
  content = content.replace(/\]\(\.\//g, '](../');
  content = content.replace(/\]\(([^)]+)\.md/g, ']($1');
  
  // Ensure target directory structure exists
  const targetDir = path.join(DOCS_DIR, category);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Use index.md for README files to be treated as the main file of the directory
  fs.writeFileSync(path.join(targetDir, 'index.md'), content);
  console.log(`\u2705 Processed README ${filePath} as ${category}/index.md with ID: ${docId}`);
  
  allDocuments.push({
    id: docId,
    title: title,
    path: `${category}/index.md`,
    category: category
  });
};

// Generate a category-based sidebar configuration
const generateSidebar = () => {
  // Let's stick with our manually crafted sidebar for better organization
  // No need to generate it automatically as we have a well-structured hand-crafted version
  console.log('\u2705 Using existing hand-crafted sidebar.js configuration');
  
  // Write out the document IDs for reference
  const allDocIds = allDocuments.map(doc => doc.id).sort();
  fs.writeFileSync(path.join(__dirname, '../all-doc-ids.txt'), allDocIds.join('\n'));
  console.log('\u2705 Generated all-doc-ids.txt for debugging and reference');
};

// Main execution
const main = () => {
  console.log('\ud83d\ude80 Starting markdown migration to Docusaurus format...');
  
  // Process ROOT README first
  processRootReadme();
  
  // Process all README.md files in directories
  const readmeFiles = findReadmeFiles(ROOT_DIR);
  readmeFiles.forEach(processReadmeFile);
  
  // Process all other markdown files
  const markdownFiles = findMarkdownFiles(ROOT_DIR)
    .filter(file => !file.endsWith('README.md')); // Exclude README files already processed
  
  markdownFiles.forEach(processMarkdownFile);
  
  // Generate the sidebar configuration
  generateSidebar();
  
  console.log(`\n\u2728 Successfully processed ${markdownFiles.length + readmeFiles.length + 1} files!`);
  console.log(`\n\ud83d\udcd6 Content organized into categories in the docs directory!`);
};

main();