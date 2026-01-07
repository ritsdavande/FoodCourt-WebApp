# Vercel Deployment Guide - Full Stack MERN App

## Prerequisites
✅ Code pushed to GitHub
✅ MongoDB Atlas database set up
✅ Vercel account created

## Step-by-Step Deployment

### 1. Push Updated Code to GitHub
```bash
git add .
git commit -m "Updated Vercel configuration for full-stack deployment"
git push origin master
```

### 2. Configure Vercel Project

#### Go to your Vercel Dashboard
- Navigate to your project: https://vercel.com/dashboard
- Click on your "FoodCourt" project
- Go to **Settings** → **Environment Variables**

#### Add Environment Variables
Add the following environment variable:

**Variable Name:** `MONGODB_URI`  
**Value:** Your MongoDB Atlas connection string (from `backend/db.js`)  
**Environment:** Production, Preview, Development (select all)

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/gofoodmern?retryWrites=true&w=majority
```

### 3. Redeploy the Project

#### Option A: Automatic Redeploy (Recommended)
- Go to **Deployments** tab
- Click on the three dots (...) next to the latest deployment
- Click **Redeploy**
- Check "Use existing Build Cache" is OFF
- Click **Redeploy**

#### Option B: Trigger New Deployment
- Simply push a new commit to GitHub (already done in Step 1)
- Vercel will automatically redeploy

### 4. Verify Deployment

Once deployed, test these endpoints:

1. **Frontend:** `https://your-app.vercel.app`
2. **Backend API:** `https://your-app.vercel.app/api/foodData` (should return data)
3. **Health Check:** `https://your-app.vercel.app/` (should show "Hello World!")

### 5. Test Your App

- Try logging in
- Add items to cart
- Place an order
- Check "My Orders" page

## Troubleshooting

### If you still see "Server not responding":
1. Check Vercel **Function Logs** (in Deployments → View Function Logs)
2. Verify MongoDB connection string is correct
3. Ensure MongoDB Atlas allows connections from anywhere (IP: `0.0.0.0/0`)

### MongoDB Atlas Network Access:
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Important Notes

- The backend runs as **Vercel Serverless Functions**
- All `/api/*` routes are handled by `backend/index.js`
- Frontend is served as static files from the `build` folder
- CORS is configured to allow all origins (`*`)

## Files Modified for Deployment

- ✅ `vercel.json` - Vercel configuration
- ✅ `backend/index.js` - CORS and serverless setup
- ✅ All frontend API calls - Using relative paths (`/api/...`)
- ✅ `package.json` - Added proxy for local development
