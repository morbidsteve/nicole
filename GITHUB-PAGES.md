# Deploy to GitHub Pages (FREE)

Your website can be hosted completely free on GitHub Pages! This is the easiest and most cost-effective option.

## Quick Setup (2 Minutes)

### Option 1: Deploy from Main Branch (Simplest)

1. **Merge your branch to main**:
   ```bash
   git checkout main
   git merge claude/lifestyle-management-site-011VRbjA2Ah1X4zBmxwcXkyR
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository: https://github.com/morbidsteve/nicole
   - Click **Settings** (top menu)
   - Click **Pages** (left sidebar)
   - Under "Source", select **Deploy from a branch**
   - Select branch: **main**
   - Select folder: **/ (root)**
   - Click **Save**

3. **Wait 2-3 minutes**, then visit:
   ```
   https://morbidsteve.github.io/nicole/
   ```

That's it! Your website is now live for FREE! 🎉

### Option 2: Deploy from Current Branch (No Merge Needed)

1. **Enable GitHub Pages**:
   - Go to: https://github.com/morbidsteve/nicole/settings/pages
   - Under "Source", select **Deploy from a branch**
   - Select branch: **claude/lifestyle-management-site-011VRbjA2Ah1X4zBmxwcXkyR**
   - Select folder: **/ (root)**
   - Click **Save**

2. **Wait 2-3 minutes**, then visit:
   ```
   https://morbidsteve.github.io/nicole/
   ```

## Custom Domain (Optional)

### Use Your Own Domain Name

If you want to use `purelyplanned.com` instead of `morbidsteve.github.io/nicole`:

1. **Buy a domain** (if you don't have one):
   - Namecheap: ~$10/year
   - Google Domains: ~$12/year
   - Cloudflare: ~$10/year (recommended)

2. **Configure DNS** at your domain registrar:

   Add these DNS records:
   ```
   Type: A     Name: @     Value: 185.199.108.153
   Type: A     Name: @     Value: 185.199.109.153
   Type: A     Name: @     Value: 185.199.110.153
   Type: A     Name: @     Value: 185.199.111.153
   Type: CNAME Name: www   Value: morbidsteve.github.io
   ```

3. **Add custom domain in GitHub**:
   - Go to: https://github.com/morbidsteve/nicole/settings/pages
   - Under "Custom domain", enter: `purelyplanned.com`
   - Click **Save**
   - Check **Enforce HTTPS** (wait a few minutes for it to be available)

4. **Wait 24 hours** for DNS propagation

Your site will be live at `https://purelyplanned.com` with FREE SSL!

## Automatic Deployments

Every time you push to your branch, GitHub automatically updates your website within 2-3 minutes. No manual deployment needed!

```bash
# Make changes to your files
git add .
git commit -m "Update website content"
git push

# Wait 2-3 minutes - changes are live!
```

## Features Included (All FREE)

✅ **FREE Hosting** - No monthly costs
✅ **FREE SSL Certificate** - Automatic HTTPS
✅ **FREE CDN** - Fast global delivery
✅ **Unlimited Bandwidth** - No traffic limits for reasonable use
✅ **99.9% Uptime** - GitHub's infrastructure
✅ **Automatic Deployments** - Push code → Live in minutes
✅ **Custom Domain Support** - Use your own domain
✅ **DDoS Protection** - Built-in security

## Limitations (Very Minor)

- **File Size Limit**: 100MB per file (your site is ~50KB, so no issue)
- **Repo Size Limit**: 1GB total (you're using ~1MB, so no issue)
- **Bandwidth**: Recommended 100GB/month (can handle 100,000+ visitors)
- **Static Sites Only**: No server-side code (PHP, Python, etc.) - but you don't need it!

Your website is perfect for GitHub Pages - no limitations apply! ✨

## Troubleshooting

### Website Shows 404
- Wait 3-5 minutes after enabling Pages
- Check Settings → Pages shows a green success message
- Verify your branch is selected correctly

### Custom Domain Not Working
- Verify DNS records are correct (use https://dnschecker.org)
- Wait 24 hours for DNS propagation
- Check "Enforce HTTPS" is enabled

### Changes Not Showing
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Wait 2-3 minutes after pushing
- Check the Actions tab for deployment status

### Form Submissions Won't Work
GitHub Pages is static only. For the contact form and intake form to work, you need to:

**Option 1: Use Formspree (Recommended - FREE)**
```html
<!-- In index.html and intake.html, update form tags: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Steps:
1. Go to https://formspree.io
2. Sign up (free plan: 50 submissions/month)
3. Create a form for nicole.McAllister.mgmt@gmail.com
4. Get your form ID
5. Update `action` attribute in both forms

**Option 2: Use Netlify Forms**
- Deploy to Netlify instead (also free)
- Forms work automatically

**Option 3: Use Google Forms**
- Embed Google Forms instead
- Responses go to Google Sheets

I recommend Formspree - it's the easiest integration with your existing forms.

## GitHub Pages vs VPS Comparison

| Feature | GitHub Pages | VPS (Docker) |
|---------|-------------|--------------|
| **Cost** | FREE | $5-6/month |
| **Setup Time** | 2 minutes | 15 minutes |
| **SSL/HTTPS** | FREE & Automatic | Need setup |
| **Maintenance** | Zero | Update containers |
| **Performance** | Global CDN | Single location |
| **Uptime** | 99.9% | Depends on provider |
| **Forms** | Need service | Can handle natively |
| **Custom Domain** | FREE | FREE |

**Recommendation**: Start with GitHub Pages (FREE). Only switch to VPS if you need server-side features later.

## Production Checklist

- [ ] GitHub Pages enabled
- [ ] Website accessible at github.io URL
- [ ] Custom domain configured (optional)
- [ ] HTTPS enforced
- [ ] Form service integrated (Formspree, etc.)
- [ ] Test all pages load correctly
- [ ] Test mobile responsiveness
- [ ] Test contact forms work

## Getting Your GitHub Pages URL

Once enabled, your site will be at:
```
https://morbidstebe.github.io/nicole/
```

Or with custom domain:
```
https://purelyplanned.com
```

## Next Steps

1. **Enable GitHub Pages** (2 minutes)
2. **Test your site** at the GitHub Pages URL
3. **Optional**: Set up custom domain
4. **Optional**: Integrate Formspree for contact forms
5. **Share your link** with clients! 🚀

---

**Congratulations!** Your website is now hosted professionally for FREE on GitHub's infrastructure! 🎉
