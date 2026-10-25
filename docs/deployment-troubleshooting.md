# Deployment Troubleshooting - Quick Reference

**Last Updated:** March 12, 2026
**App Status:** ✅ Code is healthy - check deployment platform

---

## 🚨 Site Not Publishing? Follow These Steps

### Step 1: Test Local Build (5 minutes)

## Open terminal and run

```bash
npm install
npm run build
npm run preview

```text

**Expected Result:**

- ✅ Build completes without errors
- ✅ Preview opens at http://localhost:3000
- ✅ Site works correctly

**If build fails:**

- Read the error message carefully
- Check for missing dependencies
- Run `npm install` again

**If build succeeds:**

- ✅ Code is fine
- ❌ Issue is in Netlify deployment

---

### Step 2: Check Netlify Dashboard (3 minutes)

**Go to:** https://app.netlify.com

1. **Find your site** in the dashboard

1. **Click on "Deploys"** tab

1. **Look at the most recent deploy**

**Check Status:**

- ✅ **Green checkmark** = Deployed successfully
- ❌ **Red X** = Deploy failed
- ⏳ **Yellow circle** = Currently deploying

---

### Step 3: Read Build Logs (5 minutes)

**If deploy failed:**

1. Click on the **failed deploy**

1. Scroll down to **"Deploy log"**

1. Read the **last 20 lines** of the log

1. Look for error messages in **RED**

**Common Errors:**

| Error Message | Solution |
|---------------|----------|
| `npm ERR! code ENOENT` | Dependencies not installed properly - clear build cache |
| `Error: Cannot find module` | Missing dependency - check package.json |
| `TypeScript error TS2304` | Type error - run `npm run type-check` locally |
| `FATAL ERROR: JavaScript heap out of memory` | Increase Node memory - add env var `NODE_OPTIONS=--max-old-space-size=4096` |
| `Command failed with exit code 1` | Build command failed - check command is `npm run build` |

---

### Step 4: Verify Netlify Settings (2 minutes)

**Go to:** Site Settings → Build & Deploy

## Check these settings

| Setting | Correct Value |
|---------|---------------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Production branch | `main` or `master` |
| Node version | 18 |

**If any are wrong:**

1. Click "Edit settings"

1. Update the value

1. Save

1. Trigger new deploy

---

### Step 5: Test Default Netlify URL (1 minute)

## Your default URL format

```text
https://[your-site-name].netlify.app

```text

## Try accessing it in your browser

**Result:**

- ✅ **Site loads** = Deployment successful, DNS issue if custom domain doesn't work
- ❌ **404 error** = Deployment failed, check build logs
- ❌ **Page not found** = Routing issue, check SPA redirect rule

---

### Step 6: Force Clean Deploy (5 minutes)

## If previous steps didn't work

1. **Netlify Dashboard** → Site Settings

1. **Build & Deploy** → Build settings

1. Click **"Clear build cache"**

1. Go to **Deploys** tab

1. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

1. **Watch the build log** in real-time

---

## 🔍 Diagnostic Questions

### Q1: Does `npm run build` work locally

- ✅ **Yes** → Issue is in Netlify, not code
- ❌ **No** → Fix local build errors first

---

### Q2: What does Netlify build log say

- 🟢 **Build succeeded** → Check deploy status
- 🔴 **Build failed** → Read error message, fix issue
- ⚠️ **Timeout** → Increase build timeout in Netlify settings

---

### Q3: Does the default Netlify URL work

- ✅ **Yes** → Custom domain DNS issue
- ❌ **No** → Build or deployment issue

---

### Q4: Is the correct branch being deployed

- Check **Site Settings** → **Build & deploy** → **Deploy contexts**
- Verify **Production branch** matches your Git branch name

---

## 🛠️ Quick Fixes

### Fix 1: Missing Environment Variables

## If you need environment variables

1. Netlify Dashboard → Site settings

1. Build & deploy → Environment

1. Click "Edit variables"

1. Add required variables (e.g., `NODE_VERSION=18`)

1. Redeploy

**Note:** This app doesn't use environment variables ✅

---

### Fix 2: Build Command Issues

## Wrong build command

**Correct command:**

```text
npm run build

```text

**NOT:**

- ❌ `npm build`
- ❌ `npm run deploy`
- ❌ `vite build`

---

### Fix 3: Publish Directory Wrong

## Correct publish directory

```text
dist

```text

**NOT:**

- ❌ `build`
- ❌ `public`
- ❌ `out`

---

### Fix 4: Node Version Too Old

**Minimum required:**

- Node: 18+
- npm: 9+

**Set in Netlify:**

1. Site Settings → Build & deploy → Environment

1. Add environment variable: `NODE_VERSION` = `18`

1. Redeploy

---

### Fix 5: SPA Routing Not Working

## If routes show 404 errors

## Check `netlify.toml` has

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

```text

**This file exists and is correct** ✅

---

## 📞 Get Help

### Information to Provide

If you need help diagnosing, provide:

1. **Last 50 lines** of Netlify build log

1. **Default Netlify URL** (e.g., `https://your-site.netlify.app`)

1. **Custom domain** (if configured)

1. **Error message** from build log (if any)

1. **Output of** `npm run build` (if it fails locally)

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] `npm install` completes without errors
- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows working site
- [ ] Netlify build command is `npm run build`
- [ ] Netlify publish directory is `dist`
- [ ] Netlify Node version is 18+
- [ ] Git repository is connected to Netlify
- [ ] Correct branch is being deployed
- [ ] Build logs have been reviewed for errors

---

## 🎯 Most Likely Issues

Based on health check, these are the most likely causes:

### 1. Build Command Not Executing ⚠️

**Symptom:** Deploy shows "Build started" but never completes

**Solution:** Check Netlify build logs for timeout or out-of-memory errors

---

### 2. Dependencies Not Installing ⚠️

**Symptom:** Build log shows `npm ERR!` messages

**Solution:** Clear build cache, trigger clean deploy

---

### 3. Branch Not Connected ⚠️

**Symptom:** No deploys triggered when pushing to Git

**Solution:**

1. Check Site Settings → Build & deploy → Deploy contexts

1. Verify production branch name matches your repo

---

### 4. Custom Domain DNS Issues ⚠️

**Symptom:** Default Netlify URL works, custom domain doesn't

**Solution:**

1. Check DNS records point to Netlify

1. Wait 24-48 hours for DNS propagation

1. Check HTTPS certificate status

---

## 📚 Related Documentation

- **[Health Check Report](/reports/site-health-check/health-check-report.md)** - Full diagnostic report
- **[Netlify Docs](https://docs.netlify.com/)** - Official Netlify documentation
- **[Vite Deployment](https://vitejs.dev/guide/static-deploy.html)** - Vite deployment guide

---

**Last Verified:** March 12, 2026
**Code Status:** ✅ Healthy and production-ready
**Issue Location:** Deployment platform configuration
