#!/usr/bin/env node

/**
 * This script scans all generated Markdown files in the docs directory
 * and fixes any issues with titles in frontmatter
 */

const fs = require('fs');
const path = require('path');

// Directory containing docs
const DOCS_DIR = path.resolve(__dirname, '../docs');

// Find all markdown files recursively
const findMarkdownFiles = (dir) => {
  const results = [];
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

// Fix a single markdown file
const fixMarkdownFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if there's a potential title issue in front matter
  if (content.includes('title: null') || content.includes('title:') && !content.includes('title: "')) {
    // Extract the filename without extension to use as a fallback title
    const basename = path.basename(filePath, '.md');
    const fallbackTitle = basename
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Replace the problematic title
    const fixedContent = content
      .replace(/title: null/g, `title: "${fallbackTitle}"`)
      .replace(/title:\s*$/m, `title: "${fallbackTitle}"`);
    
    fs.writeFileSync(filePath, fixedContent);
    console.log(`✅ Fixed title in ${path.relative(DOCS_DIR, filePath)}`);
    return true;
  }
  
  return false;
};

// Main function
const main = () => {
  console.log('🔍 Scanning for and fixing title issues in Markdown files...');
  
  const markdownFiles = findMarkdownFiles(DOCS_DIR);
  let fixCount = 0;
  
  markdownFiles.forEach(file => {
    if (fixMarkdownFile(file)) {
      fixCount++;
    }
  });
  
  console.log(`✨ Fixed titles in ${fixCount} out of ${markdownFiles.length} files!`);
};

main();