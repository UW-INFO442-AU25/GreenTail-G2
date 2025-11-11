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

**Expected Results:**
- All navigation links work correctly
- Pages load without errors
- Responsive design adapts to screen size
- No broken links or 404 errors

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
6. Complete quiz and reach results page

**Expected Results:**
- Quiz progresses through all steps
- Answers are saved and displayed correctly
- Navigation works in both directions
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

**Expected Results:**
- Search returns relevant results
- Filters work correctly and update results
- Tag filters function independently
- Sorting options work as expected
- Clear filters resets all selections
- Results update in real-time

**Known Issues:**
- None identified

**Workarounds:**
- If filters don't update, refresh page

---

### 4. Product Saving (Heart Button)

**Test Steps:**
1. Navigate to Search page
2. Click heart button (♡) on various products
3. Verify heart changes to filled (❤️)
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

**Expected Results:**
- Layout adapts to screen size
- All elements remain functional
- Text is readable at all sizes
- Navigation works on mobile
- No horizontal scrolling on mobile

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
- Limited ARIA labels implemented

**Workarounds:**
- Use mouse/touch for full functionality

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

### Android Chrome
- All features should work
- Touch interactions responsive
- No known issues

## Error Handling

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

- [ ] All navigation links work
- [ ] Quiz functionality complete
- [ ] Search and filtering work
- [ ] Product saving works
- [ ] Comparison feature works
- [ ] Authentication works
- [ ] Profile page displays correctly
- [ ] Responsive design works
- [ ] Accessibility features work
- [ ] Performance meets benchmarks
- [ ] Cross-browser compatibility verified
- [ ] Mobile functionality confirmed

## Known Limitations

1. **Social Login**: Mock implementation only
2. **Video Content**: Requires actual video files
3. **ARIA Labels**: Limited implementation
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
