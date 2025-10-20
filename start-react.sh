#!/bin/bash

echo "🚀 Starting GreenTail React Application..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🔥 Starting development server..."
echo "🌐 The app will open at: http://localhost:3000"
echo ""

npm run dev
