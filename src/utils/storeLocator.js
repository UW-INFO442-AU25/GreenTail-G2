// 基于zipcode的商店推荐系统
export const getStoresByZipCode = (zipCode) => {
  // 模拟不同zipcode的商店数据
  const storeDatabase = {
    // 西雅图地区
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
        products: ['Acme Organic Chicken', 'EcoBite Grain-Free', 'PurePaw Organic'],
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
        products: ['EcoBite Salmon', 'PurePaw Organic', 'FarmFresh Kibble'],
        website: 'https://www.storeopeninghours.com/petsmart‑seattle‑wa',
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
        products: ['PurePaw Organic', 'FarmFresh Kibble', 'GreenTail Premium'],
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
        products: ['Acme Organic Chicken', 'EcoBite Grain-Free', 'OceanWhisk Fish'],
        website: 'https://www.mudbay.com/stores/',
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
        products: ['PurePaw Organic', 'FarmFresh Kibble', 'VitalBites Complete'],
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
        products: ['EcoBite Salmon', 'PurePaw Organic', 'MeadowMix Beef'],
        website: 'https://www.petsmart.com/',
        zipCode: '98101'
      }
    ],
    // 其他地区
    '90210': [ // 洛杉矶比佛利山庄
      {
        id: 7,
        name: 'Petco – Beverly Hills',
        address: '9570 Wilshire Blvd, Beverly Hills, CA 90210',
        lat: 34.0736,
        lng: -118.4004,
        distance: '0.4 mi',
        phone: '(310) 274‑1234',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['PurePaw Organic', 'FarmFresh Kibble', 'GreenTail Premium'],
        website: 'https://www.petco.com/',
        zipCode: '90210'
      }
    ],
    '10001': [ // 纽约曼哈顿
      {
        id: 8,
        name: 'Petco – Manhattan',
        address: '860 Broadway, New York, NY 10003',
        lat: 40.7505,
        lng: -73.9934,
        distance: '0.3 mi',
        phone: '(212) 777‑1234',
        hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–7:00 PM',
        products: ['EcoBite Salmon', 'PurePaw Organic', 'OceanWhisk Fish'],
        website: 'https://www.petco.com/',
        zipCode: '10001'
      }
    ]
  };

  // 如果找到精确匹配的zipcode
  if (storeDatabase[zipCode]) {
    return storeDatabase[zipCode];
  }

  // 如果没有找到，返回默认的西雅图地区商店
  return storeDatabase['98105'] || [];
};

// 根据zipcode获取地图中心点
export const getMapCenterByZipCode = (zipCode) => {
  const zipCodeCenters = {
    '98105': [47.6689, -122.3844], // 西雅图
    '98117': [47.6789, -122.3789], // 西雅图
    '98101': [47.6080, -122.3351], // 西雅图
    '90210': [34.0736, -118.4004], // 洛杉矶
    '10001': [40.7505, -73.9934],  // 纽约
  };

  return zipCodeCenters[zipCode] || [47.6062, -122.3321]; // 默认西雅图
};

// 验证zipcode格式
export const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

// 获取zipcode的显示名称
export const getZipCodeDisplayName = (zipCode) => {
  const zipCodeNames = {
    '98105': 'Seattle, WA (University District)',
    '98117': 'Seattle, WA (Crown Hill)',
    '98101': 'Seattle, WA (Downtown)',
    '90210': 'Beverly Hills, CA',
    '10001': 'New York, NY (Manhattan)',
  };

  return zipCodeNames[zipCode] || `ZIP Code ${zipCode}`;
};
