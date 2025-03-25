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
const { execSync } = require('child_process');

// Directories
const ROOT_DIR = path.resolve(__dirname, '../..');
const DOCS_DIR = path.resolve(__dirname, '../docs');

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
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'docusaurus') {
      results.push(...findMarkdownFiles(filePath));
    } else if (file.endsWith('.md') && !file.includes('README')) {
      results.push(filePath);
    }
  }
  
  return results;
};

// Process the special README.md file separately as intro.md
const processReadme = () => {
  const readmePath = path.join(ROOT_DIR, 'README.md');
  if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // Add front matter
    content = '---\nid: intro\ntitle: Introduction to KubeLabs\nsidebar_position: 1\n---\n\n' + content;
    
    // Fix relative links
    content = content.replace(/\]\(\.\//g, '](/');
    content = content.replace(/\]\((\/[^)]+)\.md/g, ']($1');
    
    fs.writeFileSync(path.join(DOCS_DIR, 'intro.md'), content);
    console.log('✅ Processed README.md as intro.md');
  }
};

// Process a markdown file for Docusaurus
const processMarkdownFile = (filePath) => {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const docId = relativePath.replace(/\.md$/, '').replace(/\//g, '_');
  
  let content = fs.readFileSync(filePath, 'utf8');
  const title = content.split('\n')[0].replace(/^#\s+/, '');
  
  // Add front matter
  content = `---\nid: ${docId}\ntitle: ${title || 'Kubernetes Tutorial'}\n---\n\n${content}`;
  
  // Fix relative links
  content = content.replace(/\]\(\.\//g, '](/');
  content = content.replace(/\]\((\/[^)]+)\.md/g, ']($1');
  
  // Ensure docs directory structure exists
  const targetDir = path.dirname(path.join(DOCS_DIR, relativePath));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(DOCS_DIR, relativePath), content);
  console.log(`✅ Processed ${relativePath}`);
};

// Main execution
const main = () => {
  console.log('🚀 Starting markdown migration to Docusaurus format...');
  
  // Process README first
  processReadme();
  
  // Process all other markdown files
  const markdownFiles = findMarkdownFiles(ROOT_DIR);
  markdownFiles.forEach(processMarkdownFile);
  
  console.log(`\n✨ Successfully processed ${markdownFiles.length + 1} files!`);
};

main();