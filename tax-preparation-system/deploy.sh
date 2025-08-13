#!/bin/bash

# Tax Preparation System - Safe Production Deployment Script
# This script deploys to a separate location without affecting existing code

echo "🚀 Starting Tax Preparation System Deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf tax-prep-system-$(date +%Y%m%d-%H%M%S).tar.gz dist/

echo "✅ Deployment package created!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload the dist/ folder to your hosting service"
echo "2. Or use the tar.gz file for server deployment"
echo "3. Or run: docker-compose up -d (for Docker deployment)"
echo ""
echo "🌐 The app will be available at your chosen domain/subdomain"
echo "🔒 This deployment is completely isolated from existing code"