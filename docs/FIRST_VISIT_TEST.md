# First Visit Test Documentation

## Test Objectives

Verify the complete user experience flow when a user first opens the website.

## Expected Behavior

### 1. User State
- ✅ **Not Logged In**: `localStorage.getItem('user')` should be `null`
- ✅ **No Saved Products**: `localStorage.getItem('savedProducts')` should be `null` or `'[]'`

### 2. Homepage (HomePage)
- ✅ **Play Video**: `localStorage.getItem('hasSeenIntroVideo')` should be `null`
- ✅ **Video Auto-plays**: Fullscreen video should automatically display
- ✅ **Show Content After Video**: After video ends, homepage content is displayed

### 3. Search Page
- ✅ **Show Filter Tooltip**: After 2.5 seconds, display "Use filters to find products matching your pet's needs"
- ✅ **Show Store Locator Tooltip**: After 2.5 seconds, display "Find nearby stores that carry these products"
- ✅ **No Saved Products**: Heart buttons should all be empty (unsaved state)

### 4. Compare Page
- ✅ **Show Product Selection Tooltip**: After 2.5 seconds, display "Select products to compare side-by-side"
- ✅ **Show Analyst Verdict Tooltip**: After 2.5 seconds, display "Read quick summary instead of tables"

## Test Steps

### Step 1: Clear All localStorage (Simulate First Visit)

Execute in browser console:

```javascript
// Clear all related localStorage
localStorage.removeItem('hasSeenIntroVideo');
localStorage.removeItem('user');
localStorage.removeItem('savedProducts');
localStorage.removeItem('tooltip_dismissed_search_filter-sidebar');
localStorage.removeItem('tooltip_dismissed_search_find-stores');
localStorage.removeItem('tooltip_dismissed_compare_product-select');
localStorage.removeItem('tooltip_dismissed_compare_analyst-verdict');
localStorage.removeItem('cookieConsent');

console.log('✅ Cleared all localStorage - simulating first visit');
console.log('Current localStorage state:', {
  hasSeenIntroVideo: localStorage.getItem('hasSeenIntroVideo'),
  user: localStorage.getItem('user'),
  savedProducts: localStorage.getItem('savedProducts'),
  tooltips: {
    search_filter: localStorage.getItem('tooltip_dismissed_search_filter-sidebar'),
    search_stores: localStorage.getItem('tooltip_dismissed_search_find-stores'),
    compare_select: localStorage.getItem('tooltip_dismissed_compare_product-select'),
    compare_verdict: localStorage.getItem('tooltip_dismissed_compare_analyst-verdict')
  }
});

// Refresh page
location.reload();
```

### Step 2: Verify Homepage Video

1. Visit `http://localhost:3000/`
2. **Expected Results**:
   - ✅ Fullscreen video should display immediately
   - ✅ Video should auto-play (muted mode)
   - ✅ Console should show: `[HomePage] First visit check: { isFirstVisit: true, ... }`
   - ✅ After video ends, homepage content is displayed

### Step 3: Verify Search Page Tooltips

1. Visit `http://localhost:3000/search`
2. **Expected Results**:
   - ✅ After page loads, console shows tooltip check logs
   - ✅ After 2.5 seconds, tooltip appears next to filter sidebar: "Use filters to find products matching your pet's needs"
   - ✅ After 2.5 seconds, tooltip appears next to "Find Stores Near You" button: "Find nearby stores that carry these products"
   - ✅ All product heart buttons are empty (unsaved state)

### Step 4: Verify Compare Page Tooltips

1. Visit `http://localhost:3000/compare`
2. **Expected Results**:
   - ✅ After page loads, console shows tooltip check logs
   - ✅ After 2.5 seconds, tooltip appears above product selection area: "Select products to compare side-by-side"
   - ✅ After 2.5 seconds, tooltip appears below Analyst's Verdict section: "Read quick summary instead of tables"

## Verification Checklist

### localStorage State Check

Run the following code in browser console to check state:

```javascript
function checkFirstVisitState() {
  const state = {
    // User state
    user: localStorage.getItem('user'),
    isLoggedIn: localStorage.getItem('user') !== null,
    
    // Video state
    hasSeenVideo: localStorage.getItem('hasSeenIntroVideo'),
    shouldShowVideo: localStorage.getItem('hasSeenIntroVideo') !== 'true',
    
    // Saved products state
    savedProducts: localStorage.getItem('savedProducts'),
    savedCount: (() => {
      try {
        const saved = localStorage.getItem('savedProducts');
        return saved ? JSON.parse(saved).length : 0;
      } catch {
        return 0;
      }
    })(),
    
    // Tooltip state
    tooltips: {
      search_filter: localStorage.getItem('tooltip_dismissed_search_filter-sidebar'),
      search_stores: localStorage.getItem('tooltip_dismissed_search_find-stores'),
      compare_select: localStorage.getItem('tooltip_dismissed_compare_product-select'),
      compare_verdict: localStorage.getItem('tooltip_dismissed_compare_analyst-verdict')
    },
    
    // Cookie consent
    cookieConsent: localStorage.getItem('cookieConsent')
  };
  
  console.log('📊 First Visit State Check:', state);
  
  // Verify first visit conditions
  const isFirstVisit = 
    !state.user && 
    !state.hasSeenVideo && 
    state.savedCount === 0 &&
    !state.tooltips.search_filter &&
    !state.tooltips.search_stores &&
    !state.tooltips.compare_select &&
    !state.tooltips.compare_verdict;
  
  console.log('✅ Is First Visit:', isFirstVisit);
  
  return { ...state, isFirstVisit };
}

// Run check
checkFirstVisitState();
```

## Expected Console Output

### Homepage Load
```
[HomePage] First visit check: {
  hasSeenVideo: false,
  isFullscreenVideo: true,
  showContent: false,
  localStorageValue: null,
  shouldShowVideo: true,
  savedProductsCount: 0,
  isFirstVisit: true
}
```

### Search Page Load
```
[FeatureTooltip search_filter-sidebar] {
  hasDismissed: null,
  storageKey: "tooltip_dismissed_search_filter-sidebar",
  willShow: true
}
[FeatureTooltip search_find-stores] {
  hasDismissed: null,
  storageKey: "tooltip_dismissed_search_find-stores",
  willShow: true
}
[FeatureTooltip search_filter-sidebar] Showing tooltip after 2.5s delay
[FeatureTooltip search_find-stores] Showing tooltip after 2.5s delay
```

### Compare Page Load
```
[FeatureTooltip compare_product-select] {
  hasDismissed: null,
  storageKey: "tooltip_dismissed_compare_product-select",
  willShow: true
}
[FeatureTooltip compare_analyst-verdict] {
  hasDismissed: null,
  storageKey: "tooltip_dismissed_compare_analyst-verdict",
  willShow: true
}
[FeatureTooltip compare_product-select] Showing tooltip after 2.5s delay
[FeatureTooltip compare_analyst-verdict] Showing tooltip after 2.5s delay
```

## Troubleshooting

If tooltips don't appear, check:

1. **Is localStorage cleared?**:
   ```javascript
   console.log('hasSeenIntroVideo:', localStorage.getItem('hasSeenIntroVideo'));
   console.log('tooltip_dismissed_search_filter-sidebar:', localStorage.getItem('tooltip_dismissed_search_filter-sidebar'));
   ```

2. **Are refs correctly set?**:
   - Check console for errors
   - Verify target elements are rendered

3. **Delay time**:
   - Tooltips appear after 2.5 seconds, wait for sufficient time

4. **Element visibility**:
   - Verify target elements are visible on page
   - Check if CSS is hiding elements

## Test Completion Criteria

✅ All expected behaviors execute correctly
✅ No console errors
✅ Video plays normally
✅ All tooltips appear in correct positions
✅ User state is not logged in
✅ No saved products
