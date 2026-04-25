# 🎮 Game Over

A modern, visually stunning free-to-play game discovery platform. Browse, search, and explore hundreds of free games across multiple genres and platforms with a focus on premium aesthetics and smooth user experience.

> **Built with React, TypeScript, Tailwind CSS v4, and Chakra UI** — featuring a custom ocean-inspired dark theme with glassmorphism effects, dynamic floating backgrounds, and state-of-the-art GSAP animations.

---

## ✨ Features

- **Centralized Explorer** — A dedicated Games page with integrated, high-performance filtering.
- **Advanced Filtering** — Browse by **Category** (30+ genres), **Platform** (PC, Browser, All), and **Sort** (Relevance, Release Date, Alphabetical).
- **Premium Glass UI** — Frosted glass navigation, card containers, and dropdowns using advanced backdrop-blur effects.
- **Dynamic Backgrounds** — Animated floating glow elements that add depth and life to the interface.
- **High-End Game Cards** — Featuring:
  - **Interactive Hover Shine**: A moving light effect on hover.
  - **Play Free Overlay**: Contextual action buttons that slide into view.
  - **Intense Genre Badges**: High-contrast, color-coded badges for 25+ game categories.
- **Game Details** — Deep-dive pages with auto-playing screenshot sliders, detailed system requirements, and direct play links.
- **Performance & Reliability** — Built with TanStack Query for smart caching and Axios with automated CORS fallback logic.
- **Fully Responsive** — Seamless experience from ultra-wide monitors to mobile devices.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://react.dev/) | Core UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety & developer experience |
| [Tailwind CSS v4](https://tailwindcss.com/) | Design system & utility-first styling |
| [Chakra UI v3](https://www.chakra-ui.com/) | Accessible component foundation |
| [TanStack Query](https://tanstack.com/query) | Server state management & caching |
| [GSAP](https://greensock.com/gsap/) | Premium animations & scroll effects |
| [Axios](https://axios-http.com/) | Reliable API communication |
| [Lucide React](https://lucide.dev/) | Modern icon system |

---

## 🎨 Design System

### Color Palette
Inspired by deep-sea trenches transitioning into fiery sunsets:
- **Surface**: `#001219` (Ink Black)
- **Primary Accent**: `#0a9396` (Dark Cyan)
- **Glow Accent**: `#0ed3d7` (Cyan Glow)
- **Highlights**: `#ee9b00` (Golden Orange)
- **Danger/Action**: `#ae2012` (Oxidized Iron)

### UI Patterns
- **Glassmorphism**: 85%+ background opacity with `16px` blur.
- **Micro-interactions**: Scale transforms, shimmer effects, and magnetic hover states.
- **Motion**: `expo.out` easing for all page transitions and card reveals.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- RapidAPI Key for [FreeToGame](https://rapidapi.com/digiwalls/api/free-to-play-games-database)

### Setup
```bash
# Clone and Install
git clone https://github.com/mohamed-hegazy219427/game-over.git
cd game-over
npm install

# Environment Variables
# Create a .env file with:
# VITE_RAPIDAPI_KEY=your_key_here
# VITE_RAPIDAPI_HOST=free-to-play-games-database.p.rapidapi.com

# Start Development
npm run dev
```

---

## 📁 Architecture

The project follows a modular, service-oriented architecture:

```
src/
├── components/
│   ├── layout/         # Navigation, Main Layout
│   └── ui/             # Reusable UI (GameCard, Dropdowns, Sliders)
├── constants/          # Shared filter data & configurations
├── services/           # Axios API services with fallback logic
├── pages/              # Top-level route components
├── types/              # Centralized TypeScript interfaces
└── index.css           # Custom Tailwind v4 theme & animations
```

---

## 👨‍💻 Developer

**Mohamed Hegazy**
*Front-end Developer & UI/UX Enthusiast*

- GitHub: [@mohamed-hegazy219427](https://github.com/mohamed-hegazy219427)

---

##  Acknowledgments
- Data: [FreeToGame API](https://www.freetogame.com/api-doc)
- Hosting: [Netlify](https://www.netlify.com/)
- Design Inspiration: Modern Gaming Hubs
