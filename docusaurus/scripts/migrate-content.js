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
    console.log('\u2705 Processed README.md as intro.md');
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
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Process a markdown file for Docusaurus
const processMarkdownFile = (filePath) => {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const docId = relativePath.replace(/\.md$/, '').replace(/\//g, '_');
  
  let content = fs.readFileSync(filePath, 'utf8');
  const title = extractTitle(content, filePath);
  
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
  
  fs.writeFileSync(path.join(DOCS_DIR, relativePath), content);
  console.log(`\u2705 Processed ${relativePath}`);
};

// Main execution
const main = () => {
  console.log('\ud83d\ude80 Starting markdown migration to Docusaurus format...');
  
  // Process README first
  processReadme();
  
  // Process all other markdown files
  const markdownFiles = findMarkdownFiles(ROOT_DIR);
  markdownFiles.forEach(processMarkdownFile);
  
  console.log(`\n\u2728 Successfully processed ${markdownFiles.length + 1} files!`);
};

main();