export const getStoresByZipCode = (zipCode) => {
  const storeDatabase = {
    '98105': [
      {
        id: 1,
        name: 'MudBay – Ballard',
        address: '5314 15th Ave NW, Seattle, WA 98107',
        lat: 47.6689,
        lng: -122.3844,
        distance: '0.6 mi',
        phone: '(206) 783‑1328',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98105'
      },
      {
        id: 2,
        name: 'PetSmart – Aurora',
        address: '13000 Aurora Ave N, Seattle, WA 98133',
        lat: 47.7234,
        lng: -122.3245,
        distance: '1.8 mi',
        phone: '(206) 361‑1634',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Blue Buffalo', 'Wellness', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.storeopeninghours.com/petsmart‑seattle‑wa',
        zipCode: '98105'
      },
      {
        id: 9,
        name: 'Petco – University District',
        address: '4501 University Way NE, Seattle, WA 98105',
        lat: 47.6612,
        lng: -122.3134,
        distance: '0.4 mi',
        phone: '(206) 632‑5678',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost'],
        website: 'https://www.petco.com/',
        zipCode: '98105'
      }
    ],
    '98117': [
      {
        id: 3,
        name: 'Petco – Interbay',
        address: '8728 Holman Rd NW, Seattle, WA 98117',
        lat: 47.6789,
        lng: -122.3789,
        distance: '0.3 mi',
        phone: '(206) 784‑0524',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.chamberofcommerce.com/business-directory/washington/seattle/pet-store/5361387-petco/',
        zipCode: '98117'
      },
      {
        id: 4,
        name: 'MudBay – Fremont',
        address: '3415 Fremont Ave N, Seattle, WA 98103',
        lat: 47.6512,
        lng: -122.3501,
        distance: '1.2 mi',
        phone: '(206) 632‑1234',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98117'
      },
      {
        id: 10,
        name: 'PetSmart – Crown Hill',
        address: '8500 15th Ave NW, Seattle, WA 98117',
        lat: 47.6890,
        lng: -122.3789,
        distance: '0.8 mi',
        phone: '(206) 784‑9012',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.petsmart.com/',
        zipCode: '98117'
      }
    ],
    '98101': [
      {
        id: 5,
        name: 'Petco – Downtown',
        address: '1425 4th Ave, Seattle, WA 98101',
        lat: 47.6080,
        lng: -122.3351,
        distance: '0.2 mi',
        phone: '(206) 624‑1234',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'Wild Earth', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.petco.com/',
        zipCode: '98101'
      },
      {
        id: 6,
        name: 'PetSmart – Downtown',
        address: '1000 1st Ave, Seattle, WA 98104',
        lat: 47.6062,
        lng: -122.3321,
        distance: '0.5 mi',
        phone: '(206) 624‑5678',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.petsmart.com/',
        zipCode: '98101'
      },
      {
        id: 11,
        name: 'MudBay – Downtown',
        address: '1420 5th Ave, Seattle, WA 98101',
        lat: 47.6090,
        lng: -122.3360,
        distance: '0.3 mi',
        phone: '(206) 625‑2345',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98101'
      }
    ],
    '90210': [
      {
        id: 7,
        name: 'Petco – Beverly Hills',
        address: '9570 Wilshire Blvd, Beverly Hills, CA 90210',
        lat: 34.0736,
        lng: -118.4004,
        distance: '0.4 mi',
        phone: '(310) 274‑1234',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.petco.com/',
        zipCode: '90210'
      },
      {
        id: 12,
        name: 'PetSmart – Beverly Hills',
        address: '8500 Wilshire Blvd, Beverly Hills, CA 90211',
        lat: 34.0680,
        lng: -118.3850,
        distance: '0.6 mi',
        phone: '(310) 275‑5678',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.petsmart.com/',
        zipCode: '90210'
      }
    ],
    '10001': [
      {
        id: 8,
        name: 'Petco – Manhattan',
        address: '860 Broadway, New York, NY 10003',
        lat: 40.7505,
        lng: -73.9934,
        distance: '0.3 mi',
        phone: '(212) 777‑1234',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'Wild Earth', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.petco.com/',
        zipCode: '10001'
      },
      {
        id: 13,
        name: 'PetSmart – Manhattan',
        address: '620 6th Ave, New York, NY 10011',
        lat: 40.7420,
        lng: -73.9970,
        distance: '0.7 mi',
        phone: '(212) 778‑9012',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.petsmart.com/',
        zipCode: '10001'
      }
    ],
    '98103': [
      {
        id: 14,
        name: 'MudBay – Wallingford',
        address: '1801 N 45th St, Seattle, WA 98103',
        lat: 47.6615,
        lng: -122.3330,
        distance: '0.5 mi',
        phone: '(206) 632‑3456',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98103'
      },
      {
        id: 15,
        name: 'Petco – Wallingford',
        address: '4515 University Way NE, Seattle, WA 98105',
        lat: 47.6620,
        lng: -122.3140,
        distance: '0.9 mi',
        phone: '(206) 633‑7890',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.petco.com/',
        zipCode: '98103'
      }
    ],
    '98112': [
      {
        id: 16,
        name: 'MudBay – Capitol Hill',
        address: '1525 10th Ave E, Seattle, WA 98102',
        lat: 47.6250,
        lng: -122.3200,
        distance: '0.8 mi',
        phone: '(206) 324‑4567',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98112'
      },
      {
        id: 17,
        name: 'PetSmart – Capitol Hill',
        address: '600 Broadway E, Seattle, WA 98102',
        lat: 47.6230,
        lng: -122.3210,
        distance: '1.0 mi',
        phone: '(206) 325‑8901',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.petsmart.com/',
        zipCode: '98112'
      }
    ],
    '98115': [
      {
        id: 18,
        name: 'MudBay – Ravenna',
        address: '6504 Roosevelt Way NE, Seattle, WA 98115',
        lat: 47.6780,
        lng: -122.3100,
        distance: '0.3 mi',
        phone: '(206) 525‑1234',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98115'
      },
      {
        id: 19,
        name: 'Petco – Ravenna',
        address: '6510 Roosevelt Way NE, Seattle, WA 98115',
        lat: 47.6790,
        lng: -122.3110,
        distance: '0.4 mi',
        phone: '(206) 526‑5678',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.petco.com/',
        zipCode: '98115'
      }
    ],
    '98122': [
      {
        id: 20,
        name: 'MudBay – Madison Valley',
        address: '2818 E Madison St, Seattle, WA 98112',
        lat: 47.6250,
        lng: -122.2900,
        distance: '0.6 mi',
        phone: '(206) 328‑9012',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98122'
      },
      {
        id: 21,
        name: 'PetSmart – Central District',
        address: '2300 E Union St, Seattle, WA 98122',
        lat: 47.6100,
        lng: -122.3000,
        distance: '1.2 mi',
        phone: '(206) 329‑3456',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.petsmart.com/',
        zipCode: '98122'
      }
    ],
    '98119': [
      {
        id: 22,
        name: 'MudBay – Queen Anne',
        address: '1815 Queen Anne Ave N, Seattle, WA 98109',
        lat: 47.6280,
        lng: -122.3560,
        distance: '0.4 mi',
        phone: '(206) 285‑1234',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98119'
      },
      {
        id: 23,
        name: 'Petco – Queen Anne',
        address: '1900 Queen Anne Ave N, Seattle, WA 98109',
        lat: 47.6300,
        lng: -122.3580,
        distance: '0.5 mi',
        phone: '(206) 286‑5678',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.petco.com/',
        zipCode: '98119'
      },
      {
        id: 24,
        name: 'PetSmart – Lower Queen Anne',
        address: '2000 1st Ave N, Seattle, WA 98109',
        lat: 47.6250,
        lng: -122.3600,
        distance: '0.8 mi',
        phone: '(206) 287‑9012',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'EcoBite', 'PurePaw', 'FarmFresh', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard'],
        website: 'https://www.petsmart.com/',
        zipCode: '98119'
      }
    ],
    '98109': [
      {
        id: 25,
        name: 'MudBay – South Lake Union',
        address: '400 Fairview Ave N, Seattle, WA 98109',
        lat: 47.6200,
        lng: -122.3400,
        distance: '0.3 mi',
        phone: '(206) 223‑4567',
        hours: 'Mon–Fri 10:00 AM–7:30 PM; Sat 9:00 AM–7:00 PM; Sun 9:00 AM–7:00 PM',
        products: ['Orijen', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.mudbay.com/stores/',
        zipCode: '98109'
      },
      {
        id: 26,
        name: 'Petco – South Lake Union',
        address: '500 Westlake Ave N, Seattle, WA 98109',
        lat: 47.6220,
        lng: -122.3380,
        distance: '0.5 mi',
        phone: '(206) 224‑7890',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['Orijen', 'Blue Buffalo', 'Wellness', 'Open Farm', 'Royal Canin', 'Hill\'s Science Diet', 'Purina Pro Plan', 'EcoBite', 'PurePaw', 'FarmFresh', 'GreenTail', 'MeadowMix', 'WhiskerWell', 'VitalBites', 'TummyTender', 'OceanWhisk', 'PupStart', 'WhiskerBoost', 'BugBites', 'PrimalPaws', 'PlantPaws', 'SimpleSoul', 'TinyWhiskers', 'FutureFeast', 'SlimPaws', 'HeritageHounds', 'GutGuard', 'FreshBox'],
        website: 'https://www.petco.com/',
        zipCode: '98109'
      }
    ]
  };

  if (storeDatabase[zipCode]) {
    return storeDatabase[zipCode];
  }

  return storeDatabase['98105'] || [];
};

export const getMapCenterByZipCode = (zipCode) => {
  const zipCodeCenters = {
    '98105': [47.6689, -122.3844],
    '98117': [47.6789, -122.3789],
    '98101': [47.6080, -122.3351],
    '90210': [34.0736, -118.4004],
    '10001': [40.7505, -73.9934],
    '98103': [47.6615, -122.3330],
    '98112': [47.6250, -122.3200],
    '98115': [47.6780, -122.3100],
    '98122': [47.6250, -122.2900],
    '98119': [47.6280, -122.3560],
    '98109': [47.6200, -122.3400],
  };

  return zipCodeCenters[zipCode] || [47.6062, -122.3321];
};

export const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const getZipCodeDisplayName = (zipCode) => {
  const zipCodeNames = {
    '98105': 'Seattle, WA (University District)',
    '98117': 'Seattle, WA (Crown Hill)',
    '98101': 'Seattle, WA (Downtown)',
    '90210': 'Beverly Hills, CA',
    '10001': 'New York, NY (Manhattan)',
    '98103': 'Seattle, WA (Wallingford)',
    '98112': 'Seattle, WA (Capitol Hill)',
    '98115': 'Seattle, WA (Ravenna)',
    '98122': 'Seattle, WA (Madison Valley)',
    '98119': 'Seattle, WA (Queen Anne)',
    '98109': 'Seattle, WA (South Lake Union)',
  };

  return zipCodeNames[zipCode] || `ZIP Code ${zipCode}`;
};

export const getSupportedZipCodes = () => {
  return [
    { code: '98105', name: 'Seattle, WA (University District)' },
    { code: '98117', name: 'Seattle, WA (Crown Hill)' },
    { code: '98101', name: 'Seattle, WA (Downtown)' },
    { code: '98103', name: 'Seattle, WA (Wallingford)' },
    { code: '98112', name: 'Seattle, WA (Capitol Hill)' },
    { code: '98115', name: 'Seattle, WA (Ravenna)' },
    { code: '98122', name: 'Seattle, WA (Madison Valley)' },
    { code: '98119', name: 'Seattle, WA (Queen Anne)' },
    { code: '98109', name: 'Seattle, WA (South Lake Union)' },
    { code: '90210', name: 'Beverly Hills, CA' },
    { code: '10001', name: 'New York, NY (Manhattan)' },
  ];
};
