// Script to extract first page of PDFs as cover images
// Run with: node scripts/extract-covers.mjs

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

const booksDir = './public/books';
const coversDir = './public/books/covers';

// Mapping of PDF files to their cover image names
const bookCovers = {
  'mathematics-for-machine-learning.pdf': 'mathematics-for-machine-learning.jpg',
  'pattern-recognition-and-machine-learning.pdf': 'pattern-recognition-and-machine-learning.jpg',
  'hands-on-machine-learning.pdf': 'hands-on-machine-learning.jpg',
  'deep-learning.pdf': 'deep-learning.jpg',
  'Reinforcement Learning Richard S. Sutton and Andrew G. Barto.pdf': 'reinforcement-learning-sutton-barto.jpg',
  'ML Machine Learning-A Probabilistic Perspective.pdf': 'ml-probabilistic-perspective.jpg',
  'Designing Machine Learning Systems.pdf': 'designing-machine-learning-systems.jpg',
  'CUDA_C_Programming_Guide.pdf': 'cuda-c-programming-guide.jpg',
  'cuda-programming.pdf': 'cuda-programming.jpg',
  'programming-massively-parallel-processors-a-hands-on-approach-4nbsped-9780323912310_compress.pdf': 'programming-massively-parallel-processors.jpg',
  'reinforcement learning.pdf': 'reinforcement-learning.jpg',
};

async function extractCover(pdfFile, coverName) {
  const pdfPath = path.join(booksDir, pdfFile);
  const coverPath = path.join(coversDir, coverName);
  
  if (!fs.existsSync(pdfPath)) {
    console.log(`⚠️ PDF not found: ${pdfFile}`);
    return;
  }
  
  try {
    // Using sips (macOS built-in) or ImageMagick's convert
    // First, let's try using pdftoppm which is commonly available
    const outputBase = coverPath.replace('.jpg', '');
    
    // Try pdftoppm first (from poppler)
    try {
      await execAsync(`pdftoppm -jpeg -f 1 -l 1 -r 150 "${pdfPath}" "${outputBase}"`);
      // pdftoppm adds -1 suffix, so rename
      const generatedFile = `${outputBase}-1.jpg`;
      if (fs.existsSync(generatedFile)) {
        fs.renameSync(generatedFile, coverPath);
        console.log(`✅ Extracted: ${coverName}`);
        return;
      }
    } catch (e) {
      // pdftoppm not available, try alternative
    }
    
    // Alternative: use sips on macOS (requires preview/quick look)
    // Or use ImageMagick
    try {
      await execAsync(`convert -density 150 "${pdfPath}[0]" -quality 90 "${coverPath}"`);
      console.log(`✅ Extracted (ImageMagick): ${coverName}`);
      return;
    } catch (e) {
      console.log(`⚠️ Could not extract ${pdfFile}. Install poppler or ImageMagick.`);
    }
  } catch (error) {
    console.error(`❌ Error extracting ${pdfFile}:`, error.message);
  }
}

async function main() {
  // Ensure covers directory exists
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }
  
  console.log('📚 Extracting book covers...\n');
  
  for (const [pdf, cover] of Object.entries(bookCovers)) {
    await extractCover(pdf, cover);
  }
  
  console.log('\n✨ Done!');
  console.log('\nIf extraction failed, install poppler:');
  console.log('  macOS: brew install poppler');
  console.log('  Ubuntu: sudo apt-get install poppler-utils');
}

main();
