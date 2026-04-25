# 🎮 Game Over

A modern, visually stunning free-to-play game discovery platform. Browse, search, and explore hundreds of free games across multiple genres and platforms.

> Built with React, TypeScript, Tailwind CSS v4, and Chakra UI — featuring a custom ocean-inspired dark theme with glassmorphism effects and smooth GSAP animations.

---

## ✨ Features

- **Browse Games** — Explore a vast library of free-to-play games with infinite scroll
- **Filter by Category** — MMORPG, Shooter, Strategy, MOBA, Racing, and 25+ more genres
- **Filter by Platform** — PC, Browser, or All
- **Sort Results** — By relevance, popularity, release date, or alphabetically
- **Game Details** — Full game info with screenshots slider, system requirements, and metadata
- **Genre-Coded Badges** — Each genre has a unique color identity for quick visual scanning
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop
- **Smooth Animations** — GSAP-powered entrance animations and scroll-triggered reveals
- **Glass UI** — Frosted glass navbar, cards, and overlays using backdrop-blur effects
- **Custom Color Palette** — 10-color ocean-to-fire gradient theme (ink-black → brown-red)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling & color system |
| [Chakra UI v3](https://www.chakra-ui.com/) | Component library (layout & behavior) |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [TanStack Query](https://tanstack.com/query) | Server state & caching |
| [GSAP](https://greensock.com/gsap/) | Animations & scroll effects |
| [Axios](https://axios-http.com/) | HTTP client |
| [Lucide React](https://lucide.dev/) | Icon system |

---

## 🎨 Color Palette

The app uses a custom 10-color palette inspired by ocean depths to sunset warmth:

| Name | Hex | Usage |
|------|-----|-------|
| Ink Black | `#001219` | Page background |
| Dark Teal | `#005f73` | Raised surfaces, borders |
| Dark Cyan | `#0a9396` | Primary accent |
| Pearl Aqua | `#94d2bd` | Secondary text |
| Vanilla Custard | `#e9d8a6` | Card game badges |
| Golden Orange | `#ee9b00` | Warm highlights |
| Burnt Caramel | `#ca6702` | Racing badges |
| Rusty Spice | `#bb3e03` | Action badges |
| Oxidized Iron | `#ae2012` | Error states |
| Brown Red | `#9b2226` | MOBA badges |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A free API key from [RapidAPI — FreeToGame](https://rapidapi.com/digiwalls/api/free-to-play-games-database)

### Installation

```bash
# Clone the repository
git clone https://github.com/mohamed-hegazy219427/game-over.git

# Navigate to the project
cd game-over

# Install dependencies
npm install
```


### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── assets/              # Static assets (logo, images)
├── components/
│   ├── layout/
│   │   ├── Layout.tsx       # Root layout with navbar & footer
│   │   └── Navbar.tsx       # Glass navigation with dropdowns
│   └── ui/
│       ├── BackToTop.tsx    # Scroll-to-top button
│       ├── ErrorState.tsx   # Error display with retry
│       ├── GameCard.tsx     # Game card with genre badges
│       ├── GameCardSkeleton.tsx  # Loading skeleton
│       ├── Loading.tsx      # Spinner component
│       └── ScreenShotsSlider.tsx # Auto-playing image carousel
├── pages/
│   ├── Home.tsx         # Hero + recommendations
│   ├── Games.tsx        # Game grid with filters
│   ├── GameDetails.tsx  # Full game info page
│   └── NotFound.tsx     # 404 page
├── App.tsx              # Router configuration
├── main.tsx             # Entry point
├── theme.ts             # Chakra UI system config
├── types.ts             # TypeScript interfaces
└── index.css            # Tailwind v4 design system
```

---

## 👨‍💻 Developer

**Mohamed Hegazy**

- GitHub: [@mohamed-hegazy219427](https://github.com/mohamed-hegazy219427)

---

##  Acknowledgments

- Game data provided by [FreeToGame API](https://www.freetogame.com/api-doc)
- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [GSAP](https://greensock.com/)
