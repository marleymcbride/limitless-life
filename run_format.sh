#!/bin/bash
# Format script for Limitless Sales Page project

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: Not in project root directory"
    exit 1
fi

# Run prettier if available
if command -v npx >/dev/null 2>&1; then
    echo "Running prettier..."
    npx prettier --write "src/**/*.{ts,tsx,js,jsx}" --ignore-path .gitignore 2>/dev/null || true
fi

# Run ESLint if available
if command -v npx >/dev/null 2>&1; then
    echo "Running ESLint..."
    npx eslint "src/**/*.{ts,tsx,js,jsx}" --fix --ignore-path .gitignore 2>/dev/null || true
fi

echo "Formatting complete"
exit 0
