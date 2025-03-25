#!/usr/bin/env node

/**
 * Script to migrate Markdown content to Hugo format
 */

const fs = require('fs');
const path = require('path');

// Directories
const ROOT_DIR = path.resolve(__dirname, '../..');
const CONTENT_DIR = path.resolve(__dirname, '../content');

// Create content directory if it doesn't exist
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// Get all markdown files
const findMarkdownFiles = (dir) => {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'hugo' && file !== 'docusaurus' && file !== '_site') {
      results.push(...findMarkdownFiles(filePath));
    } else if (file.endsWith('.md') && !file.includes('README.md')) {
      results.push(filePath);
    }
  }
  
  return results;
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

// Process the special README.md file as _index.md
const processReadme = () => {
  const readmePath = path.join(ROOT_DIR, 'README.md');
  if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');
    const title = 'KubeLabs - Ultimate Kubernetes Hands-on Labs';
    
    // Add front matter
    content = `+++\ntitle = "${title}"\ndescription = "A Curated List of Kubernetes Labs and Tutorials"\nweight = 1\nalwaysopen = true\n+++\n\n${content}`;
    
    // Fix relative links
    content = content.replace(/\]\(\.\//g, '](/');
    content = content.replace(/\]\((\/[^)]+)\.md/g, ']($1');
    
    // Create the file
    fs.writeFileSync(path.join(CONTENT_DIR, '_index.md'), content);
    console.log('✅ Processed README.md as _index.md');
  }
};

// Process a markdown file for Hugo
const processMarkdownFile = (filePath) => {
  const relativePath = path.relative(ROOT_DIR, filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  const title = extractTitle(content, filePath);
  
  // Determine the section based on the file path
  const pathParts = relativePath.split(path.sep);
  const section = pathParts[0];
  
  // Create the front matter
  // Note: Hugo uses +++ for TOML front matter
  content = `+++\ntitle = "${title}"\nweight = 5\n+++\n\n${content}`;
  
  // Fix relative links
  content = content.replace(/\]\(\.\//g, '](/');
  content = content.replace(/\]\((\/[^)]+)\.md/g, ']($1');
  
  // Create the content directory structure
  const targetDir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Create _index.md for the section if it doesn't exist
  const sectionIndexPath = path.join(targetDir, '_index.md');
  if (!fs.existsSync(sectionIndexPath)) {
    const sectionTitle = section
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const sectionIndex = `+++\ntitle = "${sectionTitle}"\nweight = 5\nalwaysopen = true\n+++\n\n# ${sectionTitle}\n`;
    fs.writeFileSync(sectionIndexPath, sectionIndex);
    console.log(`✅ Created section index for ${section}`);
  }
  
  // Write the file
  const filename = path.basename(filePath);
  fs.writeFileSync(path.join(targetDir, filename), content);
  console.log(`✅ Processed ${relativePath}`);
};

// Main execution
const main = () => {
  console.log('🚀 Starting markdown migration to Hugo format...');
  
  // Process README first
  processReadme();
  
  // Process all other markdown files
  const markdownFiles = findMarkdownFiles(ROOT_DIR);
  markdownFiles.forEach(processMarkdownFile);
  
  console.log(`\n✨ Successfully processed ${markdownFiles.length + 1} files!`);
};

main();
