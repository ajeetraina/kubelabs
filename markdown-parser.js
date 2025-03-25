/**
 * Simple Markdown Parser for KubeLabs Portal
 */
const MarkdownParser = {
  parse: function(markdown) {
    if (!markdown) return '';
    
    // Pre-process markdown to clean up any problematic patterns
    let cleanMarkdown = markdown;
    // Replace any standalone !alt text with nothing
    cleanMarkdown = cleanMarkdown.replace(/!alt text\b(?![\(\[])/g, '');
    
    let html = cleanMarkdown;
    
    // Convert headers
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
    
    // Convert code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert images with proper handling of alt text
    html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, function(match, alt, src) {
      // Create a button that opens the image in a new tab
      return `<div class="image-container">
        <a href="${src}" target="_blank" class="image-button">
          <span class="image-icon">🖼️</span> View Image: ${alt || 'Image'}
        </a>
      </div>`;
    });
    
    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Remove any remaining instances of !alt text
    html = html.replace(/!alt text/g, '');
    
    // Convert unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>\n)+/g, '<ul>$&</ul>');
    
    // Convert ordered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.+<\/li>\n)+/g, '<ol>$&</ol>');
    
    // Convert blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
    
    // Convert bold and italic text
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Convert tables (basic support)
    // Table header
    html = html.replace(/^\|(.+)\|\s*$/gm, function(match, content) {
      const cells = content.split('|').map(s => s.trim());
      const headerCells = cells.map(cell => `<th>${cell}</th>`).join('');
      return `<thead><tr>${headerCells}</tr></thead>`;
    });
    
    // Table divider
    html = html.replace(/^\|\s*[-:]+[-|\s:]*\s*\|\s*$/gm, '');
    
    // Table rows
    html = html.replace(/^\|(.+)\|\s*$/gm, function(match, content) {
      const cells = content.split('|').map(s => s.trim());
      const rowCells = cells.map(cell => `<td>${cell}</td>`).join('');
      return `<tr>${rowCells}</tr>`;
    });
    
    // Wrap tables with table tags
    html = html.replace(/<thead>([\s\S]*?)<\/thead>([\s\S]*?)<tr>/g, '<table><thead>$1</thead><tbody><tr>');
    html = html.replace(/<\/tr>\s*(?!<tr|<\/tbody>)/g, '</tr></tbody></table>');
    
    // Convert horizontal rules
    html = html.replace(/^---+$/gm, '<hr>');
    
    // Handle paragraphs (this needs to be last)
    html = html.replace(/^([^<\n].+)$/gm, '<p>$1</p>');
    
    // Clean up any extra whitespace or newlines
    html = html.replace(/\n\s*\n/g, '<br>');
    
    // Final cleanup of any !alt text instances
    html = html.replace(/<p>!alt text<\/p>/g, '');
    html = html.replace(/<p>!alt<\/p>/g, '');
    html = html.replace(/!alt/g, '');
    
    return html;
  },
  
  // Fix relative image paths in markdown content
  fixRelativeImagePaths: function(html, basePath) {
    // Get the directory path
    const dirPath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    
    // Replace image paths in our custom image buttons
    return html.replace(/href="(?!http)([^"]+)"/g, function(match, p1) {
      if (p1.startsWith('./')) {
        p1 = p1.substring(2);
      }
      return `href="https://github.com/ajeetraina/kubelabs/blob/master/${dirPath}${p1}"`;
    });
  },
  
  // Fix relative links in markdown content
  fixRelativeLinks: function(html, basePath) {
    // Get the directory path
    const dirPath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    
    // Replace relative links with JavaScript function calls to load content
    return html.replace(/href="(?!http|mailto:|#|https:\/\/github\.com)([^"]+)"/g, function(match, p1) {
      if (p1.startsWith('./')) {
        p1 = p1.substring(2);
      }
      const fullPath = dirPath + p1;
      return `href="javascript:void(0)" onclick="window.loadLabContentFromPath('${fullPath}')"`;
    });
  }
};