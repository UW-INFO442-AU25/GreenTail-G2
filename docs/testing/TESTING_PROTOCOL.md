# Testing Protocol - GreenTail

## Overview

This document outlines the comprehensive testing protocol for GreenTail, including how to test each key feature, expected results, and workarounds for any known bugs.

## Testing Environment

### Browser Requirements
- **Primary**: Google Chrome (Desktop and Mobile)
- **Secondary**: Firefox, Safari, Edge
- **Mobile**: Chrome Mobile, Safari Mobile

### Device Testing
- Desktop: 1920x1080, 1366x768, 1024x768
- Tablet: iPad (768x1024), Android Tablet (800x1280)
- Mobile: iPhone (375x667), Android (360x640)

## Pre-Testing Setup

1. Clear browser cache and cookies
2. Disable browser extensions
3. Ensure stable internet connection
4. Test on both localhost and deployed version

## Feature Testing

### 1. Homepage Navigation

**Test Steps:**
1. Navigate to the homepage
2. Click on each navigation link (Home, Quiz, Search, Compare, About, Profile)
3. Verify page loads correctly
4. Test responsive design on different screen sizes
5. Test NavigationBar component:
   - Verify unified design across all pages
   - Test active link highlighting (current page link should be highlighted)
   - Test logout button visibility when logged in
   - Test login button visibility when logged out
   - Test mobile responsive wrapping (menu items should wrap on narrow screens)
   - Verify navigation bar is fixed at top on all pages

**Expected Results:**
- All navigation links work correctly
- Pages load without errors
- Responsive design adapts to screen size
- No broken links or 404 errors
- NavigationBar displays consistently across all pages
- Active link highlighting works correctly
- Logout/login button toggles based on authentication state
- Navigation bar wraps correctly on mobile without breaking layout

**Known Issues:**
- None identified

---

### 2. Quiz Functionality

**Test Steps:**
1. Click "Start Quiz" on homepage
2. Complete all quiz questions (Quiz 0-5)
3. Verify answers are saved correctly
4. Check that "Next" buttons work
5. Test "Back" navigation
6. Verify progress bar updates correctly (shows current step/total steps, e.g., "1/5", "2/5", etc.)
7. Complete quiz and reach results page

**Expected Results:**
- Quiz progresses through all steps
- Answers are saved and displayed correctly
- Navigation works in both directions
- Progress bar displays correctly and updates with each step
- Progress bar shows accurate step count (e.g., "3/5" on Quiz 3)
- Results page shows personalized recommendations
- No data loss during navigation

**Known Issues:**
- None identified

**Workarounds:**
- If quiz gets stuck, refresh page and restart

---

### 3. Product Search and Filtering

**Test Steps:**
1. Navigate to Search page
2. Test search functionality with various keywords
3. Apply different filter combinations:
   - Species (Dog, Cat)
   - Life Stage (Puppy, Adult, Senior)
   - Diet Style (Kibble, Wet, Air-dried, Freeze-dried)
   - Protein Type (Chicken, Salmon, Turkey)
   - Price Range
4. Test tag filters (Budget, Packaging, Certifications, etc.)
5. Test sorting options (Best match, Price low-high, A-Z)
6. Clear filters and verify reset
7. Test "Find Stores Near You" button
8. Test "Find Nearby" button on individual products
9. Verify map modal opens correctly

**Expected Results:**
- Search returns relevant results
- Filters work correctly and update results
- Tag filters function independently
- Sorting options work as expected
- Clear filters resets all selections
- Results update in real-time
- Map modal opens and displays store locations
- Store information is accurate

**Known Issues:**
- None identified

**Workarounds:**
- If filters don't update, refresh page
- If map doesn't load, check Leaflet dependencies

---

### 4. Product Saving (Heart Button)

**Test Steps:**
1. Navigate to Search page
2. Click heart button on various products
3. Verify heart changes to filled state
4. Navigate to Profile page
5. Verify saved products appear in profile
6. Test removing products from profile

**Expected Results:**
- Heart button toggles correctly
- Saved products appear in profile
- Products can be removed from saved list
- Visual feedback is immediate

**Known Issues:**
- None identified

**Workarounds:**
- If heart doesn't toggle, refresh page and try again

---

### 5. Product Comparison

**Test Steps:**
1. Navigate to Compare page
2. Select products from dropdown menus
3. Verify comparison table displays correctly
4. Test with 2 and 3 products
5. Check score calculations and insights
6. Test "Add to Compare" from Search page

**Expected Results:**
- Comparison table displays all selected products
- Scores and insights are calculated correctly
- Visual comparison elements work
- Can compare 2-3 products simultaneously

**Known Issues:**
- None identified

**Workarounds:**
- If comparison doesn't load, refresh page

---

### 6. User Authentication

**Test Steps:**
1. Navigate to Login page
2. Test registration with valid email/password
3. Test login with registered credentials
4. Test Google/Apple login buttons
5. Test logout functionality
6. Verify user data persists across sessions

**Expected Results:**
- Registration works with valid inputs
- Login works with correct credentials
- Social login buttons are functional
- Logout clears user session
- User data persists in localStorage

**Known Issues:**
- Social login is mock implementation

**Workarounds:**
- Use email/password registration for full functionality

---

### 7. Profile Page

**Test Steps:**
1. Login as different users (Sammi, Lele, Kaibo, Lanqi, Amber)
2. Verify each user sees their persona data
3. Test ZIP code update functionality
4. Test sorting options for saved products
5. Test user preference toggles
6. Verify saved products display correctly

**Expected Results:**
- Each user sees personalized information
- ZIP code updates work
- Sorting functions correctly
- Preferences save and persist
- Saved products display with correct information

**Known Issues:**
- None identified

**Workarounds:**
- If persona data doesn't load, refresh page

---

### 8. Responsive Design

**Test Steps:**
1. Test on desktop (1920x1080)
2. Test on tablet (768x1024)
3. Test on mobile (375x667)
4. Verify all interactive elements work
5. Check text readability
6. Test navigation on mobile
7. Test map modal on mobile (verify close button is easily accessible)
8. Test navigation bar on narrow screens (verify menu items wrap correctly)
9. Verify all touch targets meet minimum 44px size requirement

**Expected Results:**
- Layout adapts to screen size
- All elements remain functional
- Text is readable at all sizes
- Navigation works on mobile
- Navigation bar wraps correctly on narrow screens without breaking layout
- Map modal close button is easily accessible on mobile (minimum 48px touch target)
- No horizontal scrolling on mobile
- All interactive elements meet minimum touch target size (44px)

**Known Issues:**
- None identified

**Workarounds:**
- If layout breaks, refresh page

---

### 9. Accessibility

**Test Steps:**
1. Test with keyboard navigation (Tab, Enter, Arrow keys)
2. Check color contrast ratios
3. Verify alt text for images
4. Test with screen reader (if available)
5. Check focus indicators
6. Verify semantic HTML structure

**Expected Results:**
- All interactive elements accessible via keyboard
- Good color contrast for text
- Images have descriptive alt text
- Focus indicators are visible
- Proper heading hierarchy

**Known Issues:**
- None identified (ARIA labels and accessibility features have been implemented)

**Workarounds:**
- None needed

---

### 10. Performance

**Test Steps:**
1. Measure page load times
2. Test with slow network connection
3. Check image loading performance
4. Test scroll performance
5. Monitor memory usage

**Expected Results:**
- Pages load within 3 seconds
- Images load progressively
- Smooth scrolling performance
- No memory leaks

**Known Issues:**
- None identified

**Workarounds:**
- Refresh page if performance degrades

---

### 11. Store Locator & Maps

**Test Steps:**
1. Navigate to Search page and click "Find Stores Near You"
2. Navigate to Results page and click "Find Stores Near You"
3. Navigate to Shops Near You page (`/shops-near-you`)
4. Test ZIP code input and update functionality
5. Click "Open Interactive Map" button
6. Verify map displays with store markers
7. Click on store markers to see popup information
8. Test store filtering by product
9. Test "Get Directions" functionality (opens Google Maps)
10. Test "Call Store" functionality
11. Test store hours display
12. **Mobile Testing**: Test map modal close button on mobile devices (verify it's easily accessible and meets minimum 48px touch target)
13. **Mobile Testing**: Test clicking outside modal to close (if implemented)
14. **Mobile Testing**: Verify map modal is responsive and doesn't overflow on small screens

**Expected Results:**
- Map modal opens correctly on all pages
- Store markers display on map
- Store information popups show correct data
- ZIP code updates work correctly
- Directions link opens Google Maps in new tab
- Call functionality works on mobile devices
- Store hours display correctly
- Map modal close button is easily accessible on mobile (minimum 48px touch target)
- Map modal is fully responsive and doesn't overflow on small screens

**Known Issues:**
- Store data is simulated/mocked for demonstration. Store locations, hours, and inventory are simulated for demonstration purposes and may not reflect real-world availability.

**Workarounds:**
- This is expected behavior for the MVP
- If map doesn't load, check Leaflet CSS and JS imports
- If markers don't appear, verify icon paths

---

### 12. Cookie Consent

**Test Steps:**
1. Clear browser localStorage
2. Navigate to any page
3. Verify cookie consent banner appears
4. Click "Accept" button
5. Refresh page and verify banner doesn't reappear
6. Clear localStorage and wait 30+ days (or manually adjust timestamp)
7. Verify banner reappears after expiration
8. Test links to cookie policy page

**Expected Results:**
- Cookie consent banner appears on first visit
- Banner dismisses when accepted
- Consent persists across sessions
- Banner reappears after 30-day expiration
- Links to cookie policy work correctly

**Known Issues:**
- None identified

**Workarounds:**
- Clear localStorage to reset consent for testing

---

### 13. Toast Notifications

**Test Steps:**
1. Perform actions that trigger toasts (save product, update profile, etc.)
2. Verify toast appears with correct message
3. Test auto-dismiss functionality
4. Test multiple toasts stacking
5. Test different toast types (success, error, info)

**Expected Results:**
- Toasts appear at correct position
- Messages are clear and accurate
- Auto-dismiss works after timeout
- Multiple toasts stack correctly
- Different types have appropriate styling

**Known Issues:**
- None identified

**Workarounds:**
- None needed

---

### 14. Educational Features

**Test Steps:**
1. Navigate to Search or Results page
2. Verify contextual help banner appears
3. Test "Learn to decode pet food labels" link
4. Test "7-14 day transition plan" button
5. Test "What 'organic' covers" link
6. Test banner dismiss functionality
7. Navigate to `/pet-food-labels-guide` page
8. Navigate to `/organic-pet-food-guide` page
9. Navigate to `/first-time` page (First Time Pet Owner guide)
10. Test YouTube video integration on First Time Pet Owner page
11. Verify video loads and plays correctly
12. Test video controls (play, pause, fullscreen)
13. Test reading time calculator
14. Verify educational content displays correctly

**Expected Results:**
- Help banner appears on relevant pages
- All links navigate correctly
- Transition plan modal opens
- Educational pages load correctly
- YouTube video on First Time Pet Owner page loads and displays correctly
- Video controls function properly
- Reading time is calculated accurately
- Content is readable and well-formatted

**Known Issues:**
- None identified

**Workarounds:**
- If video doesn't load, check internet connection (YouTube embed requires internet access)

---

### 15. Route Transitions

**Test Steps:**
1. Navigate between different pages
2. Observe page transition animations
3. Test rapid navigation (clicking links quickly)
4. Verify no layout shifts during transitions
5. Test browser back/forward buttons

**Expected Results:**
- Smooth fade transitions between pages
- No flickering or layout shifts
- Transitions work with browser navigation
- Performance remains smooth

**Known Issues:**
- None identified

**Workarounds:**
- None needed

---

### 16. Legal Pages

**Test Steps:**
1. Navigate to `/cookie-policy`
2. Navigate to `/privacy-policy`
3. Navigate to `/terms-of-service`
4. Verify all pages load correctly
5. Test links within legal pages
6. Verify content is readable and complete

**Expected Results:**
- All legal pages load without errors
- Content is complete and formatted correctly
- Links work properly
- Pages are accessible

**Known Issues:**
- None identified

**Workarounds:**
- None needed

## Cross-Browser Testing

### Chrome (Primary)
- All features should work perfectly
- No known issues

### Firefox
- Minor styling differences possible
- All functionality should work

### Safari
- Video playback may require different formats
- All other features should work

### Edge
- Should work identically to Chrome
- No known issues

## Mobile Testing

### iOS Safari
- Touch interactions work correctly
- Responsive design adapts properly
- Video playback may have limitations
- Map modal close button is easily accessible (minimum 48px touch target)
- Navigation bar wraps correctly on narrow screens
- All interactive elements meet minimum 44px touch target size

### Android Chrome
- All features should work
- Touch interactions responsive
- Map modal close button is easily accessible (minimum 48px touch target)
- Navigation bar wraps correctly on narrow screens
- All interactive elements meet minimum 44px touch target size
- No known issues

## Error Handling

### React Error Boundary

**Test Steps:**
1. Simulate a component error (if possible in development mode)
2. Verify error boundary fallback UI displays
3. Test "Try Again" button (should reset error state)
4. Test "Go to Home" button (should navigate to homepage)
5. Verify error details are shown in development mode only
6. Verify error logging to console

**Expected Results:**
- Error boundary catches component errors gracefully
- Fallback UI displays with clear error message
- "Try Again" button resets error state and attempts to re-render
- "Go to Home" button navigates to homepage successfully
- Error details (stack trace) only visible in development mode
- Errors are logged to console for debugging

**Known Issues:**
- None identified

**Workarounds:**
- If error boundary doesn't catch an error, check if it's an event handler or async error (these require try-catch)

### Network Errors
- Graceful degradation when offline
- Clear error messages for failed requests
- Retry mechanisms for failed operations

### User Input Errors
- Form validation with clear error messages
- Prevention of invalid data submission
- Helpful error recovery suggestions

## Performance Benchmarks

### Load Times
- Homepage: < 2 seconds
- Search page: < 3 seconds
- Profile page: < 2 seconds

### Responsiveness
- All interactions: < 100ms response time
- Smooth animations: 60fps
- No layout shifts during loading

## Bug Reporting

When reporting bugs, include:
1. Browser and version
2. Device and screen size
3. Steps to reproduce
4. Expected vs. actual behavior
5. Screenshots if applicable
6. Console errors if any

## Test Completion Checklist

### Core Features
- [ ] All navigation links work
- [ ] Quiz functionality complete (Quiz 0-5)
- [ ] Search and filtering work
- [ ] Product saving works
- [ ] Comparison feature works
- [ ] Authentication works
- [ ] Profile page displays correctly

### Map & Store Locator
- [ ] Map modal opens on Search page
- [ ] Map modal opens on Results page
- [ ] Map modal opens on Shops Near You page
- [ ] Store markers display correctly
- [ ] Store information popups work
- [ ] ZIP code update functionality works
- [ ] Get Directions opens Google Maps
- [ ] Call Store works on mobile

### Additional Features
- [ ] Cookie consent banner works
- [ ] Toast notifications appear correctly
- [ ] Contextual help banner works
- [ ] Transition plan modal opens
- [ ] Educational guide pages load
- [ ] YouTube video integration works on First Time Pet Owner page
- [ ] Route transitions are smooth
- [ ] Legal pages (Cookie Policy, Privacy Policy, Terms) load

### Technical Requirements
- [ ] Responsive design works on all devices
- [ ] Accessibility features work
- [ ] Performance meets benchmarks
- [ ] Cross-browser compatibility verified
- [ ] Mobile functionality confirmed
- [ ] No console errors

## Known Limitations

1. **Social Login**: Mock implementation only
2. **Video Content**: Requires internet connection to load YouTube embed (videos are embedded via iframe, not stored locally)
3. **Store Data**: Store locations, hours, and inventory are simulated for demonstration purposes
4. **Offline Support**: Basic only
5. **Data Persistence**: localStorage only (not server-side)

## Success Criteria

The application passes testing if:
- All core features work as expected
- No critical bugs are found
- Performance meets benchmarks
- Responsive design works on all target devices
- Accessibility requirements are met
- Cross-browser compatibility is maintained
