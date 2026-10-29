# The Different Versions of Me

*Who am I when I'm not performing?*

An interactive self-portrait about professionalism, identity, and the different roles I play. It was made for an Informatics course at the University of Washington.

**Live site:** https://YOUR-USERNAME.github.io/different-versions-of-me/ ← update after publishing

Built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Publish with GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes the site every time you push to `main`.

1. Create a new **public** repository on GitHub (e.g. `different-versions-of-me`). Don't add a README; this project already has one.
2. In this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/different-versions-of-me.git
   git push -u origin main
   ```
3. On GitHub, open the repo's **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab. If the first run failed because Pages wasn't enabled yet, click the run and choose **Re-run all jobs**.
5. After about a minute your site is live at `https://YOUR-USERNAME.github.io/different-versions-of-me/`.

To update the site, edit, commit, and push. It redeploys automatically.

### Other hosts

- **Netlify:** run `npm run build`, then drag the `dist/` folder onto https://app.netlify.com/drop.
- **Vercel:** import the GitHub repo at https://vercel.com/new. It detects Vite automatically.

No extra configuration is needed on any host. The site uses hash URLs (`#student`, `#finale`), so links and the browser's back button work on static hosting.

## Editing the content

All writing lives in **`src/data/content.js`**. You don't need to touch the components to change the text.

- `site`: homepage title and question
- `identities`: each role's background, what you see / don't see, mask, mirror, what matters, what I carry, and accent color
- `justMe`: themes, contradictions, rewritten drafts, where I take a side
- `connections`: the shared value for each pair of versions (keys are the two ids in alphabetical order, e.g. `'president+tutor'`)
- `finale`: the ending

Lines marked `✎ illustrative` are placeholders to replace with my own experiences.

## Project structure

```
src/
  App.jsx                  page routing + navigation
  data/content.js          all site text
  components/
    Home.jsx               constellation of the six versions
    IdentityPage.jsx       page for each role
    SurfaceReveal.jsx      drag to see beneath the surface
    MaskMirror.jsx         the mask / mirror flip card
    JustMePage.jsx         the "Just Me" page
    ConnectionsMap.jsx     pick two versions to see what they share
    Finale.jsx             "Take away the titles"
    Background.jsx         particle background
  index.css                colors, fonts, global styles
```

## Accessibility

- All interactions work with a keyboard; drag interactions also have sliders/buttons.
- Respects the system "reduce motion" setting.
- Focus moves to new content on page change, and there's a skip link.
