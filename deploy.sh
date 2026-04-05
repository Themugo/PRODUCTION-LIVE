#!/bin/bash

echo "🔹 Starting full deployment script..."

# Step 0: Check current folder
echo "Current folder:"
pwd
ls
read -p "Confirm you are in the project root (y/n)? " confirm
if [ "$confirm" != "y" ]; then
    echo "❌ Please navigate to your project root first."
    exit 1
fi

# Step 1: Upgrade Next.js & Prisma
echo "🔹 Upgrading Next.js & Prisma..."
npm install next@latest --save
npm install prisma@latest @prisma/client@latest
echo "✅ Packages upgraded"
read -p "Press Enter to continue..."

# Step 2: Generate Prisma Client
echo "🔹 Generating Prisma Client..."
npx prisma generate
echo "✅ Prisma Client generated"
read -p "Press Enter to continue..."

# Step 3: Run pending Prisma migrations if any
echo "🔹 Checking for pending Prisma migrations..."
npx prisma migrate status
read -p "Do you want to deploy pending migrations? (y/n) " migrate_choice
if [ "$migrate_choice" == "y" ]; then
    echo "🔹 Deploying migrations..."
    npx prisma migrate deploy
    echo "✅ Migrations applied"
else
    echo "⚠️ Skipping migrations. Make sure your database is up-to-date."
fi
read -p "Press Enter to continue..."

# Step 4: Build the project
echo "🔹 Building project..."
npm run build
echo "✅ Project built"
read -p "Press Enter to start local test server..."

# Optional local test
echo "🔹 Starting local server for testing..."
npm run start
echo "✅ Local server running (http://localhost:3000)"

# Step 5: Push to GitHub
echo "🔹 Pushing project to GitHub"
read -p "Enter your GitHub repo URL (e.g., https://github.com/user/repo.git): " repo_url
git init
git add .
git commit -m "Prepare project for Vercel deployment"
git branch -M main
git remote add origin $repo_url
git push -u origin main
echo "✅ Project pushed to GitHub"

# Step 6: Vercel deployment instructions
echo "🔹 Now, deploy on Vercel:"
echo " 1️⃣ Go to https://vercel.com/new → Import GitHub repo"
echo " 2️⃣ Add Environment Variables matching your local .env"
echo " 3️⃣ Build Command: npm run build"
echo " 4️⃣ Output Directory: .next"
echo "Vercel will handle installation, Prisma postinstall, and deployment."
echo "🎉 Deployment script complete!"
