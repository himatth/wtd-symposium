#!/usr/bin/env bash
set -euo pipefail

# install-and-run.sh
# Small driver script to install nvm+Node (no sudo), install deps and run the project's
# optimization/build/axe pipeline.
# Usage: chmod +x scripts/install-and-run.sh && ./scripts/install-and-run.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[1/8] Checking for existing node/npm..."
if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
  echo "Node already installed: $(node -v)"
  echo "npm: $(npm -v)"
else
  echo "Node not found. Installing nvm (per-user, no sudo) and Node LTS via nvm..."
  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    echo "nvm already installed in ~/.nvm"
  else
    echo "Downloading and installing nvm..."
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
    echo "nvm installer finished."
  fi

  # Load nvm into this shell session
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "$HOME/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  # shellcheck disable=SC1090
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

  echo "Installing Node LTS via nvm..."
  nvm install --lts
  nvm use --lts
  echo "Installed Node: $(node -v)"
  echo "Installed npm: $(npm -v)"
fi

echo "[2/8] Installing project dependencies (npm install). This may take a minute..."
npm install

echo "[3/8] Running image optimizer (npm run optimize:images)"
if npm run optimize:images; then
  echo "Image optimization completed successfully."
else
  echo "Image optimization reported errors (continuing). Check output above." >&2
fi

echo "[4/8] Running build (npm run build)"
npm run build

echo "[5/8] Running axe audit (npm run axe) — this will open Chromium headless via puppeteer"
if npm run axe; then
  echo "Axe run completed and docs/axe-report.json was written (if script succeeded)."
else
  echo "Axe run reported errors — check output above. If puppeteer fails to download Chromium, ensure your machine has network access and try again." >&2
fi

echo "[6/8] Listing generated optimized images for inspection:"
for f in img/*.{jpg,jpeg,png}; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  name="${base%.*}"
  ls -lh "$f" "${f%.*}.webp" "${f%.*}.avif" 2>/dev/null || true
done

echo "[7/8] Checking dist/ references to hero image (preload + og)"
if [ -f dist/wtd-symposium-landing.html ]; then
  grep -n "hero-bg" dist/wtd-symposium-landing.html || true
else
  echo "dist/wtd-symposium-landing.html not found. Build may have failed."
fi

echo "[8/8] Done. If you want, paste the output here and I will summarize image size impact and axe counts (serious/critical)."
exit 0
