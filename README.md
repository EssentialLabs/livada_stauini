# Livada Stăuini - Cinematic Landing Site

A production-ready, cinematic landing site built with React, Vite, Tailwind v4, and GSAP. Features a spectacular interactive Earth zoom and an accessible horizontal expanding accordion.

## Quick Start
1. Ensure you have Node.js 20+ installed.
2. Run `npm install` inside the project root.
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Access the site locally at `http://localhost:5173`.

## Environment Variables
Create a `.env` file in the root based on this setup:
- `VITE_GOOGLE_MAPS_API_KEY`: Used for the cinematic Earth Zoom feature. Without this key, a fallback Mapbox/Esri fly-to animation triggers automatically using Leaflet.
- `NETLIFY_SITE_ID`: For CI/CD deployment.

### Enabling Google Maps for Earth Zoom
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Maps JavaScript API**.
3. Generate an API Key under Credentials and ensure **Billing is enabled** (required for 3D Earth features).
4. Assign the key to `REACT_APP_GOOGLE_MAPS_API_KEY` (or replace with VITE_... in your CI).

## Instagram Integration (Orchard Photos)
1. Add an external integration like EmbedSocial, or utilize the Instagram oEmbed API endpoint via a Netlify Function proxy.
2. We currently display high-quality Unsplash orchard images.
3. **Attribution Requirement**: Ensure "Fotografii: Livada Stăuini / Unsplash" remains in the footer for copyright compliance natively.

## Deployment to Netlify
Netlify deployment is already configured via `netlify.toml` and GitHub Actions.
1. Connect your GitHub repository to Netlify OR use the provided GitHub Action `.github/workflows/deploy.yml`.
2. For manual CLI deploys:
   ```bash
   npm run build
   netlify deploy --dir=dist
   ```
3. Netlify Functions (like Contact and AI Summary) will automatically deploy to `/netlify/functions/*`. 

## Built With
* React 19 (Vite)
* TailwindCSS v4
* Framer Motion
* GSAP (ScrollTrigger)
* Lucide React
* Leaflet / Esri (Earth zoom fallback)

### Accessibility & Performance
- **Custom Cursor:** Includes `prefers-reduced-motion` safety bindings and a UI toggle for users with sensory preferences. Keyboard navigable (WCAG AA compliant).
- **Lighthouse Goals:** Target 90+ Mobile, 95+ Desktop.

## Content Edits
All editable sections, meta descriptions, SEO strings, and fruit entries are managed via YAML Frontmatter inside `content/ro/română.md`. Simply edit this file and rebuild to propagate text changes cleanly!
