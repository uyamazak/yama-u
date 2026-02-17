import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find all .md files under src directory
function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Extract the filename without extension from a file path
function getFilenameWithoutExtension(filePath) {
  const basename = path.basename(filePath);
  return basename.replace(/\.md$/, '');
}

// Parse frontmatter and check if short_slug exists
function needsShortSlug(content) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    return false; // No frontmatter, skip
  }
  
  const frontmatter = frontmatterMatch[1];
  return !frontmatter.includes('short_slug:');
}

// Add short_slug to frontmatter
function addShortSlug(content, shortSlugValue) {
  const frontmatterMatch = content.match(/^---(\r?\n)([\s\S]*?)(\r?\n)---/);
  if (!frontmatterMatch) {
    console.log('No frontmatter found, skipping');
    return content;
  }
  
  const lineEnding = frontmatterMatch[1]; // Preserve original line ending
  const frontmatter = frontmatterMatch[2];
  const afterFrontmatter = content.slice(frontmatterMatch[0].length);
  
  // Add short_slug after title if it exists, otherwise at the beginning
  const lines = frontmatter.split(/\r?\n/);
  const newLines = [];
  let shortSlugAdded = false;
  
  for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
    
    // Add short_slug right after title
    if (lines[i].startsWith('title:') && !shortSlugAdded) {
      newLines.push(`short_slug: ${shortSlugValue}`);
      shortSlugAdded = true;
    }
  }
  
  // If short_slug wasn't added after title, add it at the beginning
  if (!shortSlugAdded) {
    newLines.unshift(`short_slug: ${shortSlugValue}`);
  }
  
  return '---' + lineEnding + newLines.join(lineEnding) + lineEnding + '---' + afterFrontmatter;
}

// Main function
function main() {
  const srcDir = path.join(__dirname, '..', 'src');
  const markdownFiles = findMarkdownFiles(srcDir);
  
  let processedCount = 0;
  let skippedCount = 0;
  
  console.log(`Found ${markdownFiles.length} markdown files`);
  
  for (const filePath of markdownFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (!needsShortSlug(content)) {
      skippedCount++;
      continue;
    }
    
    const shortSlugValue = getFilenameWithoutExtension(filePath);
    const newContent = addShortSlug(content, shortSlugValue);
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Added short_slug to: ${path.relative(srcDir, filePath)}`);
    processedCount++;
  }
  
  console.log(`\n✨ Done! Processed ${processedCount} files, skipped ${skippedCount} files.`);
}

main();
