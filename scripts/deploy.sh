#!/bin/bash
set -e

APP_DIR="/var/www/fulcrum"
REPO="https://github.com/YOUR_GITHUB_USERNAME/fulcrum.git"
BRANCH="main"

echo "🔄 Pulling latest code..."
if [ ! -d "$APP_DIR" ]; then
  sudo mkdir -p $APP_DIR
  sudo chown $USER:$USER $APP_DIR
  git clone -b $BRANCH $REPO $APP_DIR
else
  cd $APP_DIR
  git fetch origin $BRANCH
  git reset --hard origin/$BRANCH
fi

echo "📦 Installing dependencies..."
cd $APP_DIR/backend
npm install
npx prisma migrate deploy
cd $APP_DIR/frontend
npm install
npm run build

echo "🚀 Restarting services with PM2..."
pm2 startOrReload ecosystem.config.js

echo "✅ Deployment complete!"
