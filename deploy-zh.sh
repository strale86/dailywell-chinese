#!/bin/bash

# Deploy to dailywell-zh Netlify
echo "🚀 Deploying to dailywell-zh Netlify..."

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to Netlify using Netlify CLI
echo "🌐 Deploying to Netlify..."
npx netlify deploy --prod --dir=dist --site=dailywell-zh

echo "✅ Deployment completed!"
echo "🌍 Your app is live at: https://dailywell-zh.netlify.app"
echo "🇨🇳 Chinese market ready with:"
echo "   - WeChat OAuth integration"
echo "   - Alipay OAuth integration" 
echo "   - Chinese translations"
echo "   - Premium features"
echo "   - SEO optimized for Chinese market"
