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
- **Compare Page**: `http://localhost:3000/compare`

#### **User Flow Pages**
- **Quiz Page**: `http://localhost:3000/quiz`
- **Quiz Steps**: `http://localhost:3000/quiz/0` to `/quiz/5` (with YouTube video integration)
- **First Time Page**: `http://localhost:3000/first-time`
- **About Page**: `http://localhost:3000/about`
- **Profile**: `http://localhost:3000/profile`
- **Login Page**: `http://localhost:3000/login`

#### **Educational Pages**
- **Pet Food Labels Guide**: `http://localhost:3000/pet-food-labels-guide`
- **Organic Pet Food Guide**: `http://localhost:3000/organic-pet-food-guide`

#### **Legal Pages**
- **Cookie Policy**: `http://localhost:3000/cookie-policy`
- **Privacy Policy**: `http://localhost:3000/privacy-policy`
- **Terms of Service**: `http://localhost:3000/terms-of-service`

#### **Development Pages**
- **Test Page**: `http://localhost:3000/test` (navigation hub for testing)

### **Map Functionality Test Points**

#### **SearchPage Testing**
1. Visit `http://localhost:3000/search`
2. Click the "Find Stores Near You" button
3. Click the "Find Nearby" button on any product
4. Verify that the map modal displays correctly
5. Test ZIP code input and update
6. Test store marker clicks and popups
7. Test "Get Directions" functionality
8. Test "Call Store" functionality

#### **ResultsPage Testing**
1. Visit the results page after completing the quiz
2. Click the "Find Stores Near You" button
3. Click the "Find Nearby" button on any product
4. Verify that the map modal displays correctly
5. Test store filtering by selected products
6. Verify highlighted stores (carries best match)

#### **ShopsNearYouPage Testing**
1. Visit `http://localhost:3000/shops-near-you`
2. Click the "Open Interactive Map" button
3. Test map interaction functionality
4. Verify store information display
5. Test ZIP code update functionality
6. Test store list and map synchronization
7. Verify store dataset table displays correctly

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
- Test store locator for finding sustainable products
- Test advanced search filters

#### **Sarah Williams (New User)**
- Test educational content
- Test new user-friendly interface
- Test guidance functionality
- Test YouTube video integration in quiz
- Test contextual help banners
- Test transition plan modal
- Test educational guide pages

### **Deployment Preparation**
- Build successful
- All dependencies installed
- Route configuration complete
- Components error-free

## **Additional Feature Testing**

### **Cookie Consent**
- [ ] Cookie banner appears on first visit
- [ ] Accept button works correctly
- [ ] Banner doesn't reappear after acceptance
- [ ] Links to cookie policy work
- [ ] Consent persists across sessions

### **Toast Notifications**
- [ ] Toasts appear for save product actions
- [ ] Toasts appear for profile updates
- [ ] Auto-dismiss works correctly
- [ ] Multiple toasts stack properly
- [ ] Different toast types display correctly

### **Educational Features**
- [ ] Contextual help banner appears on Search/Results pages
- [ ] Help banner links work correctly
- [ ] Transition plan modal opens and displays correctly
- [ ] Pet food labels guide page loads
- [ ] Organic pet food guide page loads
- [ ] Reading time calculator works

### **Route Transitions**
- [ ] Smooth transitions between pages
- [ ] No layout shifts during transitions
- [ ] Browser back/forward buttons work with transitions

### **YouTube Video Integration**
- [ ] Videos load in quiz pages
- [ ] Video controls work correctly
- [ ] Videos don't autoplay
- [ ] Video loading states display correctly

## **Test Execution Recommendations**

1. **Test each page in order**
2. **Test all map functionality**
3. **Test user flow** (Home → Quiz → Results → Search)
4. **Test responsive design**
5. **Test different browsers**
6. **Test cookie consent flow**
7. **Test toast notifications**
8. **Test educational features**
9. **Test route transitions**
10. **Test YouTube video integration**

## **Complete Testing Checklist**

### **Core Functionality**
- [ ] Homepage navigation works
- [ ] Quiz flow completes successfully (Quiz 0-5)
- [ ] Results page displays personalized recommendations
- [ ] Search page filters and sorting work
- [ ] Product comparison (2-3 products) works
- [ ] Product saving (heart button) works
- [ ] Profile page displays saved products
- [ ] Login/authentication works

### **Map & Store Locator**
- [ ] Map modal opens on Search page
- [ ] Map modal opens on Results page
- [ ] Map modal opens on Shops Near You page
- [ ] Store markers display correctly
- [ ] Store popups show correct information
- [ ] ZIP code update works
- [ ] Get Directions opens Google Maps
- [ ] Call Store works on mobile

### **Educational Features**
- [ ] YouTube videos load in quiz pages
- [ ] Contextual help banner appears
- [ ] Help banner links work
- [ ] Transition plan modal opens
- [ ] Educational guide pages load
- [ ] Reading time calculator works

### **UI/UX Features**
- [ ] Cookie consent banner works
- [ ] Toast notifications appear correctly
- [ ] Route transitions are smooth
- [ ] Responsive design works on all devices
- [ ] All links navigate correctly

### **Legal & Policy Pages**
- [ ] Cookie policy page loads
- [ ] Privacy policy page loads
- [ ] Terms of service page loads
- [ ] All legal content is readable

## **Issue Reporting**
If you discover any issues, please provide:
- Browser type and version
- Device and screen size
- Console error messages
- Reproduction steps
- Expected result vs actual result
- Screenshots if applicable
