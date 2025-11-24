# GreenTail - Sustainable Pet Food Verification Platform

##  Live Demo

**(https://uw-info442-au25.github.io/GreenTail-G2/)**

## Overview

GreenTail is a web application that helps pet parents find sustainable, organic pet food that fits their budget and values. Our smart matching algorithm considers user preferences, pet needs, and environmental impact to recommend the best products.

**Project Philosophy**: This MVP was designed around two distinct user personas - the environmentally conscious pet parent and the new pet parent seeking guidance. Every feature, from the smart quiz to the comparison tools, was developed with these specific user needs in mind.

## Features

### Core Functionality (Persona-Driven Design)

#### For Emma Chen (Conscious Pet Parent):
- **Smart Quiz**: Captures sustainability priorities and environmental impact preferences
- **Environmental Impact Indicators**: Clear sustainability metrics and eco-friendly certifications
- **Product Comparison**: Detailed environmental impact comparison tools
- **Transparency Features**: Ingredient sourcing and sustainability verification

#### For Sarah Williams (New Pet Parent):
- **Educational Quiz**: Age-appropriate feeding guidance and nutrition education
- **Beginner-Friendly Interface**: Simple, guided product discovery process
- **Educational Content**: Pet nutrition information and feeding guidelines
- **Trust Indicators**: Clear product recommendations with explanations

#### Shared Features:
- **Product Matching**: AI-powered algorithm that considers both sustainability and educational needs
- **Product Search**: Advanced filtering for both environmental and nutritional criteria
- **User Profiles**: Personalized preferences and saved products
- **Responsive Design**: Mobile-first approach for busy pet parents

### Key Pages
- **Homepage** (`/`): Introduction and feature overview
- **Quiz** (`/quiz`): Interactive questionnaire for personalized recommendations
  - **Quiz Steps** (`/quiz/0` to `/quiz/5`): Individual quiz question pages with YouTube video integration
- **Search** (`/search`): Browse and filter products with advanced options, includes store locator map
- **Results** (`/results`): Personalized product recommendations after quiz completion, includes store locator map
- **Compare** (`/compare`): Compare products side-by-side with detailed insights
- **Profile** (`/profile`): Manage saved products and user preferences
- **About** (`/about`): Team information and project details
- **First Time Pet Owner** (`/first-time`): Educational guide for new pet parents
- **Shops Near You** (`/shops-near-you`): Interactive store locator with map integration
- **Login** (`/login`): User authentication page
- **Educational Guides**:
  - **Pet Food Labels Guide** (`/pet-food-labels-guide`): Learn to decode pet food labels
  - **Organic Pet Food Guide** (`/organic-pet-food-guide`): Understanding what "organic" covers
- **Legal Pages**:
  - **Cookie Policy** (`/cookie-policy`): Cookie usage and consent information
  - **Privacy Policy** (`/privacy-policy`): Privacy policy and data handling
  - **Terms of Service** (`/terms-of-service`): Terms and conditions
- **Test Page** (`/test`): Development testing and navigation hub

## Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with PostCSS
- **Routing**: React Router DOM v7
- **State Management**: React Context API
  - `QuizContext`: Manages quiz state and user responses
  - `AuthContext`: Handles user authentication and profiles
  - `ToastContext`: Manages toast notifications
- **Maps**: Leaflet with react-leaflet for interactive store location maps
- **Icons**: Custom SVG icons
- **Build Tool**: Vite with React plugin
- **Code Quality**: ESLint with React plugins
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Getting Started

### Prerequisites
- Node.js (version 16 or higher, recommended: 18+)
- npm (comes with Node.js) or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kaibo-wang/GreenTail-G2.git
cd GreenTail-G2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. The development server will automatically open your browser at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
GreenTail-G2/
├── public/
│   ├── images/          # Team photos and general images
│   ├── img/            # Product images
│   ├── icons/          # SVG icons
│   └── logos/          # Brand logos
├── src/
│   ├── components/     # Reusable React components
│   │   ├── Collapsible.jsx          # Collapsible content sections
│   │   ├── ContextualHelpBanner.jsx # Educational help banner
│   │   ├── CookieConsent.jsx        # Cookie consent banner
│   │   ├── ReadingTime.jsx          # Reading time calculator
│   │   ├── RouteTransition.jsx      # Page transition animations
│   │   ├── StoreMapModal.jsx       # Interactive store location map
│   │   ├── Toast.jsx               # Toast notification component
│   │   ├── TransitionPlanModal.jsx # Pet food transition plan modal
│   │   └── YouTubeVideo.jsx         # YouTube video embed component
│   ├── contexts/       # React Context providers
│   │   └── ToastContext.jsx        # Toast notification context
│   ├── data/          # Product database and matching algorithm
│   │   └── petFoodDatabase.js      # Product data and matching logic
│   ├── hooks/         # Custom React hooks
│   │   ├── useInteractionMode.js   # User interaction mode detection
│   │   └── useScrollAnimation.js   # Scroll-based animations
│   ├── utils/         # Utility functions
│   │   ├── matchingAlgorithm.js    # Product matching algorithm
│   │   ├── storeLocator.js         # Store location utilities
│   │   └── testMatching.js         # Matching algorithm tests
│   ├── AboutPage.jsx
│   ├── App.jsx                    # Main app component with routing
│   ├── AuthContext.jsx            # Authentication context
│   ├── ComparePage.jsx
│   ├── CookiePolicyPage.jsx
│   ├── FirstTimePage.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── OrganicPetFoodGuide.jsx
│   ├── PetFoodLabelsGuide.jsx
│   ├── PrivacyPolicyPage.jsx
│   ├── ProfilePage.jsx
│   ├── ProgressBar.jsx
│   ├── Quiz0.jsx through Quiz5.jsx # Individual quiz steps
│   ├── QuizContext.jsx            # Quiz state management
│   ├── QuizPage.jsx
│   ├── ResultsPage.jsx
│   ├── SearchPage.jsx
│   ├── ShopsNearYouPage.jsx
│   ├── TermsOfServicePage.jsx
│   ├── TestPage.jsx
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Application entry point
├── docs/              # Documentation
│   ├── COMPARE_PAGE_ARCHITECTURE.md
│   ├── QUIZ_PAGE_ARCHITECTURE.md
│   ├── RESULTS_PAGE_ARCHITECTURE.md
│   ├── TESTING_CHECKLIST.md
│   └── TESTING_PROTOCOL.md
├── index.html         # Main HTML file
├── package.json       # Dependencies and scripts
├── vite.config.js    # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── postcss.config.cjs # PostCSS configuration
```

## Key Features Implementation

### Smart Matching Algorithm
- Considers user preferences from quiz responses
- Weights factors like sustainability, price, and pet needs
- Provides match scores and recommendations
- Located in `src/utils/matchingAlgorithm.js`

### User Authentication
- Mock authentication system for demonstration
- User profiles with personalized preferences
- Saved products functionality
- localStorage-based persistence
- Multiple persona support (Emma Chen, Sarah Williams, etc.)
- **Privacy-First Design**: All core features (quiz, search, compare) work without login
- **Optional Authentication**: Login is a convenience feature for cross-device sync, not a barrier

### Store Locator & Maps
- Interactive map using Leaflet and react-leaflet
- ZIP code-based store search
- Store information display (address, hours, phone, products)
- Integration on Search, Results, and Shops Near You pages
- Google Maps integration for directions

### Toast Notification System
- Context-based toast notifications
- Multiple notification types (success, error, info)
- Auto-dismiss functionality
- Smooth animations

### Cookie Consent
- GDPR-compliant cookie consent banner
- 30-day expiration tracking
- localStorage-based consent storage
- Links to cookie policy page

### Educational Features
- YouTube video integration in quiz pages
- Contextual help banners with educational links
- Pet food transition plan modal (7-14 day guide)
- Reading time calculator for educational content
- Guides for pet food labels and organic certification

### Route Transitions
- Smooth page transitions similar to Nuxt.js
- Fade animations between routes
- Optimized for client-side routing

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Breakpoints for different screen sizes
- Touch-friendly interface elements
- Adaptive layouts for desktop, tablet, and mobile

## Team Members

- **Sammi Huang** - Product Manager
- **Lele Zhang** - UX & Research  
- **Kaibo Wang** - Product Design
- **Lanqi Zhang** - User Research
- **Amber Lu** - Development

## Development Process

This project was developed using collaborative programming practices with all team members contributing to different aspects:

- **Sammi Huang**: User experience design, project management, and user interface design
- **Lele Zhang**: Data analysis, research methodology, and product database curation
- **Kaibo Wang**: Product design, visual design, and user interface implementation
- **Lanqi Zhang**: User research, persona development, and usability testing
- **Amber Lu**: Frontend development, technical implementation, and code architecture

## Testing

### Testing Philosophy
Our testing approach is designed around our two primary personas to ensure the application meets their specific needs and expectations.

### Persona-Based Testing Scenarios

#### Testing for Emma Chen (Conscious Pet Parent)
- **Environmental Impact Features**: Verify sustainability indicators and certifications display correctly
- **Product Comparison**: Test detailed environmental impact comparison tools
- **Transparency Features**: Ensure ingredient sourcing information is accessible and clear
- **Research Tools**: Validate that advanced filtering and search meet research needs

#### Testing for Sarah Williams (New Pet Parent)
- **Educational Content**: Verify quiz provides helpful nutrition education
- **Beginner-Friendly Interface**: Test that navigation is intuitive and guided
- **Trust Indicators**: Ensure product recommendations include clear explanations
- **Learning Support**: Validate that educational content is accessible throughout the app

### Core Testing Areas

#### 1. **Quiz Functionality**
- Complete quiz flow for both persona types
- Verify personalized recommendations match user responses
- Test educational content delivery for Sarah's learning needs
- Validate environmental preference capture for Emma's research needs

#### 2. **Product Search & Filtering**
- Test advanced filtering for environmental criteria (Emma)
- Verify beginner-friendly search experience (Sarah)
- Validate real-time results updates
- Test tag-based filtering system

#### 3. **Product Comparison**
- Test 2-3 product comparison functionality
- Verify environmental impact scoring (Emma)
- Test educational insights display (Sarah)
- Validate score calculation accuracy

#### 4. **User Profiles & Authentication**
- Test persona-specific data loading
- Verify saved products functionality
- Test preference persistence
- Validate personalized recommendations

#### 5. **Responsive Design**
- Test on desktop (Emma's primary device)
- Test on mobile (Sarah's frequent usage)
- Verify touch interactions work correctly
- Validate layout adaptation across screen sizes

### Performance Benchmarks
- **Page Load Times**: < 3 seconds for all pages
- **Quiz Completion**: < 90 seconds as promised
- **Search Response**: < 1 second for filtered results
- **Mobile Performance**: Smooth scrolling and interactions

### Cross-Browser Compatibility
- **Primary**: Chrome (both personas' preferred browser)
- **Secondary**: Firefox, Safari, Edge
- **Mobile**: Chrome Mobile, Safari Mobile

### Known Limitations
1. **Social Login**: Mock implementation only
2. **Data Persistence**: localStorage only (not server-side)
3. **ARIA Labels**: Limited accessibility implementation
4. **Offline Support**: Basic only

### Success Criteria
The application passes testing if:
- Both personas can complete their primary tasks successfully
- Environmental features meet Emma's research needs
- Educational features support Sarah's learning journey
- Performance meets benchmarks across all devices
- No critical bugs prevent core functionality

See `TESTING_PROTOCOL.md` for detailed testing procedures and expected results.

## Primary User Personas

GreenTail MVP primarily serves two key user personas that represent our core target audience:

### 1. **The Conscious Pet Parent (Emma Chen)**
- **Profile**: 28-year-old UX Designer with an adult Golden Retriever
- **Core Need**: Finding organic, sustainable pet food options with clear environmental impact information
- **Key Pain Points**: Overwhelmed by product options, difficulty understanding ingredient labels and sustainability claims
- **Behavior**: Thoroughly researches products, values transparency and visual interfaces, prioritizes environmental impact
- **Why Primary**: Represents environmentally conscious pet parents who are the core audience for sustainable pet food verification
- **Design Impact**: Features like environmental impact indicators, sustainability certifications, and detailed ingredient sourcing were specifically designed for Emma's research-driven approach

#### Solving the "Privacy Paradox": Architecture for Emma

One of our core challenges was serving Emma's dual needs: she requires complete **product transparency** (data, algorithms) while being highly sensitive to **data privacy** (resistant to forced login).

We solved this paradox through **architectural design**:

* **No-Login Core Features**: The entire quiz (`Quiz0.jsx` through `Quiz5.jsx`), search (`SearchPage.jsx`), and comparison (`ComparePage.jsx`) features work **completely without login**.

* **Client-Side State Management**: User quiz answers are stored in client-side `QuizContext`, not immediately sent to a server.

* **Local Storage First**: The "saved products" feature uses `localStorage` (`ProfilePage.jsx`, `SearchPage.jsx`), allowing users to save anonymously.

* **Optional Value-Add Login**: `AuthContext` treats login as a **convenience feature** (for cross-device sync), not a barrier.

### 2. **The New Pet Parent (Sarah Williams)**
- **Profile**: 24-year-old User Researcher with a Golden Retriever puppy
- **Core Need**: Educational guidance on proper pet nutrition and age-appropriate feeding
- **Key Pain Points**: Overwhelmed by pet nutrition information, needs beginner-friendly guidance and trustworthy recommendations
- **Behavior**: Seeks educational content, values step-by-step guidance, wants to make informed decisions from the start
- **Why Primary**: Represents the growing market of first-time pet owners who need education and guidance, representing significant growth potential
- **Design Impact**: The educational quiz, beginner-friendly interface, and trust indicators were created specifically to address Sarah's need for guidance and education

### How Personas Shaped Our Design Decisions

#### Quiz Design
- **Emma's Influence**: Quiz includes detailed sustainability questions and environmental impact preferences
- **Sarah's Influence**: Quiz provides educational content about pet nutrition and age-appropriate feeding

#### Product Matching Algorithm
- **Emma's Influence**: Algorithm heavily weights environmental factors, sustainability certifications, and ingredient transparency
- **Sarah's Influence**: Algorithm prioritizes educational value, beginner-friendly products, and clear explanations

#### User Interface
- **Emma's Influence**: Clean, professional design with detailed information displays and comparison tools
- **Sarah's Influence**: Simple navigation, clear explanations, and guided user flows

### Common Characteristics
Both personas share values of environmental consciousness, pet health and wellbeing, quality and transparency, and informed decision-making. They expect mobile-responsive design, fast loading times, and intuitive navigation.

See `USER_PERSONAS.md` for detailed information about our target users and their characteristics.

## Deployment

The application is designed to be deployed on modern web hosting platforms such as Vercel, Netlify, or GitHub Pages.

### GitHub Pages Deployment

The project is configured for GitHub Pages deployment with the base path `/GreenTail-G2/`. The Vite configuration automatically adjusts the base path for production builds:

- **Development**: Base path is `/` (localhost:3000)
- **Production**: Base path is `/GreenTail-G2/` (for GitHub Pages)

To deploy:

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` directory

3. Deploy the `dist` directory to your hosting platform

### Environment Variables

The application uses `import.meta.env.BASE_URL` for asset paths, which is automatically configured by Vite based on the build mode.

### Continuous Deployment

The project includes GitHub Actions workflow for automatic deployment to GitHub Pages:

- **Workflow File**: `.github/workflows/deploy.yml`
- **Trigger**: Automatically deploys on push to `main` branch
- **Process**: 
  1. Builds the application
  2. Creates SPA fallback (404.html)
  3. Deploys to GitHub Pages
- **Manual Trigger**: Can also be triggered manually via GitHub Actions UI

The deployment is configured to use the base path `/GreenTail-G2/` for GitHub Pages compatibility.

## Development

### Code Quality

The project uses ESLint for code quality checks. Run the linter before committing:

```bash
npm run lint
```

### Project Configuration

- **Development Server**: Runs on port 3000 (configurable in `vite.config.js`)
- **Build Output**: `dist/` directory
- **Hot Module Replacement**: Enabled in development mode
- **Auto-open Browser**: Enabled in development mode

## Contributing

This is a class project for INFO 442: Cooperative Software Development Autumn 2025. For questions or issues, please contact the development team.

## License

This project is created for educational purposes as part of the INFO 442 course at the University of Washington.

## Contact

- **GitHub**: https://github.com/kaibo-wang/GreenTail-G2
- **Course**: INFO 442: Cooperative Software Development Autumn 2025
