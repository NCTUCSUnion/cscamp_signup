#!/usr/bin/env node

/**
 * WebP Conversion Script
 * 
 * This script converts all images in your project to WebP format
 * to significantly reduce file sizes while maintaining quality.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  // Directories to scan for images
  directories: [
    path.join(__dirname, 'public', 'images'),
    path.join(__dirname, 'dist', 'images')
  ],
  // File extensions to process
  extensions: ['.jpg', '.jpeg', '.png', '.gif'],
  // WebP quality (0-100, higher = better quality but larger file size)
  webpQuality: 80,
  // Whether to create backups of original images
  createBackups: true,
  // Whether to process subdirectories
  processSubdirectories: true,
  // Whether to keep original files
  keepOriginals: true
};

// Check if required tools are installed
async function checkDependencies() {
  try {
    // Check for cwebp
    await execPromise('which cwebp');
    console.log('✅ cwebp is installed');
  } catch (error) {
    console.log('❌ cwebp is not installed. Install with: brew install webp');
    process.exit(1);
  }
}

// Process a single image file
async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const webpPath = path.join(dir, `${baseName}.webp`);
  const backupPath = `${filePath}.backup`;
  
  // Create backup if enabled
  if (config.createBackups) {
    fs.copyFileSync(filePath, backupPath);
  }
  
  try {
    // Convert to WebP
    await execPromise(`cwebp -q ${config.webpQuality} "${filePath}" -o "${webpPath}"`);
    
    // Report size reduction
    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ Converted to WebP: ${filePath}`);
    console.log(`   Size reduced by ${reduction}% (${(originalSize/1024).toFixed(2)}KB → ${(webpSize/1024).toFixed(2)}KB)`);
    
    // Remove original if not keeping
    if (!config.keepOriginals) {
      fs.unlinkSync(filePath);
      console.log(`   Removed original file`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    // Restore from backup if there was an error
    if (config.createBackups && fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, filePath);
    }
  }
}

// Process all images in a directory
async function processDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`⚠️ Directory not found: ${directory}`);
    return;
  }
  
  console.log(`🔍 Scanning directory: ${directory}`);
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory() && config.processSubdirectories) {
      // Recursively process subdirectories
      await processDirectory(itemPath);
    } else if (stats.isFile()) {
      const ext = path.extname(itemPath).toLowerCase();
      if (config.extensions.includes(ext)) {
        await processImage(itemPath);
      }
    }
  }
}

// Clean up backup files
async function cleanupBackups(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory() && config.processSubdirectories) {
      await cleanupBackups(itemPath);
    } else if (stats.isFile() && itemPath.endsWith('.backup')) {
      fs.unlinkSync(itemPath);
      console.log(`🗑️  Removed backup: ${itemPath}`);
    }
  }
}

// Main function
async function main() {
  console.log('🖼️  WebP Conversion Script');
  console.log('==========================');
  
  // Check dependencies
  await checkDependencies();
  
  // Process each configured directory
  for (const directory of config.directories) {
    await processDirectory(directory);
  }
  
  console.log('✨ Conversion complete!');
  
  // Clean up backups if they were created
  if (config.createBackups) {
    console.log('🧹 Cleaning up backup files...');
    for (const directory of config.directories) {
      await cleanupBackups(directory);
    }
  }
  
  // Provide guidance on using WebP images
  console.log('\n📝 Next Steps:');
  console.log('1. Update your HTML/CSS/Vue templates to use .webp files instead of original formats');
  console.log('2. For better browser compatibility, consider using the <picture> element:');
  console.log(`
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="Description">
   </picture>
  `);
}

// Run the script
main().catch(error => {
  console.error('❌ An error occurred:', error);
  process.exit(1);
});