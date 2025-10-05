const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Run the build script
console.log('Running build...');
execSync('npm run build', { stdio: 'inherit' });

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), '.vercel', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a basic config for Vercel
const config = {
  version: 3,
  builds: [
    {
      src: 'package.json',
      use: '@vercel/static-build',
      config: { distDir: 'dist/public' }
    },
    {
      src: 'api/**/*.ts',
      use: '@vercel/node'
    }
  ],
  routes: [
    { src: '/api/(.*)', dest: '/api/$1' },
    { src: '/(.*)', dest: '/index.html' }
  ]
};

// Write the config file
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify(config, null, 2)
);

console.log('Vercel build completed successfully!');
