const BASE = import.meta.env.BASE_URL || '/';
export const petFoodDatabase = [
  {
    id: 1,
    name: "Orijen Six Fish Recipe",
    brand: "Orijen",
    image: `${BASE}img/Orijen.png`,
    price: 34.99,
    pricePer1000kcal: 2.85,
    matchScore: 0,
    matchLevel: "best", // best, great, good, eco-friendly
    
    petType: ["Dog"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Fish"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    
    budgetRange: ["$25–$40", "$40–$60"],
    
    availableAt: ["MudBay", "Chewy", "Amazon"],
    preferredChannel: "MudBay",
    
    description: "High-protein, grain-free recipe with six different fish sources. Perfect for dogs with sensitivities.",
    tags: ["low-footprint protein", "recyclable bag", "certified organic", "grain-free", "high protein"],
    
    hasAlternativeProteins: false,
    
    experienceLevel: ["Tried a few", "Experienced"]
  },
  
  {
    id: 2,
    name: "Blue Buffalo Wilderness",
    brand: "Blue Buffalo", 
    image: `${BASE}img/BlueBuffalo.png`,
    price: 28.99,
    pricePer1000kcal: 2.42,
    matchScore: 0,
    matchLevel: "great",
    
    petType: ["Dog"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Chicken", "Beef"],
    avoidIngredients: ["Grain"],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["<$25", "$25–$40"],
    availableAt: ["Amazon", "Chewy", "Petco"],
    preferredChannel: "Amazon",
    
    description: "Grain-free recipe with high-quality protein sources. Great for active dogs who need extra nutrition.",
    tags: ["grain-free", "high protein", "no by-products", "natural ingredients"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },
  
  {
    id: 3,
    name: "Wellness CORE Grain-Free",
    brand: "Wellness",
    image: `${BASE}img/COREGrain.png`, 
    price: 32.50,
    pricePer1000kcal: 2.68,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Chicken", "Turkey"],
    avoidIngredients: ["Grain"],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40", "$40–$60"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "High-quality grain-free formula with natural ingredients and omega fatty acids for healthy skin and coat.",
    tags: ["grain-free", "natural ingredients", "omega fatty acids", "healthy skin"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },
  
  {
    id: 4,
    name: "Open Farm Homestead Turkey",
    brand: "Open Farm",
    image: `${BASE}img/OpenFarm.png`,
    price: 36.99,
    pricePer1000kcal: 2.95,
    matchScore: 0,
    matchLevel: "eco-friendly",
    
    petType: ["Dog"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Turkey"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: true
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$40–$60", "$60+"],
    availableAt: ["Chewy", "Petco", "Local Stores"],
    preferredChannel: "Chewy",
    
    description: "Premium eco-friendly option with sustainably sourced ingredients and compostable packaging.",
    tags: ["sustainable sourcing", "compostable bag", "ethically raised", "certified organic"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },
  
  {
    id: 5,
    name: "Royal Canin Puppy",
    brand: "Royal Canin",
    image: `${BASE}img/BlueBuffalo.png`,
    price: 24.99,
    pricePer1000kcal: 2.10,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Puppy/Kitten"],
    weightRange: ["<10 lb", "10-25 lb"],
    
    mainProteins: ["Chicken"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["<$25", "$25–$40"],
    availableAt: ["Amazon", "Chewy", "Petco"],
    preferredChannel: "Amazon",
    
    description: "Specially formulated for puppies with balanced nutrition for healthy growth and development.",
    tags: ["puppy formula", "balanced nutrition", "growth support", "digestive health"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },
  
  {
    id: 6,
    name: "Hill's Science Diet Senior",
    brand: "Hill's Science Diet",
    image: `${BASE}img/COREGrain.png`,
    price: 29.99,
    pricePer1000kcal: 2.35,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Chicken"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "Formulated for senior dogs with joint support and easy-to-digest ingredients.",
    tags: ["senior formula", "joint support", "easy digest", "antioxidants"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },
  
  {
    id: 7,
    name: "Purina Pro Plan Cat",
    brand: "Purina Pro Plan",
    image: `${BASE}img/OpenFarm.png`,
    price: 26.99,
    pricePer1000kcal: 2.25,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb"],
    
    mainProteins: ["Chicken", "Fish"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble", "Wet"],
    budgetRange: ["$25–$40"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "Complete nutrition for adult cats with high-quality protein and essential nutrients.",
    tags: ["cat formula", "high protein", "complete nutrition", "urinary health"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },
  
  {
    id: 8,
    name: "Wild Earth Dog Food",
    brand: "Wild Earth",
    image: `${BASE}img/Orijen.png`,
    price: 39.99,
    pricePer1000kcal: 3.20,
    matchScore: 0,
    matchLevel: "eco-friendly",
    
    petType: ["Dog"],
    lifeStage: ["Adult"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Plant-based"],
    avoidIngredients: ["Chicken", "Beef", "Fish", "Dairy"],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$40–$60", "$60+"],
    availableAt: ["Online Only"],
    preferredChannel: "Online Only",
    
    description: "Plant-based protein formula with sustainable ingredients and minimal environmental impact.",
    tags: ["plant-based", "sustainable", "low carbon", "alternative protein"],
    
    hasAlternativeProteins: true,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 9,
    name: "Organic Chicken & Oat",
    brand: "EcoBite",
    image: `${BASE}img/ecobite.jpg`,
    price: 27.99,
    pricePer1000kcal: 2.85,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Dog"],
    lifeStage: ["Adult"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Chicken"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40"],
    availableAt: ["Chewy", "Amazon", "Petco"],
    preferredChannel: "Chewy",
    
    description: "Certified organic chicken and oat formula with recyclable packaging and low environmental footprint.",
    tags: ["certified organic", "recyclable bag", "low-footprint protein", "chicken-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 10,
    name: "Organic Salmon",
    brand: "PurePaw",
    image: `${BASE}img/purepaw.jpg`,
    price: 31.50,
    pricePer1000kcal: 2.50,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Fish"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40", "$40–$60"],
    availableAt: ["Amazon", "Chewy", "Petco"],
    preferredChannel: "Amazon",
    
    description: "Single-protein salmon formula with certified organic ingredients and no artificial preservatives.",
    tags: ["certified organic", "single-protein", "no artificial preservatives", "salmon-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 11,
    name: "Grain-Free Turkey & Sweet Potato",
    brand: "FarmFresh",
    image: `${BASE}img/farmfresh.jpg`,
    price: 29.99,
    pricePer1000kcal: 2.10,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Dog"],
    lifeStage: ["Adult"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Turkey"],
    avoidIngredients: ["Grain"],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: true
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40"],
    availableAt: ["Petco", "Chewy", "Local Stores"],
    preferredChannel: "Petco",
    
    description: "Grain-free turkey and sweet potato formula made locally with recyclable packaging.",
    tags: ["grain-free", "made nearby", "recyclable bag", "turkey-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 12,
    name: "Organic Chicken Paté",
    brand: "GreenTail",
    image: `${BASE}img/greentail.jpg`,
    price: 22.99,
    pricePer1000kcal: 1.05,
    matchScore: 0,
    matchLevel: "budget",
    
    petType: ["Dog", "Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb"],
    
    mainProteins: ["Chicken"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Wet"],
    budgetRange: ["<$25", "$25–$40"],
    availableAt: ["Amazon", "Chewy", "Petco"],
    preferredChannel: "Amazon",
    
    description: "Budget-friendly organic chicken paté in BPA-free cans, perfect for small pets.",
    tags: ["certified organic", "BPA-free can", "single-protein", "budget-friendly"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 13,
    name: "Organic Lamb & Brown Rice",
    brand: "MeadowMix",
    image: `${BASE}img/meadowmix.jpg`,
    price: 33.99,
    pricePer1000kcal: 2.25,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Lamb"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40", "$40–$60"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "Organic lamb and brown rice formula with low environmental footprint and certified ingredients.",
    tags: ["certified organic", "low-footprint protein", "lamb-based", "brown rice"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 14,
    name: "Organic Tuna & Pumpkin",
    brand: "WhiskerWell",
    image: `${BASE}img/whiskerwell.jpg`,
    price: 18.99,
    pricePer1000kcal: 1.45,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb"],
    
    mainProteins: ["Fish"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Wet"],
    budgetRange: ["<$25", "$25–$40"],
    availableAt: ["MudBay", "Chewy", "Petco"],
    preferredChannel: "MudBay",
    
    description: "Organic tuna and pumpkin formula in recyclable pouches with full transparency.",
    tags: ["recyclable pouch", "transparency page", "tuna-based", "pumpkin"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 15,
    name: "Freeze-Dried Duck Nuggets",
    brand: "VitalBites",
    image: `${BASE}img/vitalbites.jpg`,
    price: 42.00,
    pricePer1000kcal: 3.85,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Dog"],
    lifeStage: ["Adult"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Duck"],
    avoidIngredients: ["Grain"],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Freeze-dried"],
    budgetRange: ["$40–$60", "$60+"],
    availableAt: ["Petco", "Chewy", "Amazon"],
    preferredChannel: "Petco",
    
    description: "Premium freeze-dried duck nuggets with single protein source and grain-free formula.",
    tags: ["freeze-dried", "grain-free", "single-protein", "duck-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 16,
    name: "Senior Turkey & Barley",
    brand: "TummyTender",
    image: `${BASE}img/tummytender.jpg`,
    price: 26.50,
    pricePer1000kcal: 1.99,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Turkey"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40"],
    availableAt: ["Amazon", "Chewy", "Petco"],
    preferredChannel: "Amazon",
    
    description: "Senior-specific turkey and barley formula with digestive support and easy-to-digest ingredients.",
    tags: ["senior formula", "digestive support", "kibble", "turkey-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 17,
    name: "Tuna & Seaweed",
    brand: "OceanWhisk",
    image: `${BASE}img/oceanwhisk.jpg`,
    price: 16.99,
    pricePer1000kcal: 1.99,
    matchScore: 0,
    matchLevel: "budget",
    
    petType: ["Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb"],
    
    mainProteins: ["Fish"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Wet"],
    budgetRange: ["<$25"],
    availableAt: ["MudBay", "Chewy", "Petco"],
    preferredChannel: "MudBay",
    
    description: "Budget-friendly tuna and seaweed formula with high moisture content and omega-3 fatty acids.",
    tags: ["wet/canned", "high-moisture", "omega-3 rich", "tuna-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 18,
    name: "Organic Chicken for Puppies",
    brand: "PupStart",
    image: `${BASE}img/pupstart.jpg`,
    price: 24.99,
    pricePer1000kcal: 1.50,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Dog"],
    lifeStage: ["Puppy/Kitten"],
    weightRange: ["<10 lb", "10-25 lb"],
    
    mainProteins: ["Chicken"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["<$25", "$25–$40"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "Certified organic chicken formula specifically designed for puppies and kittens with balanced nutrition.",
    tags: ["puppy/kitten", "certified organic", "kibble", "chicken-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 19,
    name: "Beef & Sweet Pea (Air-Dried)",
    brand: "MeadowMix",
    image: `${BASE}img/meadowmix-beef.jpg`,
    price: 34.75,
    pricePer1000kcal: 2.80,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Adult"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Beef"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Freeze-dried"],
    budgetRange: ["$25–$40", "$40–$60"],
    availableAt: ["PetSmart", "Chewy", "Amazon"],
    preferredChannel: "PetSmart",
    
    description: "Air-dried beef and sweet pea formula with high protein content and no fillers.",
    tags: ["air-dried", "high-protein", "no fillers", "beef-based"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 20,
    name: "Senior Salmon & Pumpkin",
    brand: "WhiskerBoost",
    image: `${BASE}img/whiskerboost.jpg`,
    price: 38.99,
    pricePer1000kcal: 3.50,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Cat"],
    lifeStage: ["Senior"],
    weightRange: ["<10 lb", "10-25 lb"],
    
    mainProteins: ["Fish"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Wet"],
    budgetRange: ["$25–$40", "$40–$60"],
    availableAt: ["Amazon", "Chewy", "Petco"],
    preferredChannel: "Amazon",
    
    description: "Senior-specific salmon and pumpkin formula in wet form for easy digestion and joint support.",
    tags: ["senior", "wet/canned", "salmon-based", "pumpkin"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 21,
    name: "Insect Protein Power",
    brand: "BugBites",
    image: `${BASE}img/bugbites.jpg`,
    price: 45.99,
    pricePer1000kcal: 4.20,
    matchScore: 0,
    matchLevel: "eco-friendly",
    
    petType: ["Dog"],
    lifeStage: ["Adult"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Insect"],
    avoidIngredients: ["Chicken", "Beef", "Fish", "Dairy"],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$40–$60", "$60+"],
    availableAt: ["Online Only", "Specialty Stores"],
    preferredChannel: "Online Only",
    
    description: "Revolutionary insect-based protein formula with 80% lower carbon footprint than traditional meat sources.",
    tags: ["insect protein", "ultra-sustainable", "hypoallergenic", "future food"],
    
    hasAlternativeProteins: true,
    experienceLevel: ["Experienced"]
  },

  {
    id: 22,
    name: "Raw Frozen Medley",
    brand: "PrimalPaws",
    image: `${BASE}img/primalpaws.jpg`,
    price: 52.99,
    pricePer1000kcal: 4.80,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Dog", "Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb", "26-50 lb", "51-90 lb"],
    
    mainProteins: ["Beef", "Chicken", "Fish"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: true,
      localProduction: true
    },
    
    feedingStyle: ["Fresh"],
    budgetRange: ["$40–$60", "$60+"],
    availableAt: ["Local Stores", "Specialty Stores"],
    preferredChannel: "Local Stores",
    
    description: "Premium raw frozen medley with organic, locally-sourced ingredients. Flash-frozen to preserve nutrients.",
    tags: ["raw frozen", "locally sourced", "nutrient-dense", "premium quality"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Experienced"]
  },

  {
    id: 23,
    name: "Vegan Complete Formula",
    brand: "PlantPaws",
    image: `${BASE}img/plantpaws.jpg`,
    price: 28.99,
    pricePer1000kcal: 2.95,
    matchScore: 0,
    matchLevel: "eco-friendly",
    
    petType: ["Dog"],
    lifeStage: ["Adult"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Plant-based"],
    avoidIngredients: ["Chicken", "Beef", "Fish", "Dairy"],
    isGrainFree: false,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40"],
    availableAt: ["Amazon", "Chewy", "Petco"],
    preferredChannel: "Amazon",
    
    description: "Complete vegan formula with pea protein, quinoa, and superfoods. Perfect for environmentally conscious pet parents.",
    tags: ["vegan", "plant-based", "superfoods", "complete nutrition"],
    
    hasAlternativeProteins: true,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 24,
    name: "Limited Ingredient Duck",
    brand: "SimpleSoul",
    image: `${BASE}img/simplesoul.jpg`,
    price: 35.50,
    pricePer1000kcal: 3.15,
    matchScore: 0,
    matchLevel: "great",
    
    petType: ["Dog", "Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb", "26-50 lb", "51-90 lb"],
    
    mainProteins: ["Duck"],
    avoidIngredients: ["Chicken", "Beef", "Fish", "Grain"],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40", "$40–$60"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "Limited ingredient formula with single protein source. Ideal for pets with food sensitivities and allergies.",
    tags: ["limited ingredient", "single protein", "hypoallergenic", "sensitive stomach"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 25,
    name: "Kitten Growth Formula",
    brand: "TinyWhiskers",
    image: `${BASE}img/tinywhiskers.jpg`,
    price: 19.99,
    pricePer1000kcal: 1.85,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Cat"],
    lifeStage: ["Puppy/Kitten"],
    weightRange: ["<10 lb"],
    
    mainProteins: ["Chicken", "Fish"],
    avoidIngredients: [],
    isGrainFree: false,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble", "Wet"],
    budgetRange: ["<$25", "$25–$40"],
    availableAt: ["Petco", "Chewy", "Amazon"],
    preferredChannel: "Petco",
    
    description: "Specially formulated for growing kittens with DHA for brain development and calcium for strong bones.",
    tags: ["kitten formula", "DHA enriched", "growth support", "brain development"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Beginner", "Tried a few", "Experienced"]
  },

  {
    id: 26,
    name: "Lab-Grown Chicken Bites",
    brand: "FutureFeast",
    image: `${BASE}img/futurefeast.jpg`,
    price: 68.99,
    pricePer1000kcal: 6.20,
    matchScore: 0,
    matchLevel: "eco-friendly",
    
    petType: ["Dog", "Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb", "26-50 lb", "51-90 lb"],
    
    mainProteins: ["Lab-grown"],
    avoidIngredients: ["Chicken", "Beef", "Fish", "Dairy"],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: true,
      recyclablePackaging: true,
      certified: true,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$60+"],
    availableAt: ["Online Only"],
    preferredChannel: "Online Only",
    
    description: "Revolutionary lab-grown chicken protein with 95% lower environmental impact. The future of sustainable pet nutrition.",
    tags: ["lab-grown", "cellular agriculture", "zero-waste", "sci-fi food"],
    
    hasAlternativeProteins: true,
    experienceLevel: ["Experienced"]
  },

  {
    id: 27,
    name: "Weight Management Formula",
    brand: "SlimPaws",
    image: `${BASE}img/slimpaws.jpg`,
    price: 31.99,
    pricePer1000kcal: 2.45,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog", "Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Chicken", "Turkey"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "Low-calorie, high-fiber formula designed for weight management. Helps pets maintain healthy weight with L-carnitine.",
    tags: ["weight management", "low-calorie", "high-fiber", "L-carnitine"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 28,
    name: "Ancient Grain Heritage",
    brand: "HeritageHounds",
    image: `${BASE}img/heritagehounds.jpg`,
    price: 26.99,
    pricePer1000kcal: 2.15,
    matchScore: 0,
    matchLevel: "good",
    
    petType: ["Dog"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["10-25 lb", "26-50 lb", "51-90 lb", "90+ lb"],
    
    mainProteins: ["Lamb", "Venison"],
    avoidIngredients: ["Chicken", "Beef"],
    isGrainFree: false,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: true,
      localProduction: true
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40"],
    availableAt: ["Local Stores", "Chewy"],
    preferredChannel: "Local Stores",
    
    description: "Ancient grain formula with heritage proteins like lamb and venison. Traditional nutrition for modern pets.",
    tags: ["ancient grains", "heritage proteins", "traditional", "locally sourced"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 29,
    name: "Probiotic Digestive Care",
    brand: "GutGuard",
    image: `${BASE}img/gutguard.jpg`,
    price: 33.50,
    pricePer1000kcal: 2.80,
    matchScore: 0,
    matchLevel: "great",
    
    petType: ["Dog", "Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb", "26-50 lb", "51-90 lb"],
    
    mainProteins: ["Chicken", "Fish"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: false,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: false,
      localProduction: false
    },
    
    feedingStyle: ["Kibble"],
    budgetRange: ["$25–$40", "$40–$60"],
    availableAt: ["Chewy", "Petco", "Amazon"],
    preferredChannel: "Chewy",
    
    description: "Digestive health formula with 1 billion CFU probiotics, prebiotics, and digestive enzymes for optimal gut health.",
    tags: ["probiotics", "digestive health", "gut microbiome", "digestive enzymes"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Tried a few", "Experienced"]
  },

  {
    id: 30,
    name: "Subscription Meal Kit",
    brand: "FreshBox",
    image: `${BASE}img/freshbox.jpg`,
    price: 49.99,
    pricePer1000kcal: 4.50,
    matchScore: 0,
    matchLevel: "best",
    
    petType: ["Dog", "Cat"],
    lifeStage: ["Adult", "Senior"],
    weightRange: ["<10 lb", "10-25 lb", "26-50 lb", "51-90 lb"],
    
    mainProteins: ["Chicken", "Beef", "Fish", "Turkey"],
    avoidIngredients: [],
    isGrainFree: true,
    isOrganic: true,
    
    ecoFeatures: {
      lowFootprintProtein: false,
      recyclablePackaging: true,
      certified: true,
      localProduction: true
    },
    
    feedingStyle: ["Fresh"],
    budgetRange: ["$40–$60", "$60+"],
    availableAt: ["Subscription Only"],
    preferredChannel: "Subscription Only",
    
    description: "Weekly fresh meal kit subscription with human-grade ingredients, portioned for your pet's exact needs.",
    tags: ["subscription", "fresh meals", "human-grade", "portion-controlled"],
    
    hasAlternativeProteins: false,
    experienceLevel: ["Experienced"]
  }
];

// Matching algorithm configuration
// Weights define the importance of each factor in the match score calculation
// Thresholds define the minimum scores required for each match level
export const matchingConfig = {
  weights: {
    petType: 20,           // Weight for pet type match (Dog/Cat)
    lifeStage: 15,         // Weight for life stage match (Puppy/Adult/Senior)
    weightRange: 10,       // Weight for weight range match
    avoidIngredients: 25,  // Weight for avoiding ingredients (most important)
    budget: 15,           // Weight for budget match
    ecoFeatures: 10,      // Weight for eco-friendly features match
    feedingStyle: 5       // Weight for feeding style match (Kibble/Wet/etc.)
  },
  
  thresholds: {
    best: 85,      // 85+ points = Best match
    great: 70,     // 70-84 points = Great choice
    good: 55,      // 55-69 points = Good option
    eco: 60        // 60+ points with strong eco features = Eco-friendly choice
  }
};
