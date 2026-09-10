/**
 * Simple Markdown to HTML converter
 * Handles basic markdown features used in blog posts
 * 
 * Supported features:
 * - Headers (h2-h6) - H1s are stripped to avoid duplication
 * - Bold (**text**)
 * - Italic (*text*)
 * - Unordered lists (- item or * item)
 * - Ordered lists (1. item)
 * - Links ([text](url))
 * - Images (![alt](url)) - Rendered with Polaroid styling
 * - Blockquotes (> text)
 * - Paragraphs
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  let processedHtml = '';
  let inList = false;
  let listType = ''; // 'ul' or 'ol'

  const lines = markdown.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Skip empty lines unless breaking a list
    if (line === '') {
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      continue;
    }

    // Headers - Skip H1 (#) to prevent duplicate titles
    if (line.startsWith('# ')) {
      // Skip H1
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      continue; 
    } else if (line.startsWith('## ')) {
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      processedHtml += `<h2>${line.substring(3)}</h2>`;
    } else if (line.startsWith('### ')) {
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      processedHtml += `<h3>${line.substring(4)}</h3>`;
    } else if (line.startsWith('#### ')) {
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      processedHtml += `<h4>${line.substring(5)}</h4>`;
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      processedHtml += `<blockquote>${parseInline(line.substring(2))}</blockquote>`;
    }
    // Images - ![alt](url)
    else if (line.match(/^!\[(.*?)\]\((.*?)\)/)) {
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      const match = line.match(/^!\[(.*?)\]\((.*?)\)/);
      if (match) {
        processedHtml += `
          <figure class="polaroid-image transform hover:scale-105 transition-all duration-300">
            <div class="polaroid-inner">
              <img src="${match[2]}" alt="${match[1]}" />
              <figcaption>${match[1]}</figcaption>
            </div>
          </figure>
        `;
      }
    }
    // Unordered List (- item or * item)
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        if (inList) processedHtml += `</${listType}>`;
        processedHtml += '<ul>';
        inList = true;
        listType = 'ul';
      }
      processedHtml += `<li>${parseInline(line.substring(2))}</li>`;
    }
    // Ordered List
    else if (/^\d+\.\s+/.test(line)) {
      if (!inList || listType !== 'ol') {
        if (inList) processedHtml += `</${listType}>`;
        processedHtml += '<ol>';
        inList = true;
        listType = 'ol';
      }
      const content = line.replace(/^\d+\.\s+/, '');
      processedHtml += `<li>${parseInline(content)}</li>`;
    }
    // Paragraph or continued text
    else {
      if (inList) { processedHtml += `</${listType}>`; inList = false; }
      processedHtml += `<p>${parseInline(line)}</p>`;
    }
  }

  if (inList) { processedHtml += `</${listType}>`; }

  return processedHtml;
}

function parseInline(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links - Handle external vs internal
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const isExternal = url.startsWith('http');
      const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      // Add data-internal attribute for internal links to help with event delegation
      const internalAttr = !isExternal ? ' data-internal-link="true"' : '';
      return `<a href="${url}"${targetAttr}${internalAttr}>${text}</a>`;
    })
    // Inline Code
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
