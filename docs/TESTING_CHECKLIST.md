# GreenTail Testing Checklist

## **Testing Preparation Status Check**

### **Completed Features**
1. **React Application Fully Converted** - All HTML files have been converted to React components
2. **Map Functionality Integrated** - All pages have unified map modals
3. **Route Configuration** - All page routes have been configured
4. **Build Successful** - Project can build normally

### **Test Page List**

#### **Core Feature Pages**
- **Home Page**: `http://localhost:3000/`
- **Search Page**: `http://localhost:3000/search` (with map functionality)
- **Results Page**: `http://localhost:3000/results` (with map functionality)
- **Shops Page**: `http://localhost:3000/shops-near-you` (with map functionality)

#### **User Flow Pages**
- **Quiz Page**: `http://localhost:3000/quiz`
- **Quiz Steps**: `http://localhost:3000/quiz/0` to `/quiz/5`
- **First Time Page**: `http://localhost:3000/first-time`
- **Compare Page**: `http://localhost:3000/compare`
- **About Page**: `http://localhost:3000/about`
- **Profile**: `http://localhost:3000/profile`
- **Login Page**: `http://localhost:3000/login`

### **Map Functionality Test Points**

#### **SearchPage Testing**
1. Visit `http://localhost:3000/search`
2. Click the "Find Stores Near You" button
3. Click the "Find Nearby" button on any product
4. Verify that the map modal displays correctly

#### **ResultsPage Testing**
1. Visit the results page after completing the quiz
2. Click the "Find Stores Near You" button
3. Click the "Find Nearby" button on any product
4. Verify that the map modal displays correctly

#### **ShopsNearYouPage Testing**
1. Visit `http://localhost:3000/shops-near-you`
2. Click the "Open Interactive Map" button
3. Test map interaction functionality
4. Verify store information display

### **Potential Issues and Solutions**

#### **If Pages Won't Load**
1. **Check Browser Console** - Press F12 to view error messages
2. **Clear Browser Cache** - Ctrl+Shift+R to force refresh
3. **Try Different Browsers** - Chrome, Firefox, Safari
4. **Check Network Connection** - Ensure localhost:3000 is accessible

#### **If Map Functionality Doesn't Work**
1. **Check Leaflet Dependency** - Ensure it's properly installed
2. **Check Icon Paths** - Map marker icons may have issues
3. **Check Console Errors** - View JavaScript errors

### **Responsive Testing**
- **Desktop**: 1920x1080, 1366x768
- **Tablet**: iPad (768x1024)
- **Mobile**: iPhone (375x667), Android (360x640)

### **User Role Testing**

#### **Emma Chen (Eco-Conscious User)**
- Test eco-friendly product filtering
- Test environmental impact information display
- Test product comparison functionality

#### **Sarah Williams (New User)**
- Test educational content
- Test new user-friendly interface
- Test guidance functionality

### **Deployment Preparation**
- Build successful
- All dependencies installed
- Route configuration complete
- Components error-free

## **Test Execution Recommendations**

1. **Test each page in order**
2. **Test all map functionality**
3. **Test user flow** (Home → Quiz → Results → Search)
4. **Test responsive design**
5. **Test different browsers**

## **Issue Reporting**
If you discover any issues, please provide:
- Browser type and version
- Console error messages
- Reproduction steps
- Expected result vs actual result
