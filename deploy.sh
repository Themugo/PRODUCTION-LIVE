#!/bin/bash
echo "🔹 Starting SimTrace deployment..."

pwd
ls
read -p "Confirm project root (y/n)? " confirm
if [ "$confirm" != "y" ]; then exit 1; fi

npm install next@^14.2.15 --save
npm install prisma@latest @prisma/client@latest bcryptjs
npx prisma generate

npx prisma migrate status
read -p "Deploy pending migrations? (y/n) " migrate_choice
if [ "$migrate_choice" == "y" ]; then npx prisma migrate deploy; fi

npm run build
npm run start

read -p "GitHub repo URL: " repo_url
git init
git add .
git commit -m "Deploy project"
git branch -M main
git remote add origin $repo_url
git push -u origin main

read -p "Vercel project name: " vercel_project
read -p "Vercel team slug (optional): " vercel_team
if [ -z "$vercel_project" ]; then vercel --prod;
elif [ -z "$vercel_team" ]; then vercel --prod --name $vercel_project;
else vercel --prod --name $vercel_project --team $vercel_team; fi

echo "🎉 Deployment complete!"
