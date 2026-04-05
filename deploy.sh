#!/bin/bash

echo "🔹 Starting full deployment script..."

# Step 0: Confirm project root
echo "Current folder:"
pwd
ls
read -p "Confirm you are in the project root (y/n)? " confirm
if [ "$confirm" != "y" ]; then
    echo "❌ Navigate to project root first."
    exit 1
fi

# Step 1: Upgrade dependencies
echo "🔹 Installing/upgrading Next.js & Prisma..."
npm install next@^14.2.15 --save
npm install prisma@latest @prisma/client@latest
npx prisma generate
echo "✅ Dependencies installed and Prisma Client generated"
read -p "Press Enter to continue..."

# Step 2: Run Prisma migrations if any
echo "🔹 Checking for pending Prisma migrations..."
npx prisma migrate status
read -p "Deploy pending migrations? (y/n) " migrate_choice
if [ "$migrate_choice" == "y" ]; then
    npx prisma migrate deploy
    echo "✅ Migrations applied"
else
    echo "⚠️ Skipping migrations"
fi
read -p "Press Enter to continue..."

# Step 3: Build project
echo "🔹 Building project..."
npm run build
echo "✅ Project built"
read -p "Press Enter to start local server test..."

# Optional local test
echo "🔹 Starting local server..."
npm run start
echo "✅ Local server running at http://localhost:3000"
read -p "Press Enter to continue to GitHub push & Vercel deploy..."

# Step 4: Push to GitHub
read -p "Enter your GitHub repo URL (https://github.com/user/repo.git): " repo_url
git init
git add .
git commit -m "Prepare project for Vercel deployment"
git branch -M main
git remote add origin $repo_url
git push -u origin main
echo "✅ Project pushed to GitHub"

# Step 5: Deploy to Vercel
echo "🔹 Deploying to Vercel via CLI..."
read -p "Enter Vercel project name (or press Enter to use default): " vercel_project
read -p "Enter Vercel team slug (or press Enter to skip): " vercel_team

if [ -z "$vercel_project" ]; then
  vercel --prod
elif [ -z "$vercel_team" ]; then
  vercel --prod --name $vercel_project
else
  vercel --prod --name $vercel_project --team $vercel_team
fi

echo "🎉 Deployment complete!"
