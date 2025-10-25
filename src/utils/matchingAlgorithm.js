import { petFoodDatabase, matchingConfig } from '../data/petFoodDatabase.js';

/**
 * 智能匹配算法 - 根据用户 quiz 结果匹配最适合的宠物食品
 * @param {Object} quizData - 用户的 quiz 答案
 * @returns {Array} 按匹配度排序的产品列表
 */
export function findBestMatches(quizData) {
  if (!quizData) {
    return [];
  }

  // 为每个产品计算匹配分数
  const productsWithScores = petFoodDatabase.map(product => {
    const matchScore = calculateMatchScore(product, quizData);
    const matchLevel = determineMatchLevel(matchScore, product, quizData);
    
    return {
      ...product,
      matchScore,
      matchLevel
    };
  });

  // 按匹配分数排序
  return productsWithScores
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8); // 返回前8个最佳匹配
}

/**
 * 计算单个产品的匹配分数
 * @param {Object} product - 产品信息
 * @param {Object} quizData - 用户答案
 * @returns {number} 匹配分数 (0-100)
 */
function calculateMatchScore(product, quizData) {
  let totalScore = 0;
  const weights = matchingConfig.weights;

  // 1. 宠物类型匹配 (20分)
  if (product.petType.includes(quizData.pet)) {
    totalScore += weights.petType;
  }

  // 2. 生命阶段匹配 (15分)
  if (product.lifeStage.includes(quizData.lifeStage)) {
    totalScore += weights.lifeStage;
  }

  // 3. 体重范围匹配 (10分)
  if (product.weightRange.includes(quizData.weight)) {
    totalScore += weights.weightRange;
  }

  // 4. 避免原料匹配 (25分) - 最重要的因素
  const avoidIngredientsScore = calculateAvoidIngredientsScore(product, quizData);
  totalScore += avoidIngredientsScore * weights.avoidIngredients / 100;

  // 5. 预算匹配 (15分)
  const budgetScore = calculateBudgetScore(product, quizData);
  totalScore += budgetScore * weights.budget / 100;

  // 6. 环保特性匹配 (10分)
  const ecoScore = calculateEcoFeaturesScore(product, quizData);
  totalScore += ecoScore * weights.ecoFeatures / 100;

  // 7. 喂养方式匹配 (5分)
  if (product.feedingStyle.includes(quizData.feedingStyle)) {
    totalScore += weights.feedingStyle;
  }

  return Math.round(totalScore);
}

/**
 * 计算避免原料匹配分数
 * @param {Object} product - 产品信息
 * @param {Object} quizData - 用户答案
 * @returns {number} 分数 (0-100)
 */
function calculateAvoidIngredientsScore(product, quizData) {
  const userAvoids = quizData.avoidIngredients || [];
  
  // 如果用户没有选择要避免的原料，给满分
  if (userAvoids.length === 0 || userAvoids.includes('None')) {
    return 100;
  }

  // 检查产品是否包含用户要避免的原料
  let penalty = 0;
  userAvoids.forEach(ingredient => {
    if (ingredient !== 'Not sure' && ingredient !== 'None') {
      // 检查主要蛋白质
      if (product.mainProteins.includes(ingredient)) {
        penalty += 50; // 主要原料匹配，严重扣分
      }
      
      // 特殊处理：如果用户避免传统肉类，但产品是替代蛋白，给加分
      if ((ingredient === 'Chicken' || ingredient === 'Beef' || ingredient === 'Fish') && 
          (product.mainProteins.includes('Insect') || product.mainProteins.includes('Lab-grown'))) {
        penalty -= 20; // 替代蛋白是传统肉类的替代品，减少扣分
      }
      
      // 检查避免原料列表
      if (product.avoidIngredients.includes(ingredient)) {
        penalty += 30; // 在避免列表中，扣分
      }
      
      // 特殊处理：如果用户避免谷物，但产品不是无谷物
      if (ingredient === 'Grain' && !product.isGrainFree) {
        penalty += 40;
      }
    }
  });

  return Math.max(0, 100 - penalty);
}

/**
 * 计算预算匹配分数
 * @param {Object} product - 产品信息
 * @param {Object} quizData - 用户答案
 * @returns {number} 分数 (0-100)
 */
function calculateBudgetScore(product, quizData) {
  const userBudget = quizData.budget;
  const productBudgetRanges = product.budgetRange;

  if (!userBudget || userBudget === 'Flexible') {
    return 100; // 预算灵活，给满分
  }

  // 如果产品价格在用户预算范围内，给满分
  if (productBudgetRanges.includes(userBudget)) {
    return 100;
  }

  // 根据预算差距给分
  const budgetOrder = ['<$25', '$25–$40', '$40–$60', '$60+'];
  const userIndex = budgetOrder.indexOf(userBudget);
  const productMinIndex = Math.min(...productBudgetRanges.map(range => budgetOrder.indexOf(range)));
  const productMaxIndex = Math.max(...productBudgetRanges.map(range => budgetOrder.indexOf(range)));

  // 如果产品价格接近用户预算，给部分分数
  if (Math.abs(userIndex - productMinIndex) <= 1 || Math.abs(userIndex - productMaxIndex) <= 1) {
    return 70;
  }

  return 30; // 预算差距较大，给较低分数
}

/**
 * 计算环保特性匹配分数
 * @param {Object} product - 产品信息
 * @param {Object} quizData - 用户答案
 * @returns {number} 分数 (0-100)
 */
function calculateEcoFeaturesScore(product, quizData) {
  const userPriorities = quizData.priorities || [];
  const ecoFeatures = product.ecoFeatures;
  
  if (userPriorities.length === 0) {
    return 50; // 没有环保偏好，给中等分数
  }

  let score = 0;
  let totalPossible = 0;

  userPriorities.forEach(priority => {
    totalPossible += 25; // 每个优先级25分
    
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
 * 确定匹配等级
 * @param {number} matchScore - 匹配分数
 * @param {Object} product - 产品信息
 * @param {Object} quizData - 用户答案
 * @returns {string} 匹配等级
 */
function determineMatchLevel(matchScore, product, quizData) {
  const thresholds = matchingConfig.thresholds;

  // 特殊处理：预算产品
  if (product.matchLevel === 'budget' && isBudgetFriendly(product, quizData)) {
    return 'budget';
  }

  // 特殊处理：环保产品
  if (matchScore >= thresholds.eco && hasStrongEcoFeatures(product, quizData)) {
    return 'eco-friendly';
  }

  // 根据分数确定等级
  if (matchScore >= thresholds.best) {
    return 'best';
  } else if (matchScore >= thresholds.great) {
    return 'great';
  } else if (matchScore >= thresholds.good) {
    return 'good';
  } else {
    return 'good'; // 最低也是好选择
  }
}

/**
 * 检查是否为预算友好产品
 * @param {Object} product - 产品信息
 * @param {Object} quizData - 用户答案
 * @returns {boolean}
 */
function isBudgetFriendly(product, quizData) {
  const userBudget = quizData.budget;
  
  // 如果用户预算较低，优先推荐预算产品
  if (userBudget === '<$25' && product.budgetRange.includes('<$25')) {
    return true;
  }
  
  // 如果产品价格在用户预算范围内且价格较低
  if (product.budgetRange.includes(userBudget) && product.price <= 25) {
    return true;
  }
  
  return false;
}

/**
 * 检查是否有强烈的环保特性
 * @param {Object} product - 产品信息
 * @param {Object} quizData - 用户答案
 * @returns {boolean}
 */
function hasStrongEcoFeatures(product, quizData) {
  const userPriorities = quizData.priorities || [];
  const ecoFeatures = product.ecoFeatures;
  
  // 计算环保特性匹配数量
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

  // 如果匹配了用户的大部分环保偏好，认为是强环保产品
  return ecoMatches >= Math.ceil(userPriorities.length / 2);
}

/**
 * 获取匹配等级的颜色和标签
 * @param {string} matchLevel - 匹配等级
 * @returns {Object} 包含颜色和标签的对象
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
 * 根据用户答案生成个性化描述
 * @param {Object} quizData - 用户答案
 * @returns {string} 个性化描述
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
