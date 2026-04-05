#!/bin/bash

echo "🔹 Starting SimTrace deployment..."

# Confirm project root
pwd
ls
read -p "Confirm you are in the project root (y/n)? " confirm
if [ "$confirm" != "y" ]; then exit 1; fi

# Step 1: Install dependencies & Prisma
npm install next@^14.2.15 --save
npm install prisma@latest @prisma/client@latest bcryptjs
npx prisma generate

# Step 2: Check & deploy migrations
npx prisma migrate status
read -p "Deploy pending migrations? (y/n) " migrate_choice
if [ "$migrate_choice" == "y" ]; then npx prisma migrate deploy; fi

# Step 3: Build project
npm run build

# Step 4: Optional local test
read -p "Start local server for testing? (y/n) " test_choice
if [ "$test_choice" == "y" ]; then
  npm run start
fi

# Step 5: Push to GitHub
read -p "GitHub repo URL: " repo_url
git init
git add .
git commit -m "Deploy project"
git branch -M main
git remote add origin $repo_url
git push -u origin main

# Step 6: Deploy to Vercel
read -p "Vercel project name: " vercel_project
read -p "Vercel team slug (optional): " vercel_team
if [ -z "$vercel_project" ]; then
  vercel --prod
elif [ -z "$vercel_team" ]; then
  vercel --prod --name $vercel_project
else
  vercel --prod --name $vercel_project --team $vercel_team
fi

echo "🎉 Deployment complete! Output directory is now .next"
