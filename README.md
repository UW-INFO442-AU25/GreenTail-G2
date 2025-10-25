# GreenTail - Sustainable Pet Food Verification Platform

## Overview

GreenTail is a web application that helps pet parents find sustainable, organic pet food that fits their budget and values. Our smart matching algorithm considers user preferences, pet needs, and environmental impact to recommend the best products.

## Features

### Core Functionality
- **Smart Quiz**: 90-second quiz to understand your pet's needs and your sustainability priorities
- **Product Matching**: AI-powered algorithm that matches products based on quiz responses
- **Product Search**: Advanced filtering and search capabilities
- **Product Comparison**: Side-by-side comparison of up to 3 products
- **User Profiles**: Save favorite products and manage preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Key Pages
- **Homepage**: Introduction and feature overview
- **Quiz**: Interactive questionnaire for personalized recommendations
- **Search**: Browse and filter products with advanced options
- **Compare**: Compare products side-by-side with detailed insights
- **Profile**: Manage saved products and user preferences
- **About**: Team information and project details

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Custom SVG icons
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

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

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
GreenTail-G2/
├── public/
│   ├── images/          # Team photos and general images
│   ├── img/            # Product images
│   ├── icons/          # SVG icons
│   └── logos/          # Brand logos
├── src/
│   ├── components/     # React components
│   ├── data/          # Product database and matching algorithm
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── main.jsx       # Application entry point
├── index.html         # Main HTML file
└── package.json       # Dependencies and scripts
```

## Key Features Implementation

### Smart Matching Algorithm
- Considers user preferences from quiz responses
- Weights factors like sustainability, price, and pet needs
- Provides match scores and recommendations

### User Authentication
- Mock authentication system for demonstration
- User profiles with personalized preferences
- Saved products functionality

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Breakpoints for different screen sizes
- Touch-friendly interface elements

## Team Members

- **Sammi Huang** - UX & PM
- **Lele Zhang** - Data & Research  
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

See `TESTING_PROTOCOL.md` for detailed testing procedures and expected results.

## User Personas

See `USER_PERSONAS.md` for detailed information about our target users and their characteristics.

## Deployment

The application is designed to be deployed on modern web hosting platforms such as Vercel, Netlify, or similar services.

## Contributing

This is a class project for INFO 442: Cooperative Software Development Autumn 2025. For questions or issues, please contact the development team.

## License

This project is created for educational purposes as part of the INFO 442 course at the University of Washington.

## Contact

- **Email**: contact@greentail.com
- **GitHub**: https://github.com/kaibo-wang/GreenTail-G2
- **Course**: INFO 442: Cooperative Software Development Autumn 2025