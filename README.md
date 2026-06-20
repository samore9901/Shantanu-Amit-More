# Shantanu More — Portfolio

A single-page portfolio site covering education, experience, and project work in powertrain controls, engine calibration, and hybrid/electric-drive systems. Plain HTML/CSS/JS — no build step, no dependencies beyond two Google Fonts.

**Live demo (after deploy):** `https://samore9901.github.io/` or `https://samore9901.github.io/<repo-name>/` — see below.

## File structure

```
.
├── index.html              # all page content
├── css/
│   └── styles.css          # design system (colors, type, layout)
├── js/
│   └── script.js           # nav behavior, scroll-reveal, project accordions
├── assets/
│   ├── profile.jpg          # front-page photo
│   └── Shantanu_More_Resume.pdf
└── README.md
```

## Publish it on GitHub Pages

You have two options:

### Option A — your personal site (recommended)
Publishes at the root of `https://samore9901.github.io/`.

1. Create a **new repository** on GitHub named exactly: `samore9901.github.io`
2. Upload the contents of this folder (`index.html`, `css/`, `js/`, `assets/`) to the repository root — drag-and-drop on the GitHub web UI works fine, or use git:
   ```bash
   git init
   git remote add origin https://github.com/samore9901/samore9901.github.io.git
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git push -u origin main
   ```
3. Go to **Settings → Pages**. For a `username.github.io` repo, GitHub Pages is usually enabled automatically from the `main` branch — if not, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Wait 1–2 minutes, then visit `https://samore9901.github.io/`.

### Option B — a project page
If you'd rather keep this under an existing or differently-named repo (e.g. `portfolio`):

1. Push the same files to that repository.
2. Go to **Settings → Pages** → **Source**: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Your site publishes at `https://samore9901.github.io/portfolio/` (substitute your repo name).

## Updating content later

- **Text/copy:** edit `index.html` directly — each section (`#education`, `#experience`, `#projects`, `#skills`) is clearly commented.
- **Photo:** replace `assets/profile.jpg` with a new image of the same name (recommended: portrait orientation, ~900px wide).
- **Résumé:** replace `assets/Shantanu_More_Resume.pdf` with an updated PDF of the same name, or update the filename in the two "Download Résumé" links in `index.html`.
- **Colors/fonts:** all design tokens live at the top of `css/styles.css` under `:root`.

## Notes

- Fully responsive (mobile nav menu, stacking layout below ~900px).
- Respects `prefers-reduced-motion` for users who disable animations.
- No frameworks or build tools — just open `index.html` in a browser to preview locally before deploying.
