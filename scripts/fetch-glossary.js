const fs = require('fs');
const path = require('path');

// Path to the saved HTML file
const htmlFilePath = path.resolve(process.cwd(), 'glossary.html');

// Function to read the HTML file
function readHtmlFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

// Function to parse the HTML content and extract glossary terms
function parseGlossary(html) {
  const terms = [];
  
  // Based on the HTML structure, looking for h4 elements with IDs followed by <p> elements
  const sections = html.match(/<h4 id="([^"]+)"[^>]*>.*?<\/h4>[\s\S]*?<p>([\s\S]*?)(?=<h4|<\/div>)/g);
  
  if (!sections || sections.length === 0) {
    throw new Error('No glossary terms found in the HTML');
  }
  
  sections.forEach(section => {
    // Extract term from h4
    const termMatch = section.match(/<h4 id="([^"]+)"[^>]*>(.*?)<\/h4>/);
    if (!termMatch) return;
    
    // Extract the term (removing any HTML tags like <a>)
    let term = termMatch[2].replace(/<a[^>]*>|<\/a>/g, '').trim();
    
    // Extract definition from p tag
    let definitionMatch = section.match(/<p>([\s\S]*?)(?=<\/p>)/);
    if (!definitionMatch) return;
    
    let definition = definitionMatch[1];
    
    // Clean up term and definition (handle special characters and links)
    term = cleanHtml(term);
    definition = cleanHtml(definition);
    
    terms.push({ term, definition });
  });
  
  return terms;
}

// Function to clean HTML content
function cleanHtml(html) {
  // Replace HTML entities
  let text = html.replace(/&lt;/g, '<')
                 .replace(/&gt;/g, '>')
                 .replace(/&amp;/g, '&')
                 .replace(/&quot;/g, '"')
                 .replace(/&#39;/g, "'");
  
  // Convert <a> tags to markdown links
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, (match, url, linkText) => {
    // If it's a relative link to another glossary term, make it a markdown link
    if (url.startsWith('#')) {
      return `[${linkText}](#${url.substring(1)})`;
    }
    // For external links
    return `[${linkText}](${url})`;
  });
  
  // Remove remaining HTML tags
  text = text.replace(/<[^>]*>/g, '');
  
  // Fix markdown link references (remove any spaces in IDs)
  text = text.replace(/\[([^\]]+)\]\(#([^)]+)\)/g, (match, linkText, linkId) => {
    return `[${linkText}](#${linkId.replace(/\s+/g, '-').toLowerCase()})`;
  });
  
  return text.trim();
}

// Function to convert glossary terms to Markdown
function convertToMarkdown(terms) {
  let markdown = '# Holochain Glossary\n\n';
  markdown += 'This glossary is sourced from the [Holochain Developer Documentation](https://developer.holochain.org/resources/glossary/).\n\n';
  
  terms.forEach(({ term, definition }) => {
    // Create a markdown-friendly ID for the term
    const termId = term.toLowerCase().replace(/[^\w]+/g, '-');
    markdown += `## ${term} {#${termId}}\n\n${definition}\n\n`;
  });
  
  return markdown;
}

// Main function
async function main() {
  try {
    console.log('Reading HTML file from', htmlFilePath);
    const html = await readHtmlFile();
    console.log('Parsing glossary terms...');
    const terms = parseGlossary(html);
    console.log(`Found ${terms.length} glossary terms`);
    const markdown = convertToMarkdown(terms);
    
    // Write to file
    const outputPath = path.resolve(process.cwd(), 'docs/glossary.md');
    fs.writeFileSync(outputPath, markdown);
    console.log('Glossary has been successfully saved to docs/glossary.md');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
main();