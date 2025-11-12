#!/usr/bin/env bash
set -euo pipefail

# Helper to run install/build and list dist/ for debugging
# Usage: ./scripts/check-build.sh

echo "1) Try clean install with npm ci"
if npm ci; then
  echo "npm ci succeeded"
else
  echo "npm ci failed, attempting npm install --legacy-peer-deps"
  npm install --legacy-peer-deps
fi

echo "\n2) Run build"
npm run build

echo "\n3) List dist/ with human-readable sizes"
ls -lh dist || true

echo "\n4) List dist/ contents"
ls -la dist || true

echo "\nDone. If any step fails, copy the full error output and paste here for diagnosis."
