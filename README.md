# GreenTail - Sustainable Pet Food Verification Platform

A modern web application that helps pet parents choose organic, planet-friendly pet food with confidence. Built with React and Tailwind CSS.

## 🌟 Features

- **Pet Food Quiz** - 90-second quiz to understand your pet's needs
- **Store Locator** - Find nearby stores that carry recommended products
- **Sustainability Focus** - Environmental impact scoring and eco-friendly recommendations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Smooth animations and intuitive navigation

## 🚀 Quick Start

### Option 1: React Development Server (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Option 2: Static HTML Files

Simply open any of these files directly in your browser:
- `complete-homepage.html` - Main homepage with all features
- `first-time-pet.html` - Pet parenting guide
- `shops-near-you.html` - Store locator page

## 📁 Project Structure

```
greentail-assets/
├── src/                          # React source code
│   ├── HomePage.jsx             # Main homepage component
│   ├── QuizPage.jsx             # Pet quiz page component
│   ├── SearchPage.jsx           # Store search page component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── public/                       # Static assets
│   ├── logos/                   # Logo files
│   ├── images/                  # Hero images
│   └── icons/                   # SVG icons
├── App.jsx                      # Main React app with routing
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js               # Vite build configuration
├── complete-homepage.html       # Standalone homepage
├── first-time-pet.html          # Standalone quiz page
├── shops-near-you.html          # Standalone search page
└── README.md                    # This file
```

## 🎨 Design Features

### Visual Design
- **Modern Gradient Backgrounds** - Soft blue-green gradients
- **Card-based Layout** - Clean, organized information display
- **Responsive Grid System** - Adapts to all screen sizes
- **Smooth Animations** - Hover effects and transitions

### Color Scheme
- **Primary Green**: #33664C (GreenTail brand color)
- **Text Colors**: Gray-900 for headings, Gray-600 for body text
- **Background**: Blue-green gradients with white cards
- **Accents**: Green-800 for buttons and highlights

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Headings**: Bold, large sizes with proper hierarchy
- **Body Text**: Readable line heights and spacing

## 🛠️ Technology Stack

- **Frontend**: React 18 with modern hooks
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router for single-page application navigation
- **Build Tool**: Vite for fast development and building
- **Icons**: Custom SVG icons for consistent design
- **Images**: Optimized PNG/SVG assets

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+) - Full layout with side-by-side content
- **Tablet** (768px-1199px) - Adjusted grid layouts
- **Mobile** (320px-767px) - Stacked layout with touch-friendly buttons

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with main value proposition
- How it works explanation
- Why choose GreenTail features
- Trust indicators and testimonials

### Quiz Page (`/quiz`)
- Pet parenting guide for new owners
- Video content placeholder
- Essential information cards
- Organic food education

### Search Page (`/search`)
- Store locator with real data
- Interactive map placeholder
- Store information and contact details
- Distance and availability information

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Customization

- **Colors**: Modify `tailwind.config.js` for brand colors
- **Content**: Update component files in `src/` directory
- **Assets**: Replace files in `public/` directories
- **Styling**: Use Tailwind utility classes or modify `src/index.css`

## 📄 License

MIT License - feel free to use this code for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

For questions or support, please contact the GreenTail team.

---

**Built with ❤️ for pet parents and the planet**