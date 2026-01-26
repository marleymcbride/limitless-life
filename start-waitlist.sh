#!/bin/bash

echo "🔧 LIMITLESS WAITLIST - FIXING DEPENDENCIES"
echo "=============================================="

echo "📦 Installing missing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🚀 Starting development server..."
echo "Visit: http://localhost:3001/waitlist"
echo ""

npm run dev
