// 测试不同 quiz 答案的匹配结果
import { findBestMatches } from './matchingAlgorithm.js';

// 测试场景1: 预算敏感的狗狗主人
const budgetDogOwner = {
  pet: "Dog",
  lifeStage: "Adult",
  weight: "26-50 lb",
  avoidIngredients: ["None"],
  feedingStyle: "Kibble",
  priorities: ["Stay on budget"],
  mainGoal: "Stay on budget",
  budget: "<$25",
  organicPremium: "0%",
  preferredBuying: "Online delivery",
  alternativeProteins: "No",
  organicExperience: "Beginner",
  zipCode: "98105"
};

// 测试场景2: 环保意识的猫咪主人
const ecoCatOwner = {
  pet: "Cat",
  lifeStage: "Senior",
  weight: "<10 lb",
  avoidIngredients: ["Chicken"],
  feedingStyle: "Wet",
  priorities: ["Lower-footprint protein", "Recyclable/compostable packaging"],
  mainGoal: "Reduce environmental impact",
  budget: "$40–$60",
  organicPremium: "20%+",
  preferredBuying: "Either",
  alternativeProteins: "Yes",
  organicExperience: "Experienced",
  zipCode: "10001"
};

// 测试场景3: 幼犬主人，避免谷物
const puppyOwner = {
  pet: "Dog",
  lifeStage: "Puppy/Kitten",
  weight: "<10 lb",
  avoidIngredients: ["Grain", "Chicken"],
  feedingStyle: "Kibble",
  priorities: ["Credible certifications"],
  mainGoal: "Keep my pet healthy",
  budget: "$25–$40",
  organicPremium: "~10%",
  preferredBuying: "Local pickup",
  alternativeProteins: "Maybe",
  organicExperience: "Tried a few",
  zipCode: "90210"
};

// 测试场景4: 高端用户，追求品质
const premiumOwner = {
  pet: "Dog",
  lifeStage: "Adult",
  weight: "51-90 lb",
  avoidIngredients: [],
  feedingStyle: "Freeze-dried",
  priorities: ["Made closer to me", "Credible certifications"],
  mainGoal: "Keep my pet healthy",
  budget: "$60+",
  organicPremium: "20%+",
  preferredBuying: "Either",
  alternativeProteins: "Yes",
  organicExperience: "Experienced",
  zipCode: "94102"
};

// 运行测试
console.log("=== 测试场景1: 预算敏感的狗狗主人 ===");
const budgetResults = findBestMatches(budgetDogOwner);
console.log("推荐产品:");
budgetResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - 匹配度: ${product.matchScore}% - 等级: ${product.matchLevel} - 价格: $${product.price}`);
});

console.log("\n=== 测试场景2: 环保意识的猫咪主人 ===");
const ecoResults = findBestMatches(ecoCatOwner);
console.log("推荐产品:");
ecoResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - 匹配度: ${product.matchScore}% - 等级: ${product.matchLevel} - 价格: $${product.price}`);
});

console.log("\n=== 测试场景3: 幼犬主人，避免谷物 ===");
const puppyResults = findBestMatches(puppyOwner);
console.log("推荐产品:");
puppyResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - 匹配度: ${product.matchScore}% - 等级: ${product.matchLevel} - 价格: $${product.price}`);
});

console.log("\n=== 测试场景4: 高端用户，追求品质 ===");
const premiumResults = findBestMatches(premiumOwner);
console.log("推荐产品:");
premiumResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - 匹配度: ${product.matchScore}% - 等级: ${product.matchLevel} - 价格: $${product.price}`);
});

// 导出测试函数供其他文件使用
export function runMatchingTests() {
  return {
    budgetDogOwner: findBestMatches(budgetDogOwner),
    ecoCatOwner: findBestMatches(ecoCatOwner),
    puppyOwner: findBestMatches(puppyOwner),
    premiumOwner: findBestMatches(premiumOwner)
  };
}
