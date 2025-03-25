#!/usr/bin/env node

/**
 * This script flattens all documents in the docs directory
 * by moving them to the root of the docs directory and
 * fixing their IDs to match their flat paths.
 */

const fs = require('fs');
const path = require('path');

// Directory containing docs
const DOCS_DIR = path.resolve(__dirname, '../docs');

// Find all markdown files recursively
const findMarkdownFiles = (dir) => {
  const results = [];
  
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return results;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results.push(...findMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  }
  
  return results;
};

// Create a docusaurus-friendly ID from a file path
const createDocId = (filePath) => {
  const relativePath = path.relative(DOCS_DIR, filePath);
  return relativePath
    .replace(/\.md$/, '')
    .replace(/\//g, '_');
};

// Process a single file
const processFile = (filePath) => {
  const relativePath = path.relative(DOCS_DIR, filePath);
  
  // Skip files that are already at the root level
  if (!relativePath.includes('/')) {
    console.log(`Skipping root file: ${relativePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Get the new ID for this file
  const newId = createDocId(filePath);
  
  // Create new content with updated id in frontmatter
  const updatedContent = content.replace(/---\s*\nid:\s*([^\n]+)/, `---\nid: ${newId}`);
  
  // Create the new file path
  const newFileName = `${newId}.md`;
  const newFilePath = path.join(DOCS_DIR, newFileName);
  
  // Write the updated content to the new file
  fs.writeFileSync(newFilePath, updatedContent);
  console.log(`\u2705 Flattened ${relativePath} -> ${newFileName}`);
  
  // Delete the original file
  fs.unlinkSync(filePath);
};

// Recursively delete empty directories
const deleteEmptyDirs = (dir) => {
  if (!fs.existsSync(dir)) return;
  
  let files = fs.readdirSync(dir);
  if (files.length > 0) {
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        deleteEmptyDirs(filePath);
      }
    });
    
    // Check again after processing subdirectories
    files = fs.readdirSync(dir);
  }
  
  if (files.length === 0 && dir !== DOCS_DIR) {
    fs.rmdirSync(dir);
    console.log(`\u2705 Removed empty directory: ${path.relative(DOCS_DIR, dir)}`);
  }
};

// Main execution
const main = () => {
  console.log('\ud83d\udd0d Starting to flatten docs directory structure...');
  
  const markdownFiles = findMarkdownFiles(DOCS_DIR);
  console.log(`Found ${markdownFiles.length} markdown files`);
  
  markdownFiles.forEach(processFile);
  
  // Clean up empty directories
  deleteEmptyDirs(DOCS_DIR);
  
  console.log('\u2728 Successfully flattened docs directory structure!');
};

main();