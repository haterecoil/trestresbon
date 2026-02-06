# 🗺️ Paris Restaurant Map

An interactive mobile-first map application for discovering the best restaurants in Paris, curated from [Très Très Bon](http://trestresbon.fr).

![Screenshot Placeholder]

## ✨ Features

- 📱 **Mobile-first design** - Optimized for phone use with bottom sheet navigation
- 🗺️ **Interactive map** - Browse 227+ restaurants across Paris
- 🔍 **Smart search** - Find by name, cuisine, or location
- 🎨 **Filters** - Filter by type, cuisine, budget, and metro line
- 🚇 **Metro integration** - See nearest metro stations with official line colors
- 📍 **Geolocation** - Find restaurants near you
- ⚡ **Fast performance** - WebGL rendering with marker clustering
- 🎭 **Beautiful UI** - Smooth animations and Parisian-inspired design

## 🚀 Live Demo

**[View Live Demo](https://yourusername.github.io/paris-restaurant-map)**

## 🛠️ Tech Stack

- **Framework:** Next.js 14 + React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** MapLibre GL JS (free, open-source alternative to Mapbox)
- **Animations:** Framer Motion
- **State Management:** React Query
- **Icons:** Lucide React
- **Hosting:** GitHub Pages

## 📊 Data

The app includes 227 restaurants from Très Très Bon, featuring:

- **Types:** La Table, Street-food, Bec sucré, Boui-boui, Le panier, Cave
- **Cuisines:** Français, Italien, Asiatique, and 20+ more
- **Budget:** € to €€€€ scale
- **Coverage:** Paris (1er-20ème) + suburbs (Montreuil, Pantin, Nanterre)
- **Details:** Addresses, metro stations, descriptions, photos, opening hours

## 🏃 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/paris-restaurant-map.git
cd paris-restaurant-map

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Building for Production

```bash
# Create static export
npm run export

# Files will be in /out directory
```

## 🗂️ Project Structure

```
paris-restaurant-map/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── providers.tsx      # React Query provider
├── components/             # React components
│   ├── BottomSheet.tsx    # Mobile bottom sheet UI
│   ├── FilterModal.tsx    # Filter modal
│   ├── Map.tsx            # Map component
│   ├── RestaurantCard.tsx # Restaurant detail card
│   └── SearchBar.tsx      # Search input
├── hooks/                  # Custom React hooks
│   └── useRestaurants.ts  # Data fetching hook
├── lib/                    # Utility functions
│   └── utils.ts           # Helper functions
├── types/                  # TypeScript types
│   └── index.ts           # Type definitions
├── public/                 # Static assets
│   └── data/              # Restaurant data (JSONL)
├── styles/                 # Additional styles
├── extract_data.py        # Data extraction script
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 🎨 Design System

### Colors
- **Primary:** Deep French Blue (#1E3A8A)
- **Secondary:** Warm Gold (#D97706)
- **Metro Lines:** Official RATP colors

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Mobile-first Layout
- Map takes 100% viewport
- Bottom sheet (80px collapsed → 90vh expanded)
- Thumb-friendly controls
- Gesture-based navigation

## 🔄 Updating Data

To refresh restaurant data from Très Très Bon:

```bash
# From project root
python3 extract_data.py

# Or from map-app directory
npm run extract

# Copy new data
cp data/restaurants_latest.jsonl map-app/public/data/
```

## 🚢 Deployment

### GitHub Pages (Recommended)

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

Quick deploy:
```bash
npm install --save-dev gh-pages
npm run deploy
```

### Other Platforms

The app exports static files to `/out` directory, compatible with:
- Vercel
- Netlify
- AWS S3
- Any static hosting

## 📱 Mobile UX Patterns

This app implements proven mobile UX patterns:

1. **Bottom Sheet Navigation** (Google Maps style)
   - Collapsed: Peek of first restaurant
   - Half: Scrollable list
   - Full: Restaurant details

2. **Gesture Controls**
   - Swipe up/down on handle
   - Pinch to zoom map
   - Pan to explore

3. **Quick Filters**
   - Chips for active filters
   - One-tap filter removal
   - Real-time count updates

4. **Performance**
   - Lazy loading images
   - Virtualized lists
   - Debounced search
   - Marker clustering

## 🎯 Future Enhancements

- [ ] User favorites/bookmarks
- [ ] Opening hours status (open/closed)
- [ ] Walking directions integration
- [ ] Reviews and ratings
- [ ] Dark mode
- [ ] Offline support
- [ ] "Shake to random" discovery
- [ ] Share restaurant links
- [ ] Advanced filters (arrondissement, metro line)

## 🤝 Contributing

Contributions welcome! Areas to help:
- Bug fixes
- Performance improvements
- Additional filters
- UI/UX enhancements
- Documentation

## 📄 License

MIT License - feel free to use this project as a template for your own restaurant maps!

## 🙏 Acknowledgments

- Data from [Très Très Bon](http://trestresbon.fr)
- Map tiles by [CartoDB](https://carto.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

## 📞 Support

For issues or questions:
1. Check [DEPLOY.md](./DEPLOY.md) for common issues
2. Open an issue on GitHub
3. Contact: [your-email]

---

Made with ❤️ for Parisian food lovers 🥐
