# JANGAM — Cinematic Video Editor Portfolio

Official high-end cinematic portfolio for video editor **Prathmesh Jangam**, specialized in high-retention short-form Instagram Reels and multi-camera podcast video editing.

---

## 📽️ Project Overview

- **Owner**: Prathmesh Jangam
- **Brand**: JANGAM
- **Focus**: Short-Form Content (Instagram Reels) & Multi-Camera Podcast Videos (YouTube)
- **Email**: [prathameshjangam71@gmail.com](mailto:prathameshjangam71@gmail.com)
- **Phone**: +91 87884 50623
- **Art Direction**: Deep cinematic black (`#08090B`), reflective liquid chrome, restrained red accent (`#E74747`), 35mm analog film grain, optical viewfinder safe-area framing, and editorial display typography.

---

## ⚡ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **3D Interactive Engine**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Timeline & Scroll Orchestration**: [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Motion & Dialogs**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Quickstart & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The site will run locally at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```
Generates a minified production build in the `dist/` directory.

### 4. Run Linter
```bash
npm run lint
```
Checks code quality using ESLint.

### 5. Preview Production Build
```bash
npm run preview
```
Serves the generated `dist/` directory locally.

---

## 📁 Project Architecture

```
portfolio/
├── public/
│   ├── favicon.svg             # Dark cinematic PJ monogram SVG favicon
│   ├── videos/
│   │   ├── showreel.mp4        # Real master showreel video destination
│   │   └── README.txt          # Video asset instructions
│   └── images/
│       └── projects/           # Optional local poster artwork
├── src/
│   ├── assets/                 # Brand static assets
│   ├── components/
│   │   ├── common/
│   │   │   ├── CanvasFallback.jsx  # 2D metallic film aperture fallback
│   │   │   ├── ErrorBoundary.jsx   # 3D scene safety boundary
│   │   │   └── FilmAtmosphere.jsx  # Grain, vignette, viewfinder markers
│   │   ├── hero/
│   │   │   ├── ChromeObject.jsx    # Procedural 3D beveled film frame & iris
│   │   │   ├── HeroScene.jsx       # R3F Canvas & studio lighting setup
│   │   │   ├── HeroSection.jsx     # Fullscreen hero with GSAP reveal
│   │   │   └── ShowreelModal.jsx   # Hero showreel preview dialog
│   │   ├── navigation/
│   │   │   └── Navbar.jsx          # Scroll-spy navigation & mobile drawer
│   │   ├── showreel/
│   │   │   ├── ShowreelPlayer.jsx  # Reusable video player & transport controls
│   │   │   └── ShowreelSection.jsx # "THE WORK SPEAKS" showreel section
│   │   └── work/
│   │       ├── ProjectCard.jsx     # 9:16 vertical & 16:9 widescreen cards
│   │       ├── ProjectDetail.jsx   # In-site YouTube & Instagram player modal
│   │       └── WorkSection.jsx     # Gallery with ALL/REELS/PODCAST filters
│   ├── data/
│   │   ├── projects.js         # Verified real project data & embed URLs
│   │   └── siteConfig.js       # Centralized identity, contact, bio & copy
│   ├── pages/
│   │   └── HomePage.jsx        # Master composition page
│   ├── index.css               # Tailwind v4 theme tokens & film grain
│   └── main.jsx                # Application root entry
├── index.html                  # SEO, Open Graph & Twitter metadata
└── vercel.json                 # Vercel SPA routing & cache rules
```

---

## 🎬 How to Add or Replace the Master Showreel

1. Render your master edit video to MP4:
   - **Recommended specs**: H.264 or ProRes Proxy, 1080p or 4K DCI, 24.000 FPS, 48kHz Stereo AAC.
2. Place the video file directly at:
   ```
   portfolio/public/videos/showreel.mp4
   ```
3. When present, both the **"THE WORK SPEAKS"** video section and the **"PLAY SHOWREEL"** hero modal will automatically detect and stream the local video with full player controls, scrubber, timecode, and audio controls.
4. If absent, the player displays an intentional, cinematic placeholder with instructions without showing a broken player icon.

---

## 🛠️ Configuring Project URLs & Identity

### Identity & Contact Info
All contact details, brand identity strings, and bio copy are centralized in:
`src/data/siteConfig.js`
- Full name: `brand.fullName`
- Brand name: `brand.name`
- Monogram: `brand.monogram`
- Email: `brand.email`
- Phone: `brand.phone`
- About Bio: `about.leadBio` and `about.extendedBio`

### Project Links & Video IDs
To add or update work entries, edit:
`src/data/projects.js`
- **Short-form Reels**: Set `platform: "Instagram"`, provide `reelId` (e.g. `DcIX_q_M-3X`), and `originalUrl`.
- **Podcast Videos**: Set `platform: "YouTube"`, provide `youtubeId` (e.g. `W9yD_yIToMg`), and `originalUrl`.

---

## 📱 In-Site Video Playback & Platform Notes

### YouTube Podcast Videos
- Embedded using YouTube's privacy-enhanced domain (`youtube-nocookie.com`).
- Native player controls allow playback, pause, seeking, volume, and fullscreen inside the project modal.
- Videos are kept paused on modal open to prevent intrusive autoplay audio.

### Instagram Reels
- Embedded using Instagram's official `/embed` endpoint in a responsive 9:16 vertical player.
- **Platform Limitation Note**: In browsers with strict third-party tracking protection (e.g., Safari ITP, Brave shields, or ad blockers blocking `instagram.com`), Instagram may require user consent or block third-party iframe cookies. Every modal includes an immediate, clearly labeled **"OPEN ON INSTAGRAM ↗"** action allowing visitors to view the Reel directly.

---

## 🌐 Deployment to Vercel

The repository includes a ready-to-use `vercel.json` configuration file with SPA rewrites and asset caching rules.

### Deploying via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Deploying via Vercel Web Dashboard
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log into [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your portfolio will be live with full SSL, global CDN edge caching, and instant preview deployments.
