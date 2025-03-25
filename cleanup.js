// Script to clean up !alt text occurrences
document.addEventListener('DOMContentLoaded', function() {
    function cleanupAltText() {
        // Find all elements containing !alt text
        const elements = document.querySelectorAll('.lab-content *');
        
        elements.forEach(el => {
            // Replace in text nodes
            for (let i = 0; i < el.childNodes.length; i++) {
                const node = el.childNodes[i];
                if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('!alt text')) {
                    node.textContent = node.textContent.replace(/!alt text/g, '');
                }
            }
            
            // Handle links and other elements with !alt text
            if (el.textContent.includes('!alt text') && el.tagName === 'A') {
                if (el.textContent.trim() === '!alt text') {
                    el.style.display = 'none'; // Hide the element completely
                } else {
                    el.textContent = el.textContent.replace(/!alt text/g, '');
                }
            }
        });
    }
    
    // Observer setup to run cleanup when content changes
    const contentArea = document.getElementById('content');
    
    // Run initial cleanup
    setTimeout(cleanupAltText, 500);
    
    // Setup observer to run cleanup whenever content changes
    const observer = new MutationObserver(function(mutations) {
        setTimeout(cleanupAltText, 500);
    });
    
    observer.observe(contentArea, { 
        childList: true,
        subtree: true 
    });
});