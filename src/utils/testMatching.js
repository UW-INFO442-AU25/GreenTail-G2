import { findBestMatches } from './matchingAlgorithm.js';

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

console.log("=== Test Scenario 1: Budget-conscious dog owner ===");
const budgetResults = findBestMatches(budgetDogOwner);
console.log("Recommended products:");
budgetResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - Match: ${product.matchScore}% - Level: ${product.matchLevel} - Price: $${product.price}`);
});

console.log("\n=== Test Scenario 2: Eco-conscious cat owner ===");
const ecoResults = findBestMatches(ecoCatOwner);
console.log("Recommended products:");
ecoResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - Match: ${product.matchScore}% - Level: ${product.matchLevel} - Price: $${product.price}`);
});

console.log("\n=== Test Scenario 3: Puppy owner, avoiding grain ===");
const puppyResults = findBestMatches(puppyOwner);
console.log("Recommended products:");
puppyResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - Match: ${product.matchScore}% - Level: ${product.matchLevel} - Price: $${product.price}`);
});

console.log("\n=== Test Scenario 4: Premium user seeking quality ===");
const premiumResults = findBestMatches(premiumOwner);
console.log("Recommended products:");
premiumResults.slice(0, 3).forEach((product, index) => {
  console.log(`${index + 1}. ${product.brand} · ${product.name} - Match: ${product.matchScore}% - Level: ${product.matchLevel} - Price: $${product.price}`);
});
export function runMatchingTests() {
  return {
    budgetDogOwner: findBestMatches(budgetDogOwner),
    ecoCatOwner: findBestMatches(ecoCatOwner),
    puppyOwner: findBestMatches(puppyOwner),
    premiumOwner: findBestMatches(premiumOwner)
  };
}
