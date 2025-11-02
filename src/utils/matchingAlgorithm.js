import { petFoodDatabase, matchingConfig } from '../data/petFoodDatabase.js';

/**
 * Smart matching algorithm - matches pet food based on user quiz results
 * @param {Object} quizData - User's quiz answers
 * @returns {Array} Sorted array of products by match score
 */
export function findBestMatches(quizData) {
  if (!quizData) {
    return [];
  }

  const productsWithScores = petFoodDatabase.map(product => {
    const matchScore = calculateMatchScore(product, quizData);
    const matchLevel = determineMatchLevel(matchScore, product, quizData);
    
    return {
      ...product,
      matchScore,
      matchLevel
    };
  });

  return productsWithScores
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8);
}

/**
 * Calculate match score for a single product
 * @param {Object} product - Product information
 * @param {Object} quizData - User answers
 * @returns {number} Match score (0-100)
 */
function calculateMatchScore(product, quizData) {
  let totalScore = 0;
  const weights = matchingConfig.weights;

  if (product.petType.includes(quizData.pet)) {
    totalScore += weights.petType;
  }

  if (product.lifeStage.includes(quizData.lifeStage)) {
    totalScore += weights.lifeStage;
  }

  if (product.weightRange.includes(quizData.weight)) {
    totalScore += weights.weightRange;
  }

  const avoidIngredientsScore = calculateAvoidIngredientsScore(product, quizData);
  totalScore += avoidIngredientsScore * weights.avoidIngredients / 100;

  const budgetScore = calculateBudgetScore(product, quizData);
  totalScore += budgetScore * weights.budget / 100;

  const ecoScore = calculateEcoFeaturesScore(product, quizData);
  totalScore += ecoScore * weights.ecoFeatures / 100;
  if (product.feedingStyle.includes(quizData.feedingStyle)) {
    totalScore += weights.feedingStyle;
  }

  return Math.round(totalScore);
}

/**
 * Calculate avoid ingredients match score
 * @param {Object} product - Product information
 * @param {Object} quizData - User answers
 * @returns {number} Score (0-100)
 */
function calculateAvoidIngredientsScore(product, quizData) {
  const userAvoids = quizData.avoidIngredients || [];
  
  if (userAvoids.length === 0 || userAvoids.includes('None')) {
    return 100;
  }

  let penalty = 0;
  userAvoids.forEach(ingredient => {
    if (ingredient !== 'Not sure' && ingredient !== 'None') {
      // Heavy penalty if ingredient is a main protein (most important factor)
      if (product.mainProteins.includes(ingredient)) {
        penalty += 50;
      }
      
      // Special case: alternative proteins are acceptable replacements for traditional meats
      if ((ingredient === 'Chicken' || ingredient === 'Beef' || ingredient === 'Fish') && 
          (product.mainProteins.includes('Insect') || product.mainProteins.includes('Lab-grown'))) {
        penalty -= 20;
      }
      
      // Moderate penalty if ingredient is in the avoid list
      if (product.avoidIngredients.includes(ingredient)) {
        penalty += 30;
      }
      
      // Heavy penalty if user avoids grain but product is not grain-free
      if (ingredient === 'Grain' && !product.isGrainFree) {
        penalty += 40;
      }
    }
  });

  return Math.max(0, 100 - penalty);
}

/**
 * Calculate budget match score
 * @param {Object} product - Product information
 * @param {Object} quizData - User answers
 * @returns {number} Score (0-100)
 */
function calculateBudgetScore(product, quizData) {
  const userBudget = quizData.budget;
  const productBudgetRanges = product.budgetRange;

  // If user has flexible budget, accept all products
  if (!userBudget || userBudget === 'Flexible') {
    return 100;
  }

  // Perfect match if product is within user's budget range
  if (productBudgetRanges.includes(userBudget)) {
    return 100;
  }

  // Calculate proximity score: products close to budget get partial points
  const budgetOrder = ['<$25', '$25–$40', '$40–$60', '$60+'];
  const userIndex = budgetOrder.indexOf(userBudget);
  const productMinIndex = Math.min(...productBudgetRanges.map(range => budgetOrder.indexOf(range)));
  const productMaxIndex = Math.max(...productBudgetRanges.map(range => budgetOrder.indexOf(range)));

  // If product price is within one range of user's budget, give partial score
  if (Math.abs(userIndex - productMinIndex) <= 1 || Math.abs(userIndex - productMaxIndex) <= 1) {
    return 70;
  }

  // Product is too far from budget, low score
  return 30;
}

/**
 * Calculate eco features match score
 * @param {Object} product - Product information
 * @param {Object} quizData - User answers
 * @returns {number} Score (0-100)
 */
function calculateEcoFeaturesScore(product, quizData) {
  const userPriorities = quizData.priorities || [];
  const ecoFeatures = product.ecoFeatures;
  
  if (userPriorities.length === 0) {
    return 50;
  }

  let score = 0;
  let totalPossible = 0;

  userPriorities.forEach(priority => {
    totalPossible += 25;
    
    switch (priority) {
      case 'Lower-footprint protein':
        if (ecoFeatures.lowFootprintProtein) score += 25;
        break;
      case 'Recyclable/compostable packaging':
        if (ecoFeatures.recyclablePackaging) score += 25;
        break;
      case 'Credible certifications':
        if (ecoFeatures.certified) score += 25;
        break;
      case 'Made closer to me':
        if (ecoFeatures.localProduction) score += 25;
        break;
    }
  });

  return totalPossible > 0 ? (score / totalPossible) * 100 : 50;
}

/**
 * Determine match level
 * @param {number} matchScore - Match score
 * @param {Object} product - Product information
 * @param {Object} quizData - User answers
 * @returns {string} Match level
 */
function determineMatchLevel(matchScore, product, quizData) {
  const thresholds = matchingConfig.thresholds;

  if (product.matchLevel === 'budget' && isBudgetFriendly(product, quizData)) {
    return 'budget';
  }

  if (matchScore >= thresholds.eco && hasStrongEcoFeatures(product, quizData)) {
    return 'eco-friendly';
  }

  if (matchScore >= thresholds.best) {
    return 'best';
  } else if (matchScore >= thresholds.great) {
    return 'great';
  } else if (matchScore >= thresholds.good) {
    return 'good';
  } else {
    return 'good';
  }
}

/**
 * Check if product is budget-friendly
 * @param {Object} product - Product information
 * @param {Object} quizData - User answers
 * @returns {boolean}
 */
function isBudgetFriendly(product, quizData) {
  const userBudget = quizData.budget;
  
  if (userBudget === '<$25' && product.budgetRange.includes('<$25')) {
    return true;
  }
  
  if (product.budgetRange.includes(userBudget) && product.price <= 25) {
    return true;
  }
  
  return false;
}

/**
 * Check if product has strong eco features
 * @param {Object} product - Product information
 * @param {Object} quizData - User answers
 * @returns {boolean}
 */
function hasStrongEcoFeatures(product, quizData) {
  const userPriorities = quizData.priorities || [];
  const ecoFeatures = product.ecoFeatures;
  
  let ecoMatches = 0;
  userPriorities.forEach(priority => {
    switch (priority) {
      case 'Lower-footprint protein':
        if (ecoFeatures.lowFootprintProtein) ecoMatches++;
        break;
      case 'Recyclable/compostable packaging':
        if (ecoFeatures.recyclablePackaging) ecoMatches++;
        break;
      case 'Credible certifications':
        if (ecoFeatures.certified) ecoMatches++;
        break;
      case 'Made closer to me':
        if (ecoFeatures.localProduction) ecoMatches++;
        break;
    }
  });

  return ecoMatches >= Math.ceil(userPriorities.length / 2);
}

/**
 * Get match level style (colors and labels)
 * @param {string} matchLevel - Match level
 * @returns {Object} Object containing colors and labels
 */
export function getMatchLevelStyle(matchLevel) {
  const styles = {
    'best': {
      bgColor: 'bg-green-800',
      textColor: 'text-white',
      label: 'Best match'
    },
    'great': {
      bgColor: 'bg-blue-600',
      textColor: 'text-white', 
      label: 'Great choice'
    },
    'good': {
      bgColor: 'bg-yellow-600',
      textColor: 'text-white',
      label: 'Good option'
    },
    'eco-friendly': {
      bgColor: 'bg-purple-600',
      textColor: 'text-white',
      label: 'Eco-friendly'
    },
    'budget': {
      bgColor: 'bg-orange-600',
      textColor: 'text-white',
      label: 'Budget'
    }
  };

  return styles[matchLevel] || styles['good'];
}

/**
 * Generate personalized description based on user answers
 * @param {Object} quizData - User answers
 * @returns {string} Personalized description
 */
export function generatePersonalizedDescription(quizData) {
  const parts = [];
  
  if (quizData.pet) parts.push(quizData.pet);
  if (quizData.lifeStage) parts.push(quizData.lifeStage);
  
  if (quizData.avoidIngredients && quizData.avoidIngredients.length > 0 && !quizData.avoidIngredients.includes('None')) {
    const allergies = quizData.avoidIngredients.filter(ingredient => ingredient !== 'Not sure').join(', ');
    if (allergies) parts.push(`Avoid: ${allergies.toLowerCase()}`);
  }
  
  if (quizData.zipCode) {
    parts.push(`ZIP ${quizData.zipCode}`);
  }
  
  parts.push('(from your answers)');
  return parts.join(' • ');
}
