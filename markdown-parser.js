/**
 * Simple Markdown Parser for KubeLabs Portal
 */
const MarkdownParser = {
  parse: function(markdown) {
    if (!markdown) return '';
    
    let html = markdown;
    
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
    
    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Convert images - fix the !alt text issue
    html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    // Also handle cases where there's no alt text in brackets
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
    
    return html;
  },
  
  // Fix relative image paths in markdown content
  fixRelativeImagePaths: function(html, basePath) {
    // Get the directory path
    const dirPath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    
    // Replace relative image paths with absolute GitHub raw content paths
    return html.replace(/src="(?!http)([^"]+)"/g, function(match, p1) {
      if (p1.startsWith('./')) {
        p1 = p1.substring(2);
      }
      return `src="https://raw.githubusercontent.com/ajeetraina/kubelabs/master/${dirPath}${p1}"`;
    });
  },
  
  // Fix relative links in markdown content
  fixRelativeLinks: function(html, basePath) {
    // Get the directory path
    const dirPath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    
    // Replace relative links with JavaScript function calls to load content
    return html.replace(/href="(?!http|mailto:|#)([^"]+)"/g, function(match, p1) {
      if (p1.startsWith('./')) {
        p1 = p1.substring(2);
      }
      const fullPath = dirPath + p1;
      return `href="javascript:void(0)" onclick="window.loadLabContentFromPath('${fullPath}')"`;
    });
  }
};