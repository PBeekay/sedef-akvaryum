import fs from 'fs';
import path from 'path';

const BUILD_DIR = path.join(__dirname, '../build');
const INDEX_HTML_PATH = path.join(BUILD_DIR, 'index.html');

console.log('Starting CSS inline optimization...');

if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('Error: build/index.html not found. Ensure you have run the build script first.');
    process.exit(1);
}

let html = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

// Look for the main CSS file link. 
// CRA typically generates: <link href="/static/css/main.[hash].css" rel="stylesheet">
const linkTagRegex = /<link[^>]+href="([^"]+\/static\/css\/main\.[a-z0-9]+\.css)"[^>]*rel="stylesheet"[^>]*>|<link[^>]+rel="stylesheet"[^>]+href="([^"]+\/static\/css\/main\.[a-z0-9]+\.css)"[^>]*>/;

const match = html.match(linkTagRegex);

if (!match) {
    console.warn('Warning: Main CSS link not found in index.html. It might have been already inlined or the pattern does not match.');
    // Log the first few chars of html to help debug if needed, or just exit
    process.exit(0);
}

// match[1] or match[2] will contain the href
const cssHref = match[1] || match[2];
console.log(`Found CSS link: ${cssHref}`);

// Determine file system path
// Remove leading slash or ./ if present to join with BUILD_DIR
let relativePath = cssHref;
if (relativePath.startsWith('/')) {
    relativePath = relativePath.substring(1);
} else if (relativePath.startsWith('./')) {
    relativePath = relativePath.substring(2);
}

const cssFilePath = path.join(BUILD_DIR, relativePath);

if (!fs.existsSync(cssFilePath)) {
    console.error(`Error: CSS file not found at ${cssFilePath}`);
    process.exit(1);
}

const cssContent = fs.readFileSync(cssFilePath, 'utf8');
console.log(`Read CSS content (${cssContent.length} bytes).`);

// Inline the CSS
const styleTag = `<style>${cssContent}</style>`;
html = html.replace(match[0], styleTag);

fs.writeFileSync(INDEX_HTML_PATH, html);
console.log('Successfully inlined main CSS into index.html');
