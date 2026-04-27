# 🚀 Deployment Guide - YourRide

Complete guide to deploy YourRide for free using **Netlify** (Frontend) + **Render** (Backend).

---

## 📋 Prerequisites

1. **GitHub account** (free)
2. **Netlify account** (free)
3. **Render account** (free)
4. **Stripe account** (for payments - use test mode)
5. **Gmail account** (for email notifications)

---

## 📦 Step 1: Push to GitHub

### Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `yourride`
3. Make it **Public** or **Private**
4. Click **Create repository**

### Push Your Code

```bash
# Navigate to project root (use the same terminal or open a new one)
cd C:\driving_service\razadrives

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - YourRide v1.0"

# Add remote (your GitHub username)
git remote add origin https://github.com/krmaazha/yourride.git

# Push
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy Backend (Render)

### Create Web Service

1. Go to https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Connect your **GitHub** account
4. Select the `yourride` repository
5. Configure:
   - **Name**: `yourride-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**
6. Click **Advanced** and add Environment Variables:

| Key | Value | Note |
|-----|-------|------|
| `NODE_ENV` | `production` | |
| `STRIPE_SECRET_KEY` | `sk_test_...` | Your Stripe test secret key |
| `EMAIL_USER` | `your-email@gmail.com` | Gmail address |
| `EMAIL_PASS` | `abcd efgh ijkl mnop` | Gmail App Password (16 chars, no spaces) |
| `CLIENT_URL` | `https://yourride.netlify.app` | We'll update this after Netlify deploy |

7. Click **Create Web Service**

8. **Copy your backend URL** (e.g., `https://yourride-api.onrender.com`)

---

## ⚡ Step 3: Deploy Frontend (Netlify)

### Deploy from GitHub

1. Go to https://app.netlify.com/
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub**
4. Authorize Netlify and select `yourride` repository
5. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **Show advanced** → **New variable**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://yourride-api.onrender.com` (from Step 2) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (your Stripe publishable key) |

7. Click **Deploy site**

8. **Copy your frontend URL** (e.g., `https://yourride-abc123.netlify.app`)

---

## 🔗 Step 4: Connect Frontend & Backend

### Update Backend CORS

1. Go back to **Render Dashboard**
2. Select your `yourride-api` service
3. Go to **Environment** tab
4. Update `CLIENT_URL` to your **actual Netlify URL**
5. Click **Save Changes**
6. Service will redeploy automatically

---

## 💳 Step 5: Configure Stripe

### Test Mode (For Development)

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy **Publishable key** (starts with `pk_test_`)
3. Copy **Secret key** (starts with `sk_test_`)
4. Add them to:
   - Netlify: `VITE_STRIPE_PUBLISHABLE_KEY`
   - Render: `STRIPE_SECRET_KEY`

### Test Card for Payments

Use this card to test payments:
- **Card**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)

---

## 📧 Step 6: Configure Email (Gmail)

### Create Gmail App Password

1. Enable **2-Step Verification** on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Select app: **Mail**
4. Select device: **Other (Custom name)** → type "YourRide"
5. Click **Generate**
6. Copy the 16-character password (no spaces)

### Add to Render

1. In Render Dashboard → Environment
2. Add:
   - `EMAIL_USER`: your Gmail address
   - `EMAIL_PASS`: the 16-character app password

---

## ✅ Step 7: Verify Everything

### Check Health Endpoints

- Backend: `https://yourride-api.onrender.com/api/health`
  - Should return: `{"status":"OK","message":"Server is running"}`

### Test the Website

1. Visit your Netlify URL
2. Fill out the **Booking Form**
3. Try **Cash on Arrival** option
4. Check your Gmail for booking notification
5. Try **Pay by Card** option (use test card)
6. Check Stripe Dashboard for successful payment

---

## 🔄 Updating Your Site

### Push Changes

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Both Netlify and Render will **automatically redeploy**!

---

## 🆘 Troubleshooting

### "CORS Error" in Browser Console
- Double-check `CLIENT_URL` in Render matches your Netlify URL exactly
- Include `https://` and no trailing slash

### "Cannot POST /api/booking" 
- Backend URL in Netlify env vars is incorrect
- Check for typos in `VITE_API_URL`

### "Stripe checkout not working"
- Verify both `VITE_STRIPE_PUBLISHABLE_KEY` (Netlify) and `STRIPE_SECRET_KEY` (Render) are set
- Use test keys, not live keys for testing

### "Email not sending"
- Verify Gmail App Password (not your regular password)
- Check Gmail has 2-Step Verification enabled
- Check Render logs for errors

---

## 🌟 Going Live (Production)

When ready for real customers:

1. **Stripe**: Switch to **Live Mode** in dashboard
2. **Get live keys** and update in Netlify/Render
3. **Custom Domain**: 
   - Buy domain (e.g., yourride.com.au)
   - Add to Netlify: **Domain settings** → **Add custom domain**
   - Update `CLIENT_URL` in Render
4. **Google Analytics**: Add tracking ID for visitor stats

---

## 📊 Free Tier Limits

| Service | Limit | Notes |
|---------|-------|-------|
| **Netlify** | 100GB bandwidth/month | Enough for small-medium site |
| **Render** | 512MB RAM | Sleeps after 15min idle (wakes on request) |
| **Stripe** | No fees in test mode | 2.9% + 30¢ per transaction in live mode |
| **Gmail** | 500 emails/day | Plenty for a small business |

---

🎉 **You're ready to go live!**

Questions? Check the logs in Render/Netlify dashboards for detailed error messages.
