# Deploy to dailywell-zh Netlify
Write-Host "🚀 Deploying to dailywell-zh Netlify..." -ForegroundColor Green

# Build the application
Write-Host "📦 Building application..." -ForegroundColor Yellow
npm run build

# Deploy to Netlify using Netlify CLI
Write-Host "🌐 Deploying to Netlify..." -ForegroundColor Yellow
npx netlify deploy --prod --dir=dist --site=dailywell-zh

Write-Host "✅ Deployment completed!" -ForegroundColor Green
Write-Host "🌍 Your app is live at: https://dailywell-zh.netlify.app" -ForegroundColor Cyan
Write-Host "🇨🇳 Chinese market ready with:" -ForegroundColor Cyan
Write-Host "   - WeChat OAuth integration" -ForegroundColor White
Write-Host "   - Alipay OAuth integration" -ForegroundColor White
Write-Host "   - Chinese translations" -ForegroundColor White
Write-Host "   - Premium features" -ForegroundColor White
Write-Host "   - SEO optimized for Chinese market" -ForegroundColor White
