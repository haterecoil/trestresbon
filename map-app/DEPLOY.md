# Paris Restaurant Map - Deployment Guide

This guide will help you deploy the Paris Restaurant Map to GitHub Pages.

## Prerequisites

- Node.js 18+ installed
- GitHub account
- Git installed locally

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name your repository: `paris-restaurant-map`
3. Make it **Public** (required for GitHub Pages)
4. Don't initialize with README (we'll add our own)
5. Click "Create repository"

## Step 2: Update Configuration

Edit `next.config.js` and uncomment the lines for GitHub Pages:

```javascript
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // IMPORTANT: Update these with your actual GitHub username
  assetPrefix: '/paris-restaurant-map',
  basePath: '/paris-restaurant-map',
}
```

Also update `package.json`:
```json
"homepage": "https://YOUR_USERNAME.github.io/paris-restaurant-map"
```

## Step 3: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/paris-restaurant-map.git

# Add files
git add .

# Commit
git commit -m "Initial commit: Paris Restaurant Map"

# Push
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch and "/ (root)" folder
6. Click **Save**

## Step 5: Deploy

### Option A: Manual Deploy (Recommended for testing)

```bash
# Install dependencies
npm install

# Build static site
npm run export

# The 'out' folder now contains your static site
# Check it works locally:
npx serve out

# Deploy to GitHub Pages using gh-pages package
npm install --save-dev gh-pages
npm run deploy
```

### Option B: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run export
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

Push this file and GitHub will automatically deploy on every push to main.

## Step 6: Verify Deployment

1. Go to `https://YOUR_USERNAME.github.io/paris-restaurant-map`
2. It may take 2-5 minutes to deploy
3. Check the Actions tab on GitHub to see deployment status

## Common Issues

### 404 Errors
- Make sure you've set `basePath` and `assetPrefix` correctly in `next.config.js`
- Check that the `trailingSlash: true` is set
- Ensure repository is public

### Images Not Loading
- Check browser console for 404 errors
- Verify `images: { unoptimized: true }` is set
- Make sure image paths are correct

### Map Not Showing
- Check browser console for errors
- Verify MapLibre GL JS is installed: `npm list maplibre-gl`
- Check that map tiles are loading in Network tab

## Custom Domain (Optional)

1. Add a `CNAME` file in `/public/` folder:
   ```
   yourdomain.com
   ```

2. Update DNS records:
   - A record: 185.199.108.153
   - A record: 185.199.109.153
   - A record: 185.199.110.153
   - A record: 185.199.111.153

3. In GitHub Pages settings, add your custom domain

## Updating Data

To update restaurant data:

```bash
# Run the extraction script
python3 ../extract_data.py

# Copy new data to project
cp ../data/restaurants_latest.jsonl public/data/

# Commit and push
git add .
git commit -m "Update restaurant data"
git push
```

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Performance Optimization

- Enable GitHub Pages CDN (automatic)
- Compress images before adding
- Use WebP format for images
- Enable gzip compression

## Support

For issues or questions, please open an issue on GitHub.
